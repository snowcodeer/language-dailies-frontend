import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaUndo, FaCheck } from 'react-icons/fa';
import '../styles/ConjugationBox.css';

const ConjugationBox = () => {
  const [draggedTense, setDraggedTense] = useState(null);
  const [droppedTenses, setDroppedTenses] = useState({});
  const [allFilled, setAllFilled] = useState(false);
  const [shuffledTenses, setShuffledTenses] = useState([]);

  const narrativeDictionary = {
    paragraph: "En un bullicioso barrio, Javier ha recorrido museos y degustado platos exquisitos que lo inspiraron a cambiar su destino. Un día, encontró una invitación misteriosa que lo impulsó a explorar nuevos horizontes y desafiar su rutina. Convencido de que el arte transformaría su futuro, decidió embarcarse en una aventura única y descubrir culturas diversas. Si tuviera la oportunidad, exploraría caminos inesperados para ampliar su visión. Mañana, partirá con determinación para descubrir un mundo lleno de inspiración y crecimiento personal real.",
  paragraphWithBlanks: "En un bullicioso barrio, Javier ha recorrido museos y degustado platos exquisitos que lo inspiraron a cambiar su destino. Un día, ______ (encontrar) una invitación misteriosa que lo impulsó a explorar nuevos horizontes y desafiar su rutina. Convencido de que el arte transformaría su futuro, ______ (decidir) embarcarse en una aventura única y descubrir culturas diversas. Si tuviera la oportunidad, ______ (explorar) caminos inesperados para ampliar su visión. Mañana, ______ (partir) con determinación para descubrir un mundo lleno de inspiración y crecimiento personal real.",
  conjugatedVerbs: [
    "encontró",   // replaced by blank
    "decidió",    // replaced by blank
    "exploraría", // replaced by blank
    "partirá"     // replaced by blank
  ],
  infinitiveVerbs: [
    "encontrar",  // for "encontró"
    "decidir",    // for "decidió"
    "explorar",   // for "exploraría"
    "partir"      // for "partirá"
  ],
  tense: [
    "pretérito",   // for "encontró"
    "pretérito",   // for "decidió"
    "condicional", // for "exploraría"
    "futuro"       // for "partirá"
  ]
  };

  useEffect(() => {
    const allBlanksFilled = narrativeDictionary.paragraphWithBlanks.split(' ').filter(word => word.includes('______')).every((_, index) => droppedTenses[index]);
    setAllFilled(allBlanksFilled);
  }, [droppedTenses]);

  useEffect(() => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    setShuffledTenses(shuffleArray([...narrativeDictionary.tense]));
  }, []);

  const handleDragStart = (tense) => {
    setDraggedTense(tense);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const blankIndex = e.target.getAttribute('data-index');
    if (blankIndex !== null && draggedTense) {
      setDroppedTenses(prev => ({ ...prev, [blankIndex]: draggedTense }));
      e.target.style.backgroundColor = '#a1d795'; // Change color to match tense-items
      e.target.style.color = 'black'; // Change text color back to normal
      setDraggedTense(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUndo = () => {
    setDroppedTenses({});
    document.querySelectorAll('.blank').forEach(blank => {
      blank.style.backgroundColor = '#ffffff'; // Change background color back to white
      blank.style.color = '#ffffff'; // Change text color back to normal
    });
  };

  return (
    <>
      <h2>
        <span className="heading-text">Conjugación de hoy</span>
        {Object.keys(droppedTenses).length > 0 ? (
          allFilled ? (
            <FaCheck style={{ color: '#2a962e' }} />
          ) : (
            <FaUndo style={{ color: '#2a962e', cursor: 'pointer' }} onClick={handleUndo} />
          )
        ) : (
          <FaPencilAlt style={{ color: '#2a962e' }} />
        )}
      </h2>
      <div className="inner-box pastel-green">
        <div className="tenses-box">
          {shuffledTenses.map((tense, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(tense)}
              className="tense-item"
            >
              {tense}
            </div>
          ))}
        </div>
        <div className="paragraph-container">
          <p onDrop={handleDrop} onDragOver={handleDragOver}>
            {narrativeDictionary.paragraphWithBlanks.split(' ').map((word, index) => {
              // Check if the word includes the blank marker.
              if (word.includes('______')) {
                return (
                  <span 
                    key={index} 
                    data-index={index} 
                    className="blank"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{ color: 'white' }} // Make the blank marker white
                  >
                    {droppedTenses[index] || '______'}
                  </span>
                );
              } else {
                return <span key={index}>{word} </span>;
              }
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default ConjugationBox;
