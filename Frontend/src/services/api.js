import { data } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000/api';

const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            data
        });
        const error = (data && data.message) || response.statusText;
        throw new Error(error);
    }

    return data;
};

// Panorama APIs
export const fetchPanoramas = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/panorama/list`);
        console.log(data);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching panoramas:', error);
        throw error;
    }
};

export const fetchPanoramaById = async (panoramaId) => {
    try {
        if (!panoramaId) throw new Error('PanoramaId is required');
        const response = await fetch(`${API_BASE_URL}/panorama/${panoramaId}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching panorama:', error);
        throw error;
    }
};

export const getNearbyPanoramas = async (lat, lng, radius) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/panorama/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
        );
        return await handleResponse(response);
    } catch (error) {
        console.error('Error finding nearby panoramas:', error);
        throw error;
    }
};

export const getPanoramasByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/panorama/category/${category}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error getting panoramas by category:', error);
        throw error;
    }
};

// Hotspot APIs
export const fetchHotspots = async (panoramaId) => {
    try {
        if (!panoramaId) throw new Error('PanoramaId is required');
        const response = await fetch(`${API_BASE_URL}/hotspot/${panoramaId}/hotspots`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching hotspots:', error);
        throw error;
    }
};

export const addHotspot = async (panoramaId, hotspotData) => {
    try {
        if (!panoramaId || !hotspotData) throw new Error('PanoramaId and hotspot data are required');
        const response = await fetch(`${API_BASE_URL}/hotspot/${panoramaId}/hotspots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hotspotData)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error adding hotspot:', error);
        throw error;
    }
};

export const deleteHotspot = async (panoramaId, hotspotId) => {
    try {
        if (!panoramaId || !hotspotId) throw new Error('PanoramaId and HotspotId are required');
        const response = await fetch(`${API_BASE_URL}/hotspot/${panoramaId}/hotspots/${hotspotId}`, {
            method: 'DELETE'
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error deleting hotspot:', error);
        throw error;
    }
};

export const getRelatedScenes = async (panoramaId) => {
    try {
        if (!panoramaId) throw new Error('PanoramaId is required');
        const hotspots = await fetchHotspots(panoramaId);
        
        const relatedScenes = await Promise.all(
            hotspots
                .filter(h => h.type === 'scene')
                .map(async hotspot => {
                    if (hotspot.targetSceneId) {
                        const sceneData = await fetchPanoramaById(hotspot.targetSceneId);
                        return {
                            ...sceneData,
                            hotspotPosition: hotspot.position
                        };
                    }
                    return null;
                })
        );

        return relatedScenes.filter(Boolean);
    } catch (error) {
        console.error('Error fetching related scenes:', error);
        return [];
    }
};