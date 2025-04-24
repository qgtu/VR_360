import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getRelatedScenes } from '../services/api';
import './style/MapModule.css';

// Khởi tạo accessToken cho Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibmdvY3R0ZCIsImEiOiJja2h5NGtubXIwMjVmMnJsN3p3ZDN4MHdsIn0.bPHcNd5oknSKH-BJdi1dIg';

const MapModule = ({ panoramas }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const linesRef = useRef([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [relatedScenes, setRelatedScenes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm vẽ đường kết nối giữa các scene
    const drawConnections = (mainLocation, relatedLocations) => {
        // Xóa các đường cũ
        linesRef.current.forEach(line => line.remove());
        linesRef.current = [];

        if (!mainLocation || !relatedLocations.length) return;

        relatedLocations.forEach(related => {
            if (related.location && related.location.lat && related.location.lng) {
                // Tạo feature cho đường kết nối
                const lineFeature = {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [mainLocation.location.lng, mainLocation.location.lat],
                            [related.location.lng, related.location.lat]
                        ]
                    }
                };

                // Thêm layer cho đường kết nối
                const lineId = `line-${mainLocation.panoramaId}-${related.panoramaId}`;
                if (mapRef.current.getLayer(lineId)) {
                    mapRef.current.removeLayer(lineId);
                }
                if (mapRef.current.getSource(lineId)) {
                    mapRef.current.removeSource(lineId);
                }

                mapRef.current.addSource(lineId, {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [lineFeature]
                    }
                });

                mapRef.current.addLayer({
                    id: lineId,
                    type: 'line',
                    source: lineId,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#2196f3',
                        'line-width': 2,
                        'line-opacity': 0.8,
                        'line-dasharray': [2, 1]
                    }
                });

                linesRef.current.push({
                    remove: () => {
                        if (mapRef.current.getLayer(lineId)) {
                            mapRef.current.removeLayer(lineId);
                        }
                        if (mapRef.current.getSource(lineId)) {
                            mapRef.current.removeSource(lineId);
                        }
                    }
                });
            }
        });
    };

    // Load related scenes when selecting a location
    useEffect(() => {
        const loadRelatedScenes = async () => {
            if (selectedLocation) {
                const scenes = await getRelatedScenes(selectedLocation.panoramaId);
                setRelatedScenes(scenes);
                drawConnections(selectedLocation, scenes);
            } else {
                setRelatedScenes([]);
                linesRef.current.forEach(line => line.remove());
                linesRef.current = [];
            }
        };

        loadRelatedScenes();
    }, [selectedLocation]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Khởi tạo map ở trung tâm Việt Nam
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [105.8342, 21.0278], // Hanoi coordinates [lng, lat]
            zoom: 5
        });

        // Thêm controls
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        mapRef.current.addControl(new mapboxgl.FullscreenControl());
        
        // Thêm markers cho mỗi panorama
        panoramas.forEach((panorama) => {
            if (panorama.location && panorama.location.lat && panorama.location.lng) {
                console.log('Adding marker for:', panorama.title, 'at:', panorama.location);
                
                // Tạo element cho marker
                const el = document.createElement('div');
                el.className = 'custom-marker';

                // Tạo popup với thông tin chi tiết
                const popup = new mapboxgl.Popup({ offset: 25, className: 'custom-popup' })
                    .setHTML(`
                        <div class="popup-content">
                            ${panorama.thumbnailUrl || panorama.imageUrl ? 
                                `<img src="${panorama.thumbnailUrl || panorama.imageUrl}" 
                                     alt="${panorama.title}"
                                     onerror="this.style.display='none'"
                                />` : ''}
                            <h3>${panorama.title}</h3>
                            <p>${panorama.description || ''}</p>
                            <a href="/panorama/${panorama.panoramaId}" class="view-tour-btn">
                                Xem tour VR
                            </a>
                        </div>
                    `);

                // Tạo marker và thêm vào map
                const marker = new mapboxgl.Marker(el)
                    .setLngLat([
                        parseFloat(panorama.location.lng), 
                        parseFloat(panorama.location.lat)
                    ])
                    .setPopup(popup)
                    .addTo(mapRef.current);

                // Lưu marker để có thể xóa sau này
                markersRef.current.push(marker);

                // Xử lý sự kiện click
                el.addEventListener('click', () => {
                    setSelectedLocation(panorama);
                });
            }
        });

        mapRef.current.on('load', () => {
            setLoading(false);
        });

        // Cleanup function
        return () => {
            linesRef.current.forEach(line => line.remove());
            markersRef.current.forEach(marker => marker.remove());
            if (mapRef.current) mapRef.current.remove();
        };
    }, [panoramas]);

    // Di chuyển map đến vị trí được chọn
    useEffect(() => {
        if (selectedLocation && mapRef.current) {
            const bounds = new mapboxgl.LngLatBounds();
            
            // Add main location to bounds
            bounds.extend([selectedLocation.location.lng, selectedLocation.location.lat]);
            
            // Add related scenes to bounds
            relatedScenes.forEach(scene => {
                if (scene.location && scene.location.lat && scene.location.lng) {
                    bounds.extend([scene.location.lng, scene.location.lat]);
                }
            });

            mapRef.current.fitBounds(bounds, {
                padding: 50,
                duration: 1000
            });
        }
    }, [selectedLocation, relatedScenes]);

    return (
        <div className="map-fullscreen">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner" />
                    <p>Đang tải bản đồ...</p>
                </div>
            )}
            <div ref={mapContainerRef} className="map-container" />
            {selectedLocation && (
                <div className="location-detail">
                    <button 
                        className="close-btn" 
                        onClick={() => setSelectedLocation(null)}
                        aria-label="Đóng"
                    >×</button>
                    <h3>{selectedLocation.title}</h3>
                    <p>{selectedLocation.description}</p>
                    {relatedScenes.length > 0 && (
                        <div className="related-scenes">
                            <h4>Các cảnh liên quan:</h4>
                            <div className="scene-list">
                                {relatedScenes.map(scene => (
                                    <a 
                                        key={scene.panoramaId}
                                        href={`/panorama/${scene.panoramaId}`}
                                        className="scene-link"
                                    >
                                        {scene.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                    <a 
                        href={`/panorama/${selectedLocation.panoramaId}`}
                        className="view-tour-btn"
                    >
                        Khám phá VR
                    </a>
                </div>
            )}
        </div>
    );
};

export default MapModule;