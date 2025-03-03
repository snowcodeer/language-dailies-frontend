// src/components/ReflectionBox.jsx
import React, { useState, useRef } from 'react';
import { FaLightbulb, FaHistory, FaCheck } from 'react-icons/fa';
import '../styles/ReflectionBox.css';

const ReflectionBox = () => {
  const [reflection, setReflection] = useState('');
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

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="reflection-box">
      <h2 className="reflection-heading">
        <span className="heading-text">Reflexión diaria</span>
        <FaLightbulb style={{ color: '#faae3c' }} />
      </h2>
      <textarea
        ref={textareaRef}
        className="reflection-textarea"
        placeholder="Escribe tu reflexión aquí, al menos 60 palabras. ¡Puedes escribir sobre lo que quieras! Mientras que esté correcto..."
        value={reflection}
        onChange={handleReflectionChange}
        onPaste={handlePaste}
      ></textarea>

      <div className="reflection-controls">
        <p className={`word-count ${wordCount >= 60 ? 'green' : ''}`}>Palabras: {wordCount}</p>
        
        <div className="accent-buttons">
          {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'].map((accent) => (
            <button
              key={accent}
              className="accent-btn"
              onClick={() => insertAccent(accent)}
            >
              {accent}
            </button>
          ))}
        </div>

        <div className="reflection-buttons">
          <button className="reflection-btn historial">
            <FaHistory />
          </button>
          <button className="reflection-btn correction">
            <FaCheck />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ReflectionBox;
