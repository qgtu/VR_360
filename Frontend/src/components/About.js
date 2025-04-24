import React from 'react';
import './style/About.css';

const About = () => {
    return (
        <div className="about-container">
            <section className="about-hero">
                <h1>Experience Vietnam in Virtual Reality</h1>
                <p>Discover the beauty of Vietnam through immersive 360° tours and virtual reality experiences</p>
            </section>

            <section className="about-features">
                <div className="feature">
                    <h3>360° Panoramas</h3>
                    <p>Explore high-quality panoramic views of Vietnam's most stunning locations</p>
                </div>
                <div className="feature">
                    <h3>Virtual Reality</h3>
                    <p>Experience our tours in VR using your compatible device</p>
                </div>
                <div className="feature">
                    <h3>Interactive Map</h3>
                    <p>Navigate through locations using our interactive map interface</p>
                </div>
            </section>

            <section className="about-technology">
                <h2>Our Technology</h2>
                <p>We use cutting-edge web technologies to bring you the best virtual tour experience:</p>
                <ul>
                    <li>WebXR for immersive VR experiences</li>
                    <li>Three.js for 3D rendering</li>
                    <li>React for smooth user interactions</li>
                    <li>Leaflet for interactive mapping</li>
                </ul>
            </section>

            <section className="about-cta">
                <h2>Ready to Explore?</h2>
                <p>Start your virtual journey through Vietnam's most beautiful destinations.</p>
                <button onClick={() => window.location.href = '/map'} className="cta-button">
                    Start Exploring
                </button>
            </section>
        </div>
    );
};

export default About;