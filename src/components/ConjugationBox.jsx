import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaUndo, FaCheck } from 'react-icons/fa';
import '../styles/ConjugationBox.css';

const ConjugationBox = () => {
  const [draggedTense, setDraggedTense] = useState(null);
  const [selectedTense, setSelectedTense] = useState(null); // For mobile click selection
  const [droppedTenses, setDroppedTenses] = useState({});
  const [allFilled, setAllFilled] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const [shuffledTenses, setShuffledTenses] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [showInputFields, setShowInputFields] = useState(false);

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

  // Check if all blanks are filled using the order of blanks (0, 1, 2, ...)
  useEffect(() => {
    // Count the number of blanks in the paragraph
    const blanks = narrativeDictionary.paragraphWithBlanks.split(' ').filter(word => word.includes('______'));
    const allBlanksFilled = blanks.every((_, blankIndex) => droppedTenses[blankIndex]);
    setAllFilled(allBlanksFilled);

    const allBlanksCorrect = blanks.every((_, blankIndex) => droppedTenses[blankIndex] === narrativeDictionary.tense[blankIndex]);
    setAllCorrect(allBlanksCorrect);
  }, [droppedTenses, narrativeDictionary.paragraphWithBlanks]);

  // Shuffle tenses on mount

  useEffect(() => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    const uniqueTenses = [...new Set(narrativeDictionary.tense)];
    setShuffledTenses(shuffleArray(uniqueTenses));
  }, []);

  // Desktop drag start: sets draggedTense
  const handleDragStart = (e, tense) => {
    if (!allCorrect) {
      setDraggedTense(tense);
    }
  };

  // Common drop handler for both drag-and-drop and click-drop
  const handleDrop = (e, blankIndex) => {
    e.preventDefault();
    if (!allCorrect && blankIndex !== null) {
      // Use draggedTense (desktop) or selectedTense (mobile click)
      const tenseToDrop = draggedTense || selectedTense;
      if (blankIndex !== null && tenseToDrop) {
        setDroppedTenses(prev => ({ ...prev, [blankIndex]: tenseToDrop }));
        // Optionally update blank style for visual feedback
        const targetElement = e.target;
        if (targetElement && targetElement.classList.contains('blank')) {
          targetElement.style.backgroundColor = '#a1d795';
          targetElement.style.color = 'black';
        }
        // Clear both selections
        setDraggedTense(null);
        setSelectedTense(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Mobile click: tapping a tense to select it
  const handleTenseClick = (tense) => {
    if (!allCorrect) {
      setSelectedTense(tense);
    }
  };

  // Mobile click on blank: drop the selected tense
  const handleBlankClick = (blankIndex) => {
    if (selectedTense && !allCorrect) {
      const targetElement = document.querySelector(`[data-index="${blankIndex}"]`);
      handleDrop({ preventDefault: () => {}, target: targetElement }, blankIndex);
    }
  };

  // When all blanks are filled, clicking the checkmark will remove incorrect answers
  const handleCheck = () => {
    // Create a new droppedTenses object by removing incorrect answers.
    const newDropped = { ...droppedTenses };
    for (let i = 0; i < narrativeDictionary.tense.length; i++) {
      // Compare the dropped tense with the correct one from narrativeDictionary.tense.
      // If they don't match, remove that entry.
      if (newDropped[i] && newDropped[i] !== narrativeDictionary.tense[i]) {
        delete newDropped[i];
        // Reset blank style if available.
        const targetElement = document.querySelector(`[data-index="${i}"]`);
        if (targetElement && targetElement.classList.contains('blank')) {
          targetElement.style.backgroundColor = '#ffffff';
          targetElement.style.color = '#ffffff';
        }
      }
    }
    setDroppedTenses(newDropped);
    setShowInputFields(true);
  };

  const handleUndo = () => {
    setDroppedTenses({});
    setSelectedTense(null);
    setInputValues({});
    setShowInputFields(false);
    document.querySelectorAll('.blank').forEach(blank => {
      blank.style.backgroundColor = '#ffffff';
      blank.style.color = '#ffffff';
    });
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setInputValues(prev => ({ ...prev, [index]: value }));
  };

  return (
    <>
      <h2>
        <span className="heading-text">Conjugación de hoy</span>
        {Object.keys(droppedTenses).length > 0 ? (
          // If all blanks are filled, show the checkmark which on click removes incorrect answers.
          allFilled ? (
            <FaCheck style={{ color: '#2a962e', cursor: 'pointer' }} onClick={handleCheck} />
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
              draggable={!allCorrect}
              onDragStart={(e) => handleDragStart(e, tense)}
              onClick={() => handleTenseClick(tense)}
              className={`tense-item ${selectedTense === tense ? 'selected' : ''}`}
            >
              {tense}
            </div>
          ))}
        </div>
        <div className="paragraph-container">
          <p onDrop={(e) => handleDrop(e)} onDragOver={handleDragOver}>
            {(() => {
              let blankCounter = 0;
              return narrativeDictionary.paragraphWithBlanks.split(' ').map((word, index) => {
                if (word.includes('______')) {
                  const currentBlankIndex = blankCounter;
                  blankCounter++;
                  return showInputFields ? (
                    <input
                      key={index}
                      type="text"
                      placeholder={droppedTenses[currentBlankIndex]}
                      value={inputValues[currentBlankIndex] || ''}
                      onChange={(e) => handleInputChange(e, currentBlankIndex)}
                      className="input-field"
                      style={{ textAlign: 'center' }}
                    />
                  ) : (
                    <span
                      key={index}
                      data-index={currentBlankIndex}
                      className="blank"
                      onDrop={(e) => handleDrop(e, currentBlankIndex)}
                      onDragOver={handleDragOver}
                      onClick={() => handleBlankClick(currentBlankIndex)}
                      style={{ color: 'white' }}
                    >
                      {droppedTenses[currentBlankIndex] || '______'}
                    </span>
                  );
                } else {
                  return <span key={index}>{word} </span>;
                }
              });
            })()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ConjugationBox;
