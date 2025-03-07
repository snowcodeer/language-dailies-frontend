import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaUndo, FaCheck } from 'react-icons/fa';
import '../styles/ConjugationBox.css';

const ConjugationBox = () => {
  const [draggedTense, setDraggedTense] = useState(null);
  const [droppedTenses, setDroppedTenses] = useState({});
  const [allFilled, setAllFilled] = useState(false);
  const [shuffledTenses, setShuffledTenses] = useState([]);

  const narrativeDictionary = {
    paragraph: "En el tranquilo pueblo, vivía Elena, quien siempre soñaba con explorar nuevos horizontes. Cada mañana, caminaba por sus calles y admiraba los detalles de la vida. Un día, encontró un mapa antiguo que relataba aventuras olvidadas. Inspirada, decidió prepararse para una travesía única. Hoy, trabaja en sus planes y estudia rutas misteriosas. Espero que el destino le regale encuentros sorprendentes y que descubra secretos ocultos. Mañana, partirá con esperanza para vivir momentos inolvidables, confiando en que cada paso la acerque a su sueño de libertad.",
    paragraphWithBlanks: "En el tranquilo pueblo, vivía Elena, quien siempre ______ (soñar) con explorar nuevos horizontes. Cada mañana, caminaba por sus calles y admiraba los detalles de la vida. Un día, ______ (encontrar) un mapa antiguo que relataba aventuras olvidadas. Inspirada, decidió prepararse para una travesía única. Hoy, trabaja en sus planes y ______ (estudiar) rutas misteriosas. Espero que el destino le regale encuentros sorprendentes y que ______ (descubrir) secretos ocultos. Mañana, ______ (partir) con esperanza para vivir momentos inolvidables, confiando en que cada paso la acerque a su sueño de libertad.",
    conjugatedVerbs: [
      "soñaba",
      "encontró",
      "estudia",
      "descubra",
      "partirá"
    ],
    infinitiveVerbs: [
      "soñar",
      "encontrar",
      "estudiar",
      "descubrir",
      "partir"
    ],
    tense: [
      "imperfecto",
      "pretérito",
      "presente",
      "subjuntivo",
      "futuro"
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
