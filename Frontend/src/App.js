import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import { fetchPanoramas } from './services/api';
import './App.css';

// Lazy load components
const Home = React.lazy(() => import('./components/Home'));
const MapModule = React.lazy(() => import('./components/MapModule'));
const PanoramaViewer = React.lazy(() => import('./components/PanoramaViewer'));
const FeaturedTours = React.lazy(() => import('./components/FeaturedTours'));
const About = React.lazy(() => import('./components/About'));

const App = () => {
    const [panoramas, setPanoramas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPanoramas = async () => {
            try {
                setLoading(true);
                const data = await fetchPanoramas();
                setPanoramas(data);
            } catch (err) {
                setError(err.message);
                console.error('Error loading panoramas:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPanoramas();
    }, []);

    if (error) {
        return (
            <div className="error-message">
                <h2>Failed to load panoramas</h2>
                <p>{error}</p>
                <button 
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <Router>
            <ErrorBoundary>
                <div className="app-container">
                    <Navbar />
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    loading ? <Loading /> : <Home panoramas={panoramas} />
                                } 
                            />
                            <Route 
                                path="/map" 
                                element={
                                    loading ? <Loading /> : <MapModule panoramas={panoramas} />
                                } 
                            />
                            <Route 
                                path="/panorama/:id" 
                                element={
                                    loading ? <Loading /> : <PanoramaViewer panoramas={panoramas} />
                                } 
                            />
                            <Route 
                                path="/featured" 
                                element={
                                    loading ? <Loading /> : <FeaturedTours panoramas={panoramas} />
                                } 
                            />
                            <Route 
                                path="/about" 
                                element={<About />} 
                            />
                            <Route 
                                path="*" 
                                element={
                                    <div className="not-found">
                                        <h2>404 - Page Not Found</h2>
                                        <p>The page you're looking for doesn't exist.</p>
                                    </div>
                                } 
                            />
                        </Routes>
                    </Suspense>
                </div>
            </ErrorBoundary>
        </Router>
    );
};

export default App;