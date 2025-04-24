import React from 'react';
import { Link } from 'react-router-dom';
import './style/QuickNav.css';

const QuickNav = ({ scenes, currentSceneId }) => {
    return (
        <div className="quick-nav">
            {scenes.map(scene => (
                <Link
                    key={scene.panoramaId}
                    to={`/panorama/${scene.panoramaId}`}
                    className={`nav-item ${scene.panoramaId === currentSceneId ? 'active' : ''}`}
                    title={scene.title}
                >
                    {scene.title}
                </Link>
            ))}
        </div>
    );
};

export default QuickNav;