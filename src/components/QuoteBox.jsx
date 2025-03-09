import React from 'react';
import '../styles/QuoteBox.css';
import { FaQuoteRight } from 'react-icons/fa';

const QuoteBox = () => {
  return (
    <>
      <h2>
        <span className="heading-text">Frase del día</span>
        <FaQuoteRight style={{ color: '#ad6be3' }}/> 
      </h2>
      <div 
        className="inner-box pastel-purple" >
        <div className="quote-container">
          <p><i>"La última coca cola del desierto."</i></p>
        </div>
        
      </div>
    </>
  );
};

export default QuoteBox;
