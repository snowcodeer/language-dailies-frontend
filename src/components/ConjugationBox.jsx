import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaUndo, FaCheck } from 'react-icons/fa';
import '../styles/ConjugationBox.css';

const ConjugationBox = () => {
  const [draggedTense, setDraggedTense] = useState(null);
  const [selectedTense, setSelectedTense] = useState(null); // For mobile click selection
  const [droppedTenses, setDroppedTenses] = useState({});
  const [allFilled, setAllFilled] = useState(false);
  const [shuffledTenses, setShuffledTenses] = useState([]);

  const narrativeDictionary = {
    paragraph:
      "En un bullicioso barrio, Javier ha recorrido museos y degustado platos exquisitos que lo inspiraron a cambiar su destino. Un día, encontró una invitación misteriosa que lo impulsó a explorar nuevos horizontes y desafiar su rutina. Convencido de que el arte transformaría su futuro, decidió embarcarse en una aventura única y descubrir culturas diversas. Si tuviera la oportunidad, exploraría caminos inesperados para ampliar su visión. Mañana, partirá con determinación para descubrir un mundo lleno de inspiración y crecimiento personal real.",
    paragraphWithBlanks:
      "En un bullicioso barrio, Javier ha recorrido museos y degustado platos exquisitos que lo inspiraron a cambiar su destino. Un día, ______ (encontrar) una invitación misteriosa que lo impulsó a explorar nuevos horizontes y desafiar su rutina. Convencido de que el arte transformaría su futuro, ______ (decidir) embarcarse en una aventura única y descubrir culturas diversas. Si tuviera la oportunidad, ______ (explorar) caminos inesperados para ampliar su visión. Mañana, ______ (partir) con determinación para descubrir un mundo lleno de inspiración y crecimiento personal real.",
    conjugatedVerbs: [
      "encontró", // replaced by blank
      "decidió", // replaced by blank
      "exploraría", // replaced by blank
      "partirá" // replaced by blank
    ],
    infinitiveVerbs: [
      "encontrar", // for "encontró"
      "decidir",   // for "decidió"
      "explorar",  // for "exploraría"
      "partir"     // for "partirá"
    ],
    tense: [
      "pretérito",   // for "encontró"
      "pretérito",   // for "decidió"
      "condicional", // for "exploraría"
      "futuro"       // for "partirá"
    ]
  };

  // Check if all blanks are filled using the index of each blank word
  useEffect(() => {
    const allBlanksFilled = narrativeDictionary.paragraphWithBlanks
      .split(' ')
      .filter(word => word.includes('______'))
      .every((_, index) => droppedTenses[index]);
    setAllFilled(allBlanksFilled);
  }, [droppedTenses, narrativeDictionary.paragraphWithBlanks]);

  // Shuffle tenses on mount

  useEffect(() => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    setShuffledTenses(shuffleArray([...narrativeDictionary.tense]));
  }, []);

  // Desktop drag start: sets draggedTense
  const handleDragStart = (e, tense) => {
    setDraggedTense(tense);
  };

  // Common drop handler for both drag-and-drop and click-drop
  const handleDrop = (e, index) => {
    e.preventDefault();
    const blankIndex =
      index !== undefined ? index : e.target.getAttribute('data-index');
    // Use draggedTense (desktop) or selectedTense (mobile click)
    const tenseToDrop = draggedTense || selectedTense;
    if (blankIndex !== null && tenseToDrop) {
      setDroppedTenses(prev => ({ ...prev, [blankIndex]: tenseToDrop }));
      // Optionally update blank style for visual feedback
      const targetElement = e.target;
      if (targetElement) {
        targetElement.style.backgroundColor = '#a1d795';
        targetElement.style.color = 'black';
      }
      // Clear both selections
      setDraggedTense(null);
      setSelectedTense(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Mobile click: tapping a tense to select it
  const handleTenseClick = (tense) => {
    setSelectedTense(tense);
  };

  // Mobile click on blank: drop the selected tense
  const handleBlankClick = (index) => {
    if (selectedTense) {
      // Create a fake event with target set to the blank element for style update
      const targetElement = document.querySelector(`[data-index="${index}"]`);
      handleDrop({ preventDefault: () => {}, target: targetElement }, index);
    }
  };

  const handleUndo = () => {
    setDroppedTenses({});
    setSelectedTense(null);
    document.querySelectorAll('.blank').forEach(blank => {
      blank.style.backgroundColor = '#ffffff';
      blank.style.color = '#ffffff';
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
            <FaUndo
              style={{ color: '#2a962e', cursor: 'pointer' }}
              onClick={handleUndo}
            />
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
              onDragStart={(e) => handleDragStart(e, tense)}
              onClick={() => handleTenseClick(tense)}
              className={`tense-item ${
                selectedTense === tense ? 'selected' : ''
              }`}
            >
              {tense}
            </div>
          ))}
        </div>
        <div className="paragraph-container">
          <p onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
            {narrativeDictionary.paragraphWithBlanks.split(' ').map((word, index) => {
              if (word.includes('______')) {
                return (
                  <span
                    key={index}
                    data-index={index}
                    className="blank"
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={handleDragOver}
                    onClick={() => handleBlankClick(index)}
                    style={{ color: 'white' }}
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
