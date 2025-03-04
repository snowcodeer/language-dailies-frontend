// src/components/BentoBox.js
import React, { useState } from 'react';
import '../styles/BentoBox.css';
import Dashboard from './Dashboard';
import ReflectionBox from './ReflectionBox';
import QuoteBox from './QuoteBox';
import VocabBox from './VocabBox';
import { FaMusic, FaBook, FaComments, FaPencilAlt, FaLightbulb, FaCheck, FaHistory } from 'react-icons/fa';
import ConjugationBox from './ConjugationBox';
import MusicBox from './MusicBox';
import ConversationBox from './ConversationBox';

const BentoBox = () => {
  // State for the reflection text
  const [reflection, setReflection] = useState('');

  // Update state as the user types
  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
  };
  
  // Calculate word count (splits by whitespace and filters out empty strings)
  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bento-container">
      <div className="bento-item card1">
        <Dashboard />
      </div>
      
      <div className="bento-item card2">
        <VocabBox />
      </div>

      <div className="bento-item card3">
        <ReflectionBox />
      </div>

      <div className="bento-item card4">
        <ConversationBox />
      </div>

      <div className="bento-item card5">
        <QuoteBox />
      </div>

      <div className="bento-item card6">
        <ConjugationBox />
      </div>

      <div className="bento-item card7">
        <MusicBox />
      </div>

    </div>
  );
};

export default BentoBox;
