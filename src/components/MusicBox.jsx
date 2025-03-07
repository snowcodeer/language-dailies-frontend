import React, { useState, useEffect, useRef } from 'react';
import { FaMusic, FaPlay, FaPause } from 'react-icons/fa';
import '../styles/MusicBox.css';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState('CAMALEÓN'); // Change as needed
  const [artistName, setArtistName] = useState('Belén Aguilera'); // Change as needed
  const playerRef = useRef(null);
  const videoId = 'owxDYkHYTJA'; // Replace with your video ID
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    // Load the YouTube IFrame API if not already loaded.
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtube-iframe-api';
      document.body.appendChild(tag);
    }

    // Define the global callback for when the API is ready.
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId,
        playerVars: {
          origin: window.location.origin,
        },
      });
    };

    // Cleanup: remove the global callback on unmount.
    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

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
            {/* The song title is now a link to the YouTube video */}
            <div className="song-title">
              <a 
                href={youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'inherit', textDecoration: 'none' }}
                className="song-link"
              >
                {songTitle}
              </a>
            </div>
            <div className="artist-name">{artistName}</div>
          </div>
        </div>
      </div>
      {/* Invisible YouTube player */}
      <div id="youtube-player" style={{ position: 'absolute', left: '-9999px' }}></div>
    </>
  );
};

export default MusicBox;
