const cloudinary = require('../config/cloudinaryConfig');
const Panorama = require("../Models/panorama");
const hotspotRepository = require('../repositories/hotspotRepository');
const panoramaRepository = require('../repositories/panoramaRepository');

// Lấy tất cả các panorama
exports.getAllPanoramas = async (req, res) => {
    try {
        const panoramas = await Panorama.find({});
        
        // Lấy hotspots cho tất cả panoramas
        const formattedPanoramas = await Promise.all(panoramas.map(async (p) => {
            const hotspots = await hotspotRepository.findByPanoramaId(p.panoramaId);
            const pObject = p.toObject();
            return {
                ...pObject,
                id: pObject.panoramaId,
                hotspots: hotspots.map(h => h.toJSON())
            };
        }));
        
        res.json(formattedPanoramas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Upload một panorama (với audio và hotspots nếu có)
exports.uploadPanorama = async (req, res) => {
    try {
        const imageUrl = req.body.imageUrl;
        if (!imageUrl) {
            return res.status(400).json({ message: 'Vui lòng cung cấp URL của ảnh!' });
        }

        const uploadOptions = {
            public_id: `panorama_${Date.now()}`,
            folder: 'panoramas',
            resource_type: 'image',
            transformation: [{ quality: 'auto', fetch_format: 'auto' }]
        };
        const uploadResult = await cloudinary.uploader.upload(imageUrl, uploadOptions);

        let uploadedAudioUrl = null;
        let audioPublicId = null;
        if (req.body.audioUrl) {
            const audioResult = await cloudinary.uploader.upload(req.body.audioUrl, {
                resource_type: 'video',
                folder: 'panorama_audio'
            });
            uploadedAudioUrl = audioResult.secure_url;
            audioPublicId = audioResult.public_id;
        }

        const { lat, lng } = req.body.location || {};
        const panoramaId = `panorama_${Date.now()}`;
        let newPanorama = new Panorama({
            panoramaId,
            title: req.body.title,
            description: req.body.description,
            imageUrl: uploadResult.secure_url,
            location: { lat, lng },
            audioUrl: uploadedAudioUrl,
            publicId: uploadResult.public_id,
            audioPublicId,
            initialCamera: req.body.initialCamera || { lat: 0, lng: 0 }
        });

        newPanorama = await newPanorama.save();

        // Xử lý hotspots nếu có
        if (Array.isArray(req.body.hotspots)) {
            for (const hotspotData of req.body.hotspots) {
                const { type, position, title, description, url, targetSceneId } = hotspotData;

                if (!type || !position || position.x === undefined || position.y === undefined || position.z === undefined) continue;

                const x = Number(position.x), y = Number(position.y), z = Number(position.z);
                const length = Math.sqrt(x * x + y * y + z * z);
                if (length === 0) continue;

                const normalizedPosition = {
                    x: x / length,
                    y: y / length,
                    z: z / length
                };

                const newHotspot = new Hotspot({
                    panoramaId,
                    type,
                    position: normalizedPosition,
                    title,
                    description,
                    url,
                    targetSceneId
                });

                await newHotspot.save();
            }
        }

        // Lấy hotspots đã tạo để trả về
        const createdHotspots = await hotspotRepository.findByPanoramaId(panoramaId);
        const panoramaResponse = {
            ...newPanorama.toObject(),
            id: panoramaId,
            hotspots: createdHotspots.map(h => h.toJSON())
        };

        res.json({ 
            message: 'Upload & lưu thành công!', 
            panorama: panoramaResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi upload ảnh!', error: error.message });
    }
};

// Lấy panorama theo ID
exports.getPanoramaById = async (req, res) => {
    try {
        const panorama = await Panorama.findOne({ panoramaId: req.params.id });

        if (!panorama) {
            return res.status(404).json({ message: "Không tìm thấy panorama!" });
        }

        // Lấy hotspots cho panorama
        const hotspots = await hotspotRepository.findByPanoramaId(panorama.panoramaId);

        const formattedPanorama = {
            ...panorama.toObject(),
            id: panorama.panoramaId,
            hotspots: hotspots.map(h => h.toJSON())
        };

        res.json(formattedPanorama);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa panorama và các hotspot liên quan
exports.deletePanorama = async (req, res) => {
    try {
        const panorama = await Panorama.findOne({ panoramaId: req.params.id });
        if (!panorama) return res.status(404).json({ message: "Không tìm thấy ảnh 360!" });

        // Xóa các hotspot liên quan
        await hotspotRepository.deleteByPanoramaId(panorama.panoramaId);

        // Xóa panorama
        await Panorama.findOneAndDelete({ panoramaId: req.params.id });

        // Xóa tài nguyên trên Cloudinary
        const publicId = panorama.publicId;
        if (publicId) {
            await Promise.all([
                cloudinary.uploader.destroy(publicId, { resource_type: 'image' }),
                panorama.audioUrl ? cloudinary.uploader.destroy(panorama.audioPublicId, { resource_type: 'video' }) : Promise.resolve()
            ]);
        }

        res.json({ message: "Đã xóa ảnh 360 thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tìm panorama gần vị trí hiện tại
exports.getNearbyPanoramas = async (req, res) => {
    try {
        const { lat, lng, radius } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ message: "Vui lòng cung cấp tọa độ lat và lng!" });
        }

        const radiusKm = Number(radius) || 10;
        const panoramas = await panoramaRepository.findNearbyPanoramas(
            Number(lat),
            Number(lng),
            radiusKm
        );

        const panoramasWithHotspots = await Promise.all(
            panoramas.map(async (panorama) => {
                const hotspots = await hotspotRepository.findByPanoramaId(panorama.panoramaId);
                return {
                    ...panorama,
                    hotspots: hotspots.map(h => h.toJSON())
                };
            })
        );

        res.json(panoramasWithHotspots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy panorama theo danh mục
exports.getPanoramasByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const panoramas = await panoramaRepository.findByCategory(category);

        const panoramasWithHotspots = await Promise.all(
            panoramas.map(async (panorama) => {
                const hotspots = await hotspotRepository.findByPanoramaId(panorama.panoramaId);
                return {
                    ...panorama,
                    hotspots: hotspots.map(h => h.toJSON())
                };
            })
        );

        res.json(panoramasWithHotspots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

