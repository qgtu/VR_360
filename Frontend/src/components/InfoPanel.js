import React from 'react';
import { Link } from 'react-router-dom';
import './style/InfoPanel.css';

const InfoPanel = ({ panorama, onClose, relatedPanoramas = [] }) => {
    if (!panorama) return null;

    const {
        title,
        description,
        location,
        category,
        audioUrl
    } = panorama;

    const getCategoryEmoji = (category) => {
        switch (category) {
            case 'beaches': return '🏖️ Bãi biển';
            case 'mountains': return '🏔️ Núi';
            case 'cities': return '🌆 Thành phố';
            case 'cultural': return '🏛️ Di tích văn hóa';
            default: return '📍 Địa điểm';
        }
    };

    return (
        <div className="info-panel">
            <button className="close-button" onClick={onClose}>×</button>
            
            <div className="info-content">
                <nav className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to={`/category/${category}`}>{getCategoryEmoji(category)}</Link>
                    <span>/</span>
                    <span>{title}</span>
                </nav>

                <h1>{title}</h1>
                
                <div className="location-details">
                    <span className="location-icon">📍</span>
                    {location && (
                        <span>{location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E</span>
                    )}
                </div>

                <div className="description-section">
                    <h3>Giới thiệu</h3>
                    <p>{description}</p>
                </div>

                {audioUrl && (
                    <div className="audio-guide-info">
                        <h3>🎧 Audio Guide</h3>
                        <p>Địa điểm này có hướng dẫn audio. Bấm play để nghe.</p>
                    </div>
                )}

                <div className="hotspot-guide">
                    <h3>Điểm tương tác</h3>
                    <ul className="hotspot-types">
                        <li><span className="dot green"></span> Chuyển cảnh</li>
                        <li><span className="dot blue"></span> Thông tin</li>
                        <li><span className="dot orange"></span> Hình ảnh</li>
                        <li><span className="dot red"></span> Video</li>
                    </ul>
                </div>

                {relatedPanoramas.length > 0 && (
                    <div className="related-destinations">
                        <h3>Địa điểm liên quan</h3>
                        <div className="related-grid">
                            {relatedPanoramas.map(related => (
                                <Link 
                                    key={related.panoramaId}
                                    to={`/panorama/${related.panoramaId}`}
                                    className="related-card"
                                >
                                    <img 
                                        src={related.thumbnailUrl} 
                                        alt={related.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/fallback-image.png';
                                        }}
                                    />
                                    <div className="related-info">
                                        <h4>{related.title}</h4>
                                        <span>{getCategoryEmoji(related.category)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoPanel;