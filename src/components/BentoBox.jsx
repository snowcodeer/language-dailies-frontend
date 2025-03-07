// src/components/BentoBox.js
import React, { useState } from 'react';
import '../styles/BentoBox.css';
import Dashboard from './Dashboard';
import ReflectionBox from './ReflectionBox';
import QuoteBox from './QuoteBox';
import VocabBox from './VocabBox';
import ConjugationBox from './ConjugationBox';
import MusicBox from './MusicBox';
import ConversationBox from './ConversationBox';

const BentoBox = () => {
  // State for the reflection text
  const [reflection, setReflection] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Update state as the user types
  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
  };
  
  // Calculate word count (splits by whitespace and filters out empty strings)
  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;

  // Toggle play/pause state
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
        <MusicBox isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
      </div>

      {window.innerWidth < 850 && (
        <div className="bento-item padding">
          {/* Empty padding card */}
        </div>
      )}

    </div>
  );
};

export default BentoBox;
