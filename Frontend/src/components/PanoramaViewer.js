import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fetchPanoramaById, fetchHotspots, getRelatedScenes } from '../services/api';
import Loading from './Loading';
import InfoPanel from './InfoPanel';
import QuickNav from './QuickNav';
import './style/PanoramaViewer.css';

const PanoramaViewer = () => {
    const { id } = useParams();
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);

    const [viewerState, setViewerState] = useState({
        loading: true,
        error: null,
        panorama: null,
        relatedScenes: [],
        showInfo: false,
        currentHotspot: null
    });

    useEffect(() => {
        const loadPanoramaData = async () => {
            try {
                setViewerState(prev => ({ ...prev, loading: true }));
                
                // Fetch panorama, hotspots, and related scenes
                const [panoramaData, hotspotsData, relatedScenesData] = await Promise.all([
                    fetchPanoramaById(id),
                    fetchHotspots(id),
                    getRelatedScenes(id)
                ]);

                initScene(panoramaData);
                
                // Add hotspots
                if (hotspotsData?.length > 0) {
                    addHotspotsToScene(hotspotsData);
                }

                setViewerState(prev => ({
                    ...prev,
                    loading: false,
                    panorama: panoramaData,
                    relatedScenes: relatedScenesData
                }));

            } catch (error) {
                console.error('Error loading panorama:', error);
                setViewerState(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message
                }));
            }
        };

        if (id) {
            loadPanoramaData();
        }

        return () => {
            // Cleanup
            if (rendererRef.current && rendererRef.current.domElement) {
                rendererRef.current.domElement.remove();
            }
            if (controlsRef.current) {
                controlsRef.current.dispose();
            }
            if (sceneRef.current) {
                sceneRef.current.clear();
            }
        };
    }, [id]);

    const initScene = useCallback((panorama) => {
        if (!containerRef.current || !panorama?.imageUrl) return;

        // Setup scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Setup camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 0.1;
        cameraRef.current = camera;

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(renderer.domElement);
        }
        rendererRef.current = renderer;

        // Load panorama texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            panorama.imageUrl,
            (texture) => {
                const geometry = new THREE.SphereGeometry(500, 60, 40);
                geometry.scale(-1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ map: texture });
                const sphere = new THREE.Mesh(geometry, material);
                scene.add(sphere);

                // Setup controls
                const controls = new OrbitControls(camera, renderer.domElement);
                controls.enableZoom = false;
                controls.enablePan = false;
                controls.rotateSpeed = 0.5;
                controlsRef.current = controls;

                // Animation loop
                const animate = () => {
                    requestAnimationFrame(animate);
                    controls.update();
                    renderer.render(scene, camera);
                };
                animate();

                // Set initial camera position if provided
                if (panorama.initialCamera) {
                    const { lat, lng } = panorama.initialCamera;
                    camera.rotation.set(
                        THREE.MathUtils.degToRad(lat),
                        THREE.MathUtils.degToRad(lng),
                        0,
                        'YXZ'
                    );
                }
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
                setViewerState(prev => ({
                    ...prev,
                    error: 'Không thể tải ảnh panorama'
                }));
            }
        );

        // Handle window resize
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const addHotspotsToScene = useCallback((hotspots) => {
        if (!hotspots || !sceneRef.current) return;

        hotspots.forEach(hotspot => {
            const sprite = createHotspotSprite(hotspot.type);
            
            // Convert position to spherical coordinates
            const { x, y, z } = hotspot.position;
            const radius = 495;
            
            sprite.position.set(x * radius, y * radius, z * radius);
            sprite.userData = {
                type: 'hotspot',
                data: hotspot,
                onClick: () => handleHotspotClick(hotspot)
            };

            sceneRef.current.add(sprite);
        });
    }, []);

    const createHotspotSprite = (type) => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(32, 32, 24, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = type === 'scene' ? '#4CAF50' : 
                         type === 'info' ? '#2196F3' : 
                         type === 'image' ? '#FF9800' : '#f44336';
        ctx.stroke();

        // Add icon based on type
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            type === 'scene' ? '🚪' : 
            type === 'info' ? 'ℹ️' : 
            type === 'image' ? '🖼️' : '🎥',
            32,
            32
        );

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        return new THREE.Sprite(material);
    };

    const handleHotspotClick = (hotspot) => {
        if (hotspot.type === 'scene' && hotspot.targetSceneId) {
            // Navigate to target scene
            window.location.href = `/panorama/${hotspot.targetSceneId}`;
        } else {
            // Show info panel
            setViewerState(prev => ({
                ...prev,
                showInfo: true,
                currentHotspot: hotspot
            }));
        }
    };

    if (viewerState.error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <h3>Lỗi khi tải panorama</h3>
                    <p>{viewerState.error}</p>
                    <button onClick={() => window.location.reload()}>
                        Tải lại trang
                    </button>
                </div>
            </div>
        );
    }

    if (viewerState.loading) {
        return <Loading />;
    }

    return (
        <div className="panorama-viewer">
            <div ref={containerRef} className="viewer-container" />
            
            {viewerState.showInfo && viewerState.currentHotspot && (
                <InfoPanel
                    hotspot={viewerState.currentHotspot}
                    onClose={() => setViewerState(prev => ({
                        ...prev,
                        showInfo: false,
                        currentHotspot: null
                    }))}
                />
            )}

            <QuickNav
                scenes={viewerState.relatedScenes}
                currentSceneId={id}
            />
        </div>
    );
};

export default PanoramaViewer;