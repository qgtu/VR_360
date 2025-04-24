import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style/Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="logo">
                    VietnamVR
                </Link>
                
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/map" className={`nav-link ${location.pathname === '/map' ? 'active' : ''}`}>
                        Explore Map
                    </Link>
                    <Link to="/featured" className={`nav-link ${location.pathname === '/featured' ? 'active' : ''}`}>
                        Featured Tours
                    </Link>
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                        About
                    </Link>
                </div>

                <div className="nav-cta">
                    <Link to="/map" className="explore-btn">
                        Start VR Tour
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;