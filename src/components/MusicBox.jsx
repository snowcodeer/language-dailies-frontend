import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaMusic, FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import '../styles/MusicBox.css';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState('CAMALEÓN'); // Change as needed
  const [artistName, setArtistName] = useState('Belén Aguilera'); // Change as needed
  const [showHeart, setShowHeart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [heartAnimations, setHeartAnimations] = useState([]);
  const playerRef = useRef(null);
  const timerRef = useRef(null);
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
        videoId: videoId,
        playerVars: {
          origin: window.location.origin,
        },
      });
    };

    // Cleanup: remove the global callback and clear timer on unmount.
    return () => {
      window.onYouTubeIframeAPIReady = null;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [videoId]);

  // When isPlaying changes, play or pause the video and start a timer if playing.
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      if (isPlaying) {
        playerRef.current.playVideo();
        // Start a 5-second timer to show the heart icon.
        timerRef.current = setTimeout(() => setShowHeart(true), 5000);
      } else {
        playerRef.current.pauseVideo();
        // Clear timer if paused before timer completes.
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    }
  }, [isPlaying]);

  // Toggle the play/pause state.
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // Toggle the liked state and spawn a heart animation.
  const handleLikeClick = () => {
    setLiked(prev => !prev);
    if (!liked) {
      addHeartAnimation();
    }
  };

  const addHeartAnimation = () => {
    const id = Date.now();
    setHeartAnimations(prev => [...prev, id]);
    // Remove the heart after the animation duration (2 seconds).
    setTimeout(() => {
      setHeartAnimations(prev => prev.filter(heartId => heartId !== id));
    }, 2000);
  };

  // Create a portal for heart animations rendered in a layer on top.
  const heartAnimationPortal = createPortal(
    <div className="heart-animation-portal">
      {heartAnimations.map(id => (
        <div key={id} className="heart-animation">
          <FaHeart size={24} color="#dd4a4a" />
        </div>
      ))}
    </div>,
    document.body
  );

  return (
    <>
      <h2>
        <span className="heading-text">Canción del día</span>
        <div className="like-icon-container">
          {showHeart ? (
            liked ? (
              <FaHeart style={{ color: '#dd4a4a', cursor: 'pointer' }} onClick={handleLikeClick} />
            ) : (
              <FaRegHeart style={{ color: '#dd4a4a', cursor: 'pointer' }} onClick={handleLikeClick} />
            )
          ) : (
            <FaMusic style={{ color: '#dd4a4a' }} />
          )}
        </div>
      </h2>
      <div className="inner-box pastel-red" style={{ display: 'flex', alignItems: 'left', padding: '10px' }}>
        <div className="music-container">
          <button className="play-button" onClick={togglePlayPause}>
            {isPlaying ? <FaPause size={30} color="#dd4a4a" /> : <FaPlay size={30} color="#dd4a4a" />}
          </button>
          <div className="song-details">
            {/* The song title is now a link to the YouTube video */}
            <div className="song-title">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="song-link"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {songTitle}
              </a>
            </div>
            <div className="artist-name">{artistName}</div>
          </div>
        </div>
      </div>
      {heartAnimationPortal}
      {/* Invisible YouTube player */}
      <div id="youtube-player" style={{ position: 'absolute', left: '-9999px' }}></div>
    </>
  );
};

export default MusicBox;
