// src/components/ReflectionBox.jsx
import React, { useState, useRef } from 'react';
import { FaLightbulb, FaHistory, FaCheck, FaArrowLeft } from 'react-icons/fa';
import '../styles/ReflectionBox.css';

const ReflectionBox = () => {
  const [reflection, setReflection] = useState('');
  const [showHistory, setShowHistory] = useState(false);
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
    setShowHistory(!showHistory);
  };

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;

  const historyEntries = [
    { date: '2023-10-01', text: 'Reflexión sobre el día 1' },
    { date: '2023-10-02', text: 'Reflexión sobre el día 2' },
    { date: '2023-10-03', text: 'Reflexión sobre el día 3' },
    { date: '2023-10-04', text: 'Reflexión sobre el día 4' },
    { date: '2023-10-05', text: 'Reflexión sobre el día 5' },
  ];

  return (
    <>
      <h2 className="reflection-heading">
        <span className="heading-text">Reflexión diaria</span>
        <FaLightbulb style={{ color: '#faae3c' }} />
      </h2>
      {showHistory ? (
        <div className="inner-box pastel-yellow">
          {historyEntries.map((entry, index) => (
            <div key={index} className="history-entry">
              <span className="history-date">{entry.date}</span>
              <span className="history-text">{entry.text}</span>
            </div>
          ))}
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
          </>
        )}
        <div className="reflection-buttons">
          <button className="reflection-btn historial" onClick={handleHistoryClick}>
            {showHistory ? <FaArrowLeft /> : <FaHistory />}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReflectionBox;
