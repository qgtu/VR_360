const cloudinary = require('../config/cloudinaryConfig');
const panoramaRepository = require('../repositories/panoramaRepository');
const hotspotRepository = require('../repositories/hotspotRepository');

exports.createPanorama = async ({ imageUrl, title, description, location, audioUrl, hotspots, initialCamera }) => {
    // Upload panorama image
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        public_id: `panorama_${Date.now()}`,
        folder: 'panoramas',
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    });

    let audioPublicId = null;
    let uploadedAudioUrl = null;

    // Upload audio if provided
    if (audioUrl) {
        const audioResult = await cloudinary.uploader.upload(audioUrl, {
            resource_type: 'video',
            folder: 'panorama_audio'
        });
        uploadedAudioUrl = audioResult.secure_url;
        audioPublicId = audioResult.public_id;
    }

    // Create panorama
    const panorama = await panoramaRepository.createPanorama({
        title,
        description,
        imageUrl: uploadResult.secure_url,
        location,
        audioUrl: uploadedAudioUrl,
        publicId: uploadResult.public_id,
        audioPublicId,
        initialCamera: initialCamera || { lat: 0, lng: 0 }
    });

    // Create hotspots if provided
    let createdHotspots = [];
    if (Array.isArray(hotspots) && hotspots.length > 0) {
        const normalizedHotspots = hotspots.map(hotspot => {
            const { x, y, z } = hotspot.position;
            const length = Math.sqrt(x * x + y * y + z * z);
            return {
                ...hotspot,
                panoramaId: panorama.panoramaId,
                position: {
                    x: x / length,
                    y: y / length,
                    z: z / length
                }
            };
        });
        createdHotspots = await hotspotRepository.bulkCreateHotspots(normalizedHotspots);
    }

    return {
        ...panorama.toObject(),
        hotspots: createdHotspots.map(h => h.toObject())
    };
};

exports.getAllPanoramas = async () => {
    const panoramas = await panoramaRepository.findAllPanoramas();
    const panoramasWithHotspots = await Promise.all(
        panoramas.map(async (panorama) => {
            const hotspots = await hotspotRepository.findByPanoramaId(panorama.panoramaId);
            return {
                ...panorama.toObject(),
                hotspots: hotspots.map(h => h.toObject())
            };
        })
    );
    return panoramasWithHotspots;
};

exports.getPanoramaById = async (panoramaId) => {
    const panorama = await panoramaRepository.findPanoramaByPanoramaId(panoramaId);
    if (!panorama) throw new Error("Không tìm thấy panorama!");

    const hotspots = await hotspotRepository.findByPanoramaId(panoramaId);
    return {
        ...panorama.toObject(),
        hotspots: hotspots.map(h => h.toObject())
    };
};

exports.deletePanorama = async (panoramaId) => {
    const panorama = await panoramaRepository.findPanoramaByPanoramaId(panoramaId);
    if (!panorama) throw new Error("Không tìm thấy panorama!");

    // Delete all related hotspots
    await hotspotRepository.deleteByPanoramaId(panoramaId);

    // Delete from Cloudinary
    if (panorama.publicId) {
        await Promise.all([
            cloudinary.uploader.destroy(panorama.publicId, { resource_type: 'image' }),
            panorama.audioPublicId ? 
                cloudinary.uploader.destroy(panorama.audioPublicId, { resource_type: 'video' }) 
                : Promise.resolve()
        ]);
    }

    // Delete panorama from database
    await panoramaRepository.deletePanoramaByPanoramaId(panoramaId);
    return panorama;
};
