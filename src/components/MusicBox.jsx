import React from 'react';
import { FaMusic } from 'react-icons/fa';
import '../styles/BentoBox.css';

const MusicBox = () => {
  return (
    <>
      <h2>
        <span className="heading-text">Sugerencia de canción de hoy</span>
        <FaMusic style={{ color: '#dd4a4a' }} />
      </h2>
      <div className="inner-box pastel-red" style={{ display: 'flex', alignItems: 'left', padding: '10px' }}>
      <div className="music-container">
          <div className="play-button-container">
            <div className="triangle"></div>
          </div>
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
