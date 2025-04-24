const Hotspot = require("../Models/hotspot");
const hotspotRepository = require('../repositories/hotspotRepository');
const hotspotService = require('../services/hotspotService');

// Lấy tất cả hotspots của một panorama
exports.getPanoramaHotspots = async (req, res) => {
    try {
        const panoramaId = req.params.id;
        const hotspots = await hotspotService.getHotspots(panoramaId);
        res.json(hotspots.map(h => h.toJSON()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// API thêm hotspot vào một panorama đã có
exports.addHotspot = async (req, res) => {
    try {
        const { type, position, title, description, targetSceneId, url } = req.body;
        const panoramaId = req.params.id;

        const hotspot = await hotspotService.addHotspot(panoramaId, {
            type,
            position,
            title,
            description,
            targetSceneId,
            url
        });

        res.status(201).json({ 
            message: "Thêm hotspot thành công!", 
            hotspot: hotspot.toJSON()
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Lỗi khi thêm hotspot!", 
            error: error.message 
        });
    }
};

// Xóa hotspot
exports.deleteHotspot = async (req, res) => {
    try {
        const { panoramaId, hotspotId } = req.params;
        await hotspotService.deleteHotspot(panoramaId, hotspotId);
        res.json({ message: "Đã xóa hotspot thành công!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};