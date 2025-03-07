import React from 'react';
import '../styles/BentoBox.css';
import { FaQuoteRight } from 'react-icons/fa';

const QuoteBox = () => {
  return (
    <>
      <h2>
        <span className="heading-text">Frase del día</span>
        <FaQuoteRight style={{ color: '#ad6be3' }}/> 
      </h2>
      <div 
        className="inner-box pastel-purple" 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#909090' }}>
        <p style={{ margin: '0', textAlign: 'center' }}><i>"La última coca cola del desierto."</i></p>
      </div>
    </>
  );
};

export default QuoteBox;
