import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DestinationCard from './DestinationCard';
import './style/Home.css';

const Home = ({ panoramas = [] }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    const categories = [
        { id: 'all', name: 'All Destinations' },
        { id: 'beaches', name: 'Beaches' },
        { id: 'mountains', name: 'Mountains' },
        { id: 'cities', name: 'Cities' },
        { id: 'cultural', name: 'Cultural Sites' }
    ];

    const filterPanoramas = useCallback((category, query) => {
        try {
            let filtered = panoramas;
            
            // Filter by category
            if (category !== 'all') {
                filtered = filtered.filter(p => p?.category === category);
            }

            // Filter by search query
            if (query.trim()) {
                const searchTerm = query.toLowerCase();
                filtered = filtered.filter(p => 
                    p?.title?.toLowerCase().includes(searchTerm) ||
                    p?.description?.toLowerCase().includes(searchTerm)
                );
            }

            return filtered || [];
        } catch (err) {
            console.error('Error filtering panoramas:', err);
            setError('Unable to filter panoramas');
            return [];
        }
    }, [panoramas]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const filteredPanoramas = filterPanoramas(activeCategory, searchQuery);

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Discover Vietnam's Most Beautiful Places</h1>
                    <p>Explore breathtaking destinations in immersive 360° views</p>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <Link to="/map" className="cta-button">
                        Start Exploring
                    </Link>
                </div>
            </section>

            <section className="categories-section">
                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="destinations-grid">
                    {filteredPanoramas.map(panorama => (
                        <DestinationCard 
                            key={panorama?.panoramaId || Math.random()} 
                            panorama={panorama}
                        />
                    ))}
                    {filteredPanoramas.length === 0 && (
                        <div className="no-results">
                            <p>No destinations found matching your criteria</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="featured-experiences">
                <h2>Featured VR Experiences</h2>
                <div className="featured-grid">
                    {(panoramas.slice(0, 3) || []).map(panorama => (
                        <DestinationCard 
                            key={panorama?.panoramaId || Math.random()} 
                            panorama={panorama}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;