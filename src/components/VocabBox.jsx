import React, { useState, useEffect } from 'react';
import { FaBook, FaUndo } from 'react-icons/fa';
import '../styles/VocabBox.css';

const VocabBox = () => {
  const [clicked, setClicked] = useState(Array(4).fill(false));
  const [hidden, setHidden] = useState(Array(4).fill(false));
  const [showUndo, setShowUndo] = useState(false);
  const [undoCounter, setUndoCounter] = useState(0);
  const [answer, setAnswer] = useState(false);

  const handleClick = (index) => {
    const newClicked = [...clicked];
    newClicked[index] = true;
    setClicked(newClicked);
    setShowUndo(true);

    setTimeout(() => {
      const newHidden = [...hidden];
      newHidden[index] = true;
      setHidden(newHidden);
    }, 800); // Set visibility to hidden after 0.8s
  };

  const handleUndo = () => {
    setClicked(Array(4).fill(false));
    setHidden(Array(4).fill(false));
    setShowUndo(false);
    setUndoCounter(undoCounter + 1);
    setAnswer(false);
    console.log(`Undo Counter: ${undoCounter + 1}`);
  };

  useEffect(() => {
    if (clicked.every(Boolean)) {
      setTimeout(() => {
        setAnswer(true);
        setHidden(Array(4).fill(false)); // Ensure Spanish words are visible
        setClicked(Array(4).fill(false)); // Turn off faded state
      }, 1500);
    }
  }, [clicked]);

  return (
    <>
      <h2>
        <span className="heading-text">Vocabulario de hoy</span>
        {showUndo || answer ? (
          <FaUndo style={{ color: '#219fed', cursor: 'pointer' }} onClick={handleUndo} />
        ) : (
          <FaBook style={{ color: '#219fed' }} />
        )}
      </h2>
      <div className="vocab-grid">
        {['Hola', 'Adiós', 'Gracias', 'Por favor'].map((word, index) => (
          <button
            key={index}
            className={`vocab-box ${clicked[index] ? 'faded' : ''} ${answer ? 'answer' : ''}`}
            onClick={() => handleClick(index)}
            style={{ outline: 'none' }}
          >
            <span className={`spanish-word ${hidden[index] && !answer ? 'hidden' : ''} ${answer ? 'visible' : ''}`}>{word}</span>
            <span className={`english-word ${hidden[index] || answer ? 'hidden' : ''}`}><em>{['Hello', 'Goodbye', 'Thank you', 'Please'][index]}</em></span>
          </button>
        ))}
      </div>
    </>
  );
};

export default VocabBox;