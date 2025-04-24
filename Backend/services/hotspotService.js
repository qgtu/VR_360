const hotspotRepository = require('../repositories/hotspotRepository');
const panoramaRepository = require('../repositories/panoramaRepository');
const Hotspot = require('../Models/hotspot');

exports.getHotspots = async (panoramaId) => {
    return await hotspotRepository.findByPanoramaId(panoramaId);
};

exports.addHotspot = async (panoramaId, hotspotData) => {
    // Normalize position
    const { x, y, z } = hotspotData.position;
    const length = Math.sqrt(x * x + y * y + z * z);
    
    const normalizedHotspot = {
        ...hotspotData,
        panoramaId,
        position: {
            x: x / length,
            y: y / length,
            z: z / length
        }
    };

    const hotspot = new Hotspot(normalizedHotspot);
    return await hotspot.save();
};

exports.deleteHotspot = async (panoramaId, hotspotId) => {
    const hotspot = await hotspotRepository.findByHotspotId(hotspotId);
    if (!hotspot) {
        throw new Error('Hotspot không tồn tại!');
    }
    if (hotspot.panoramaId !== panoramaId) {
        throw new Error('Hotspot không thuộc về panorama này!');
    }
    return await hotspotRepository.deleteByHotspotId(hotspotId);
};

exports.updateHotspot = async (hotspotId, updateData) => {
    if (updateData.position) {
        const { x, y, z } = updateData.position;
        const length = Math.sqrt(x * x + y * y + z * z);
        updateData.position = {
            x: x / length,
            y: y / length,
            z: z / length
        };
    }
    return await hotspotRepository.updateHotspot(hotspotId, updateData);
};
