// repositories/panoramaRepository.js
const Panorama = require("../Models/panorama");

exports.createPanorama = async (panoramaData) => {
    const panorama = new Panorama(panoramaData);
    return await panorama.save();
};

exports.findAllPanoramas = async () => {
    return await Panorama.find({})
        .populate({
            path: 'hotspots',
            options: { lean: true }
        })
        .lean();
};

exports.findPanoramaByPanoramaId = async (panoramaId) => {
    return await Panorama.findOne({ panoramaId })
        .populate({
            path: 'hotspots',
            options: { lean: true }
        })
        .lean();
};

exports.deletePanoramaByPanoramaId = async (panoramaId) => {
    return await Panorama.findOneAndDelete({ panoramaId });
};

exports.updatePanorama = async (panoramaId, updateData) => {
    return await Panorama.findOneAndUpdate(
        { panoramaId },
        updateData,
        { new: true }
    ).populate('hotspots');
};

exports.findNearbyPanoramas = async (lat, lng, radiusKm = 10) => {
    return await Panorama.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                $maxDistance: radiusKm * 1000
            }
        }
    })
    .populate({
        path: 'hotspots',
        options: { lean: true }
    })
    .lean();
};

exports.findByCategory = async (category) => {
    return await Panorama.find({ category })
        .populate({
            path: 'hotspots',
            options: { lean: true }
        })
        .lean();
};
