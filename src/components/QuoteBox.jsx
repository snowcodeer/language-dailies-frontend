import React, { useState } from 'react';
import '../styles/QuoteBox.css';
import { createPortal } from 'react-dom';
import { FaQuoteRight, FaHeart, FaRegHeart } from 'react-icons/fa';

const QuoteBox = () => {
  const [flipped, setFlipped] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [heartAnimations, setHeartAnimations] = useState([]);

  const toggleFlip = () => {
    setFlipped(prev => !prev);
    if (!showHeart) {
      setShowHeart(true);
    }
  };

  const handleLikeClick = () => {
    setLiked(prev => !prev);
    if (!liked) {
      addHeartAnimation();
    }
  };

  const addHeartAnimation = () => {
    const id = Date.now();
    setHeartAnimations(prev => [...prev, id]);
    setTimeout(() => {
      setHeartAnimations(prev => prev.filter(heartId => heartId !== id));
    }, 2000);
  };

  // Create a portal for heart animations rendered in a layer on top.
    const heartAnimationPortal = createPortal(
      <div className="heart-animation-portal2">
        {heartAnimations.map(id => (
          <div key={id} className="heart-animation2">
            <FaHeart size={24} color="#ad6be3" />
          </div>
        ))}
      </div>,
      document.body
    );

    const frontText = "La última coca cola del desierto.";
    const backText = "Alguien que se tiene muy alta opinión de sí mismo.";

    // Helper function to conditionally render line breaks
    const renderLineBreaks = (text) => {
      const wordCount = text.split(' ').length;
      return wordCount > 10 ? <br /> : (<><br /><br /></>);
    };

  return (
    <>
      <h2>
        <span className="heading-text">Frase del día</span>
        <div className="like-icon-container">
                  {showHeart ? (
                    liked ? (
                      <FaHeart style={{ color: '#ad6be3', cursor: 'pointer' }} onClick={handleLikeClick} />
                    ) : (
                      <FaRegHeart style={{ color: '#ad6be3', cursor: 'pointer' }} onClick={handleLikeClick} />
                    )
                  ) : (
                    <FaQuoteRight style={{ color: '#ad6be3' }} />
                  )}
                </div>
      </h2>
      <div className={`card ${flipped ? 'flipped' : ''}`} onClick={toggleFlip}>
        <div className="content">
          <div className="front pastel-purple">
          {renderLineBreaks(frontText)}
            {frontText}
          </div>
          <div className="back">
            {renderLineBreaks(backText)}
            {backText}
          </div>
        </div>
      </div>
      {heartAnimationPortal}
    </>
  );
};

export default QuoteBox;
