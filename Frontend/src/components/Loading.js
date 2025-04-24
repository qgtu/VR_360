import React from 'react';
import './style/Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing places...</p>
        </div>
    );
};

export default Loading;