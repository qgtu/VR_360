import React, { useState, useRef, useEffect } from 'react';
import './style/AudioGuide.css';

const AudioGuide = ({ audioUrl, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };

        const setAudioTime = () => setCurrentTime(audio.currentTime);

        // Add event listeners
        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            // Cleanup
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgress = (e) => {
        const compute = (e.clientX - progressRef.current.getBoundingClientRect().left) / progressRef.current.offsetWidth;
        const time = compute * duration;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        <div className="audio-guide">
            <audio ref={audioRef} src={audioUrl} />
            
            <div className="audio-controls">
                <button 
                    className={`play-button ${isPlaying ? 'playing' : ''}`}
                    onClick={togglePlay}
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>
                
                <div className="audio-info">
                    <div className="audio-title">{title}</div>
                    <div 
                        className="progress-bar" 
                        ref={progressRef}
                        onClick={handleProgress}
                    >
                        <div 
                            className="progress"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                    </div>
                    <div className="time">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioGuide;