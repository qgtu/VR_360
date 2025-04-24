const Supercluster = require('supercluster');
const panoramaService = require('../services/panoramaService');

// Helper for formatting cluster data
const formatClusterData = (cluster) => ({
    id: `cluster-${cluster.id}`,
    type: cluster.properties.cluster ? 'cluster' : 'point',
    geometry: cluster.geometry,
    properties: {
        ...cluster.properties,
        point_count: cluster.properties.point_count,
        point_count_abbreviated: cluster.properties.point_count_abbreviated
    }
});

const markerClusterController = {
    async getClusteredMarkers(req, res) {
        try {
            const { zoom, bounds } = req.query;
            if (!zoom || !bounds) {
                return res.status(400).json({
                    status: 400,
                    message: 'Zoom level and bounds are required'
                });
            }

            // Get all panoramas
            const panoramas = await panoramaService.getAllPanoramas();
            
            // Create points for clustering
            const points = panoramas.map(panorama => ({
                type: 'Feature',
                properties: {
                    id: panorama._id,
                    title: panorama.title,
                    category: panorama.category,
                    thumbnailUrl: panorama.thumbnailUrl,
                    cluster: false
                },
                geometry: {
                    type: 'Point',
                    coordinates: panorama.location.coordinates
                }
            }));

            // Initialize supercluster
            const index = new Supercluster({
                radius: 40,
                maxZoom: 16,
                minZoom: 0
            });

            // Load points into the clusterer
            index.load(points);

            // Get clusters based on current view
            const bbox = bounds.split(',').map(Number);
            const clusters = index.getClusters(bbox, Math.floor(Number(zoom)));

            // Format response
            const formattedClusters = clusters.map(formatClusterData);

            res.status(200).json({
                status: 200,
                data: formattedClusters,
                message: 'Clusters generated successfully'
            });

        } catch (error) {
            console.error('Clustering error:', error);
            res.status(500).json({
                status: 500,
                message: 'Error generating clusters',
                error: error.message
            });
        }
    },

    async getClusterChildren(req, res) {
        try {
            const { clusterId, zoom } = req.query;
            if (!clusterId || !zoom) {
                return res.status(400).json({
                    status: 400,
                    message: 'Cluster ID and zoom level are required'
                });
            }

            // Get all panoramas
            const panoramas = await panoramaService.getAllPanoramas();
            
            // Create index
            const index = new Supercluster({
                radius: 40,
                maxZoom: 16,
                minZoom: 0
            });

            // Load points
            const points = panoramas.map(p => ({
                type: 'Feature',
                properties: {
                    id: p._id,
                    title: p.title,
                    category: p.category,
                    thumbnailUrl: p.thumbnailUrl
                },
                geometry: {
                    type: 'Point',
                    coordinates: p.location.coordinates
                }
            }));

            index.load(points);

            // Get children of the cluster
            const children = index.getChildren(clusterId, Math.floor(Number(zoom)))
                .map(formatClusterData);

            res.status(200).json({
                status: 200,
                data: children,
                message: 'Cluster children retrieved successfully'
            });

        } catch (error) {
            console.error('Error getting cluster children:', error);
            res.status(500).json({
                status: 500,
                message: 'Error retrieving cluster children',
                error: error.message
            });
        }
    }
};

module.exports = markerClusterController;