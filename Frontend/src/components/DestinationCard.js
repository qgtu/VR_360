import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/DestinationCard.css';

const DestinationCard = ({ panorama }) => {
    const [isPreviewHovered, setIsPreviewHovered] = useState(false);

    if (!panorama) return null;

    const {
        panoramaId,
        title,
        description,
        thumbnailUrl,
        location,
        category,
        hotspots = []
    } = panorama;

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'beaches': return '🏖️';
            case 'mountains': return '🏔️';
            case 'cities': return '🌆';
            case 'cultural': return '🏛️';
            default: return '📍';
        }
    };

    return (
        <div className="destination-card">
            <div 
                className="panorama-preview"
                onMouseEnter={() => setIsPreviewHovered(true)}
                onMouseLeave={() => setIsPreviewHovered(false)}
            >
                <img 
                    src={thumbnailUrl} 
                    alt={title || 'Panorama view'}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/fallback-image.png';
                    }}
                    className={isPreviewHovered ? 'scale' : ''}
                />
                <div className="vr-badge">360° VR</div>
                {isPreviewHovered && (
                    <div className="preview-overlay">
                        <span className="view-text">View in VR</span>
                    </div>
                )}
            </div>
            <div className="destination-info">
                <div className="destination-header">
                    <h3>{title || 'Untitled Panorama'}</h3>
                    <span className="category-icon" title={category}>
                        {getCategoryIcon(category)}
                    </span>
                </div>
                <p className="description">{description || 'No description available'}</p>
                {location && (
                    <div className="location-info">
                        <span className="location-icon">📍</span>
                        <span>{location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E</span>
                    </div>
                )}
                <div className="destination-stats">
                    <span className="stat-item">
                        <span className="stat-icon">🎯</span>
                        {hotspots.length} Points of Interest
                    </span>
                </div>
                <Link 
                    to={`/panorama/${panoramaId}`} 
                    className="view-button"
                >
                    Explore Now
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;