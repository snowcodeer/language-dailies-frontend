import React, { useState, useEffect } from 'react';
import { FaComment, FaMicrophone, FaMicrophoneSlash, FaMobileAlt } from 'react-icons/fa';
import '../styles/ConversationBox.css';

const ConversationBox = () => {
  const [voiceMode, setVoiceMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
 
  const toggleVoiceMode = () => {
    setVoiceMode(prev => !prev);
  };

  const toggleIsListening = () => {
    setIsListening(prev => !prev);
  };

  return (
    <>
      <h2>
        <span className="heading-text">Compañero conversacional</span>
        {voiceMode ? (<FaComment style={{ color: '#3d26d4', cursor: 'pointer' }} onClick={toggleVoiceMode}/>) : (<FaMobileAlt style={{ color: '#3d26d4', cursor: 'pointer' }} onClick={toggleVoiceMode}/>)}
      </h2>
      <div className="inner-box pastel-indigo" style={{ display: 'flex', alignItems: 'center'}}>
        <div className="conversation-container">
        {voiceMode && (
            <button className="circle" onClick={toggleIsListening}>
              {isListening ? (
                <FaMicrophoneSlash size={46} color="#3d26d4" />
              ) : (
                <FaMicrophone size={38} color="#3d26d4" />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ConversationBox;
