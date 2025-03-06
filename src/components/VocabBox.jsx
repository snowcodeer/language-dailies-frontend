import React, { useState, useEffect } from 'react';
import { FaBook, FaUndo, FaCheck } from 'react-icons/fa';
import '../styles/VocabBox.css';

const VocabBox = () => {
  const [clicked, setClicked] = useState(Array(4).fill(false));
  const [hidden, setHidden] = useState(Array(4).fill(false));
  const [showUndo, setShowUndo] = useState(false);
  const [undoCounter, setUndoCounter] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [inputs, setInputs] = useState(Array(4).fill(''));
  const [randomDisplay, setRandomDisplay] = useState(Array(4).fill(false));
  const [allFilled, setAllFilled] = useState(false);
  const [check, setCheck] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [correct, setCorrect] = useState(Array(4).fill(false));

  const spanishWords = ['Hola', 'Adiós', 'Gracias', 'Por favor'];
  const englishWords = ['Hello', 'Goodbye', 'Thank you', 'Please'];

  const handleClick = (index) => {
    if (answer) return; // Prevent clicking in answer state
    setCooldown(true);
    setTimeout(() => {setCooldown(false);}, 3000); // Undo button cooldown

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
    if (cooldown) return; // Prevent clicking during cooldown

    setClicked(Array(4).fill(false));
    setHidden(Array(4).fill(false));
    setShowUndo(false);
    setUndoCounter(undoCounter + 1);
    setAnswer(false);
    setInputs(Array(4).fill(''));
    setRandomDisplay(Array(4).fill(false));
    setAllFilled(false);
    setCheck(false);
    setCorrect(Array(4).fill(false));
    console.log(`Undo Counter: ${undoCounter + 1}`);
  };

  const handleCheck = () => {
    const newCorrect = inputs.map((input, index) => {
      if (randomDisplay[index]) {
        return input.trim().toLowerCase() === englishWords[index].toLowerCase();
      } else {
        return input.trim().toLowerCase() === spanishWords[index].toLowerCase();
      }
    });
    setCorrect(newCorrect);
    setCheck(true);
    setTimeout(() => {
      handleUndo();
      setCheck(false);
    }, 6000); // Reset 
    
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  useEffect(() => {
    if (clicked.every(Boolean)) {
      setTimeout(() => {
        setAnswer(true);
        setHidden(Array(4).fill(false)); // Ensure Spanish words are visible
        setClicked(Array(4).fill(false)); // Turn off faded state
        setRandomDisplay(Array(4).fill().map(() => Math.random() >= 0.5)); // Randomize display
      }, 1500);
    }
  }, [clicked]);

  useEffect(() => {
    if (inputs.every(input => input.trim() !== '')) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }
  }, [inputs]);

  return (
    <>
      <h2>
        <span className="heading-text">Vocabulario de hoy</span>
        {check ? (
          <FaUndo style={{ color: '#219fed', cursor: cooldown ? 'not-allowed' : 'pointer' }} onClick={cooldown ? null : handleUndo} disabled={cooldown}/>
        ) : allFilled ? (
          <FaCheck style={{ color: '#219fed', cursor: 'pointer' }} onClick={handleCheck} />
        ) : answer ? (
          <FaUndo style={{ color: '#219fed', cursor: cooldown ? 'not-allowed' : 'pointer' }} onClick={cooldown ? null : handleUndo} disabled={cooldown}/>
        ) : (
          <FaBook style={{ color: '#219fed' }} />
        )}
      </h2>
      <div className="vocab-grid">
        {spanishWords.map((word, index) => (
          <div
            key={index}
            className={`vocab-box ${clicked[index] ? 'faded' : ''} ${answer ? 'answer' : ''} ${check ? (correct[index] ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleClick(index)}
            style={{ outline: 'none', cursor: answer ? 'default' : 'pointer' }}
          >
            {answer ? (
              randomDisplay[index] ? (
                <>
                  <span className="spanish-word visible fade-in">{word}</span>
                  <input
                    type="text"
                    value={inputs[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="text-entry fade-in"
                    style={{ marginLeft: 'auto', textAlign: 'right' }}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={inputs[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="text-entry fade-in"
                    style={{ marginRight: 'auto' }}
                  />
                  <span className="english-word visible fade-in"><em>{englishWords[index]}</em></span>
                </>
              )
            ) : (
              <>
                <span className={`spanish-word ${hidden[index] ? 'hidden' : ''}`}>{word}</span>
                <span className={`english-word ${hidden[index] ? 'hidden' : ''}`}><em>{englishWords[index]}</em></span>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default VocabBox;