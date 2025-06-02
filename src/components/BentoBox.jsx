// src/components/BentoBox.js
import React from 'react';
import '../styles/BentoBox.css';
import Dashboard from './Dashboard';
import ReflectionBox from './ReflectionBox';
import QuoteBox from './QuoteBox';
import VocabBox from './VocabBox';
import ConjugationBox from './ConjugationBox';
import MusicBox from './MusicBox';
import ConversationBox from './ConversationBox';

const BentoBox = () => {
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

      {window.innerWidth < 850 && (
        <div className="bento-item padding">
          {/* Empty padding card */}
        </div>
      )}

    </div>
  );
};

export default BentoBox;
