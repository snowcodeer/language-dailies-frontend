import React, { useState } from 'react';
import { FaMusic, FaPlay, FaPause } from 'react-icons/fa';
import '../styles/MusicBox.css';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  }
  return (
    <>
      <h2>
        <span className="heading-text">Sugerencia de canción de hoy</span>
        <FaMusic style={{ color: '#dd4a4a' }} />
      </h2>
      <div className="inner-box pastel-red" style={{ display: 'flex', alignItems: 'left', padding: '10px' }}>
        <div className="music-container">
          <button className="play-button" onClick={togglePlayPause}>
            {isPlaying ? <FaPause size={32} color="#dd4a4a" /> : <FaPlay size={32} color="#dd4a4a" />}
          </button>
          <div className="song-details">
            <div className="song-title">Song Title</div>
            <div className="artist-name">Artist Name</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicBox;
