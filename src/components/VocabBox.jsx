import React from 'react';
import { FaBook } from 'react-icons/fa';
import '../styles/VocabBox.css';

const VocabBox = () => {
  return (
    <>
      <h2>
        <span className="heading-text">Vocabulario de hoy</span>
        <FaBook style={{ color: '#219fed' }}/>
      </h2>
      <div className="vocab-grid">
        <div className="vocab-box">
          <span className="spanish-word">Hola</span>
          <span className="english-word"><em>Hello</em></span>
        </div>
        <div className="vocab-box">
          <span className="spanish-word">Adiós</span>
          <span className="english-word"><em>Goodbye</em></span>
        </div>
        <div className="vocab-box">
          <span className="spanish-word">Gracias</span>
          <span className="english-word"><em>Thank you</em></span>
        </div>
        <div className="vocab-box">
          <span className="spanish-word">Por favor</span>
          <span className="english-word"><em>Please</em></span>
        </div>
      </div>
    </>
  );
};

export default VocabBox;