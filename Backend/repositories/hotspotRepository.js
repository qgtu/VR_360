// repositories/hotspotRepository.js
const Hotspot = require("../Models/hotspot");

exports.createHotspot = async (hotspotData) => {
    const hotspot = new Hotspot(hotspotData);
    return await hotspot.save();
};

exports.bulkCreateHotspots = async (hotspotsData) => {
    return await Hotspot.insertMany(hotspotsData);
};

exports.findByPanoramaId = async (panoramaId) => {
    return await Hotspot.find({ panoramaId }).lean();
};

exports.findByHotspotId = async (hotspotId) => {
    return await Hotspot.findById(hotspotId);
};

exports.deleteByHotspotId = async (hotspotId) => {
    return await Hotspot.findByIdAndDelete(hotspotId);
};

exports.deleteByPanoramaId = async (panoramaId) => {
    return await Hotspot.deleteMany({ panoramaId });
};

exports.updateHotspot = async (hotspotId, updateData) => {
    return await Hotspot.findByIdAndUpdate(
        hotspotId,
        updateData,
        { new: true }
    );
};

exports.bulkUpdateHotspots = async (panoramaId, updatesData) => {
    const bulkOps = updatesData.map(update => ({
        updateOne: {
            filter: { _id: update._id, panoramaId },
            update: { $set: update }
        }
    }));
    return await Hotspot.bulkWrite(bulkOps);
};
