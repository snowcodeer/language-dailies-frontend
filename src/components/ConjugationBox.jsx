import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaUndo, FaCheck, FaMicrophone } from 'react-icons/fa';
import '../styles/ConjugationBox.css';

const ConjugationBox = () => {
  const [selectedTense, setSelectedTense] = useState(null); // For mobile click selection
  const [droppedTenses, setDroppedTenses] = useState({});
  const [allFilled, setAllFilled] = useState(false);
  const [tensesCorrect, setTensesCorrect] = useState(false);
  const [shuffledTenses, setShuffledTenses] = useState([]);
  const [inputTense, setInputTense] = useState({});
  const [showInputVerb, setShowInputVerb] = useState(false);

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
    setTensesCorrect(allBlanksCorrect);
  }, [droppedTenses, narrativeDictionary.paragraphWithBlanks]);

  // Shuffle tenses on mount
  useEffect(() => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    const uniqueTenses = [...new Set(narrativeDictionary.tense)];
    setShuffledTenses(shuffleArray(uniqueTenses));
  }, []);

  // Tapping a tense to select it
  const handleTenseClick = (tense) => {
    if (!tensesCorrect && !showInputVerb) {
      setSelectedTense(tense);
      document.body.style.cursor = 'grabbing'; // Change cursor to grabbing
    } 
    else {
      setSelectedTense(null);
      document.body.style.cursor = 'default'; // Reset cursor
    }
  };

  // Click on blank: drop the selected tense
  const handleBlankClick = (blankIndex) => {
    if (selectedTense && !tensesCorrect) {
      setDroppedTenses(prev => ({ ...prev, [blankIndex]: selectedTense }));
      // Optionally update blank style for visual feedback
      const targetElement = document.querySelector(`[data-index="${blankIndex}"]`);
      if (targetElement && targetElement.classList.contains('blank')) {
        targetElement.style.backgroundColor = '#a1d795';
        targetElement.style.color = 'black';
      }
      // Clear selection and reset cursor
      setSelectedTense(null);
      document.body.style.cursor = 'default';
    }
  };

  const handleTenseMouseOver = (e) => {
    if (!tensesCorrect) {
        e.target.style.cursor = 'grabbing'; 
    } else {
      e.target.style.cursor = 'help';
    }
  };

  const handleBlankMouseOver = (e) => {
    if (selectedTense && !tensesCorrect) {
      e.target.style.cursor = 'grabbing'; // Change cursor to indicate dropping
    }
  };

  const handleBlankMouseOut = (e) => {
    e.target.style.cursor = 'default'; // Reset cursor
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
    if (Object.keys(newDropped).length === narrativeDictionary.tense.length) {
      setShowInputVerb(true);
    }
  };

  const handleUndo = () => {
    if (!showInputVerb) {
      setDroppedTenses({});
      setSelectedTense(null);
      setInputTense({});
      setAllFilled(false);
      document.querySelectorAll('.blank').forEach(blank => {
        blank.style.backgroundColor = '#ffffff';
        blank.style.color = '#ffffff';
      });
      } else {
      document.querySelectorAll('.input-field').forEach(input => {
      input.value = ''; // Clear text inputs
      });
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setInputTense(prev => ({ ...prev, [index]: value }));
  };

  // Check if all input fields are filled and correct
  useEffect(() => {
    if (showInputVerb) {
      const allInputsFilled = Object.keys(inputTense).length === narrativeDictionary.conjugatedVerbs.length &&
        Object.values(inputTense).every(value => value.trim() !== '');
        setAllFilled(allInputsFilled);
    }
  }, [inputTense, showInputVerb, narrativeDictionary.conjugatedVerbs]);

  const handleFinalCheck = () => {

    const allInputsCorrect = Object.keys(inputTense).every(index => 
      inputTense[index].trim() === narrativeDictionary.conjugatedVerbs[index]
    );
    
    Object.keys(inputTense).forEach(index => {
      const targetElement = document.querySelector(`input[data-index="${index}"]`);
      if (targetElement) {
        if (inputTense[index].trim() === narrativeDictionary.conjugatedVerbs[index]) {
          targetElement.classList.add('correct');
          targetElement.classList.remove('incorrect');
        } else {
          targetElement.classList.add('incorrect');
          targetElement.classList.remove('correct');
        }
      }
    });

    setTimeout(() => {
      if (allInputsCorrect) {
        setTimeout(() => {
          Object.keys(inputTense).forEach(index => {
            const targetElement = document.querySelector(`input[data-index="${index}"]`);
            if (targetElement) {
              targetElement.classList.remove('correct');
              targetElement.classList.remove('incorrect');
            }
          });
          setShowInputVerb(false);
          setTensesCorrect(false);
          setAllFilled(false);
          setDroppedTenses({});
          setSelectedTense(null);
          setInputTense({});
  
        }, 2500);
      } else {
        Object.keys(inputTense).forEach(index => {
          const targetElement = document.querySelector(`input[data-index="${index}"]`);
          if (targetElement) {
            targetElement.classList.remove('correct');
            targetElement.classList.remove('incorrect');
          }
        });
      }
    }, 2500);
  };

  return (
    <>
      <h2>
        <span className="heading-text">Conjugación de hoy</span>
        {Object.keys(droppedTenses).length > 0 ? (
          allFilled ? (
            showInputVerb ? (
               <FaCheck style={{ color: '#2a962e', cursor: 'pointer' }} onClick={handleFinalCheck} />
              
            ) : (
              <FaCheck style={{ color: '#2a962e', cursor: 'pointer' }} onClick={handleCheck} />
            )
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
              onClick={() => handleTenseClick(tense)}
              onMouseOver={handleTenseMouseOver}
              className={`tense-item ${selectedTense === tense ? 'selected' : ''}`}
            >
              {tense}
            </div>
          ))}
        </div>
        <div className="paragraph-container">
          <p>
            {(() => {
              let blankCounter = 0;
              return narrativeDictionary.paragraphWithBlanks.split(' ').map((word, index) => {
                if (word.includes('______')) {
                  const currentBlankIndex = blankCounter;
                  blankCounter++;
                  return showInputVerb ? (
                    <input
                      key={index}
                      type="text"
                      placeholder={droppedTenses[currentBlankIndex]}
                      value={inputTense[currentBlankIndex] || ''}
                      onChange={(e) => handleInputChange(e, currentBlankIndex)}
                      className="input-field"
                      style={{ textAlign: 'center' }}
                      data-index={currentBlankIndex}
                    />
                  ) : (
                    <span
                      key={index}
                      data-index={currentBlankIndex}
                      className="blank"
                      onClick={() => handleBlankClick(currentBlankIndex)}
                      onMouseOver={handleBlankMouseOver}
                      onMouseOut={handleBlankMouseOut}
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
