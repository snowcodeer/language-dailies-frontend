import React, { useState, useEffect } from 'react';
import { FaBook } from 'react-icons/fa';
import '../styles/VocabBox.css';

const VocabBox = () => {
  const [clicked, setClicked] = useState(Array(4).fill(false));

  const handleClick = (index) => {
    const newClicked = [...clicked];
    newClicked[index] = true;
    setClicked(newClicked);
  };

  useEffect(() => {
    if (clicked.every(Boolean)) {
      setTimeout(() => {
        setClicked(Array(4).fill(false));
      }, 1500);
    }
  }, [clicked]);

  return (
    <>
      <h2>
        <span className="heading-text">Vocabulario de hoy</span>
        <FaBook style={{ color: '#219fed' }}/>
      </h2>
      <div className="vocab-grid">
        {['Hola', 'Adiós', 'Gracias', 'Por favor'].map((word, index) => (
          <button
            key={index}
            className={`vocab-box ${clicked[index] ? 'faded' : ''}`}
            onClick={() => handleClick(index)}
            style={{ outline: 'none' }}
          >
            <span className={`spanish-word ${clicked[index] ? 'hidden' : ''}`}>{word}</span>
            <span className={`english-word ${clicked[index] ? 'hidden' : ''}`}><em>{['Hello', 'Goodbye', 'Thank you', 'Please'][index]}</em></span>
          </button>
        ))}
      </div>
    </>
  );
};

export default VocabBox;