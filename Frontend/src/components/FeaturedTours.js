import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/FeaturedTours.css';

const FeaturedTours = ({ panoramas }) => {
    const [activeTourIndex, setActiveTourIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveTourIndex((prev) => 
                    prev === panoramas.length - 1 ? 0 : prev + 1
                );
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, panoramas.length]);

    if (!panoramas || panoramas.length === 0) {
        return <div>Loading featured tours...</div>;
    }

    return (
        <div className="featured-tours">
            <div className="featured-header">
                <h1>Featured Virtual Tours</h1>
                <p>Explore Vietnam's most stunning destinations in immersive 360° VR</p>
            </div>

            <div className="tour-showcase">
                <div className="main-preview">
                    <div className="preview-container">
                        <img 
                            src={panoramas[activeTourIndex].imageUrl} 
                            alt={panoramas[activeTourIndex].title}
                            className="preview-image"
                        />
                        <div className="preview-overlay">
                            <h2>{panoramas[activeTourIndex].title}</h2>
                            <p>{panoramas[activeTourIndex].description}</p>
                            <Link 
                                to={`/panorama/${panoramas[activeTourIndex].panoramaId}`}
                                className="start-tour-btn"
                            >
                                Start VR Tour
                            </Link>
                        </div>
                    </div>
                    <div className="preview-controls">
                        <button 
                            className="control-btn"
                            onClick={() => setActiveTourIndex(prev => 
                                prev === 0 ? panoramas.length - 1 : prev - 1
                            )}
                        >
                            ←
                        </button>
                        <button 
                            className="play-btn"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button 
                            className="control-btn"
                            onClick={() => setActiveTourIndex(prev => 
                                prev === panoramas.length - 1 ? 0 : prev + 1
                            )}
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="tour-thumbnails">
                    {panoramas.map((tour, index) => (
                        <div 
                            key={tour.panoramaId}
                            className={`thumbnail ${index === activeTourIndex ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTourIndex(index);
                                setIsPlaying(false);
                            }}
                        >
                            <img src={tour.imageUrl} alt={tour.title} />
                            <div className="thumbnail-info">
                                <h3>{tour.title}</h3>
                                <span className="location">📍 {tour.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedTours;