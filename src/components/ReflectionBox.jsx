// src/components/ReflectionBox.jsx
import React, { useState, useRef } from 'react';
import { FaLightbulb, FaHistory, FaCheck, FaArrowLeft } from 'react-icons/fa';
import '../styles/ReflectionBox.css';

const ReflectionBox = () => {
  const [reflection, setReflection] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [historyEntries, setHistoryEntries] = useState([
    { date: '05.03.2025', text: 'Reflexión sobre el día 5' },
    { date: '04.03.2025', text: 'Esto es muy cool!' },
    { date: '03.03.2025', text: 'Reflexión sobre el día 3' },
    { date: '02.03.2025', text: 'Reflexión sobre el día 2' },
    { date: '01.03.2025', text: 'Reflexión sobre el día 1' },
  ]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const textareaRef = useRef(null);

  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    alert('¡No pegar aquí! >:o');
  };

  const insertAccent = (accent) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    setReflection(before + accent + after);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = start + accent.length;
  };

  const handleHistoryClick = () => {
    if (selectedEntry) {
      setSelectedEntry(null);
    } else {
      setShowHistory(!showHistory);
    }
  };

  const saveReflection = () => {
    const newEntry = {
      date: new Date().toLocaleDateString('en-GB').split('/').join('.'),
      text: reflection,
    };
    setHistoryEntries([newEntry, ...historyEntries]);
    setReflection('');
  };

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <h2 className="reflection-heading">
        <span className="heading-text">Reflexión diaria</span>
        {wordCount >= 60 ? (
          <FaCheck style={{ color: '#67cf6b' }} onClick={saveReflection} />
        ) : (
          <FaLightbulb style={{ color: '#faae3c' }} />
        )}
      </h2>
      {showHistory ? (
        <div className="inner-box pastel-yellow">
          {selectedEntry ? (
            <div className="selected-entry">
              <h3>{selectedEntry.date}</h3>
              <p>{selectedEntry.text}</p>
            </div>
          ) : (
            historyEntries.map((entry, index) => (
              <div key={index} className="history-entry-box" onClick={() => setSelectedEntry(entry)}>
                <div className="history-entry">
                  <span className="history-date"><strong>{entry.date}</strong>&nbsp;&nbsp;</span>
                  <span className="history-text">{entry.text.length > 100 ? `${entry.text.substring(0, 100)}...` : entry.text}</span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          className="reflection-textarea"
          placeholder="Escribe tu reflexión aquí, al menos 60 palabras. ¡Puedes escribir sobre lo que quieras! Mientras que esté correcto..."
          value={reflection}
          onChange={handleReflectionChange}
          onPaste={handlePaste}
        ></textarea>
      )}

      <div className="reflection-controls">
        {!showHistory && (
          <>
            <p className={`word-count grey-text ${wordCount >= 60 ? 'green' : ''}`}>Palabras: {wordCount}</p>
            
            <div className="accent-buttons-wrapper">
              <div className="accent-buttons">
                {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'].map((accent) => (
                  <button
                    key={accent}
                    className="accent-btn grey-text"
                    onClick={() => insertAccent(accent)}
                  >
                    {accent}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
          <button className="reflection-btn historial" onClick={handleHistoryClick}>
            {showHistory ? <FaArrowLeft /> : <FaHistory />}
          </button>
        
      </div>
    </>
  );
};

export default ReflectionBox;
