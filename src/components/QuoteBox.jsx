import React, { useState } from 'react';
import '../styles/BentoBox.css';
import { FaQuoteRight } from 'react-icons/fa';

const QuoteBox = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <>
      <h2>
        <span className="heading-text">Frase del día</span>
        <FaQuoteRight style={{ color: '#ad6be3' }}/> 
      </h2>
      <div 
        className={`inner-box pastel-purple ${flipped ? 'flipped' : ''}`} 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#909090', transition: 'transform 0.6s', transformStyle: 'preserve-3d', position: 'relative' }}
        onClick={handleFlip}
      >
        <div className="front" style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ margin: '0', textAlign: 'center' }}><i>"Caminante, no hay camino, se hace caminho al andar."</i></p>
        </div>
        <div className="back" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ margin: '0', textAlign: 'center' }}><i>"Traveler, there is no path, the path is made by walking."</i></p>
        </div>
      </div>
    </>
  );
};

export default QuoteBox;
