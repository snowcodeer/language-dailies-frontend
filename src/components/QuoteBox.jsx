import React from 'react';
import '../styles/BentoBox.css';
import { FaQuoteRight } from 'react-icons/fa';

const QuoteBox = () => {
  return (
    <>
      <h2>
        <span className="heading-text">Frase del día</span>
        <FaQuoteRight style={{ color: '#ad6be3'}}/> 
      </h2>
      <div 
        className="inner-box pastel-purple" style={{justifyContent: 'center' }} >
          <p style={{ color: '#909090', textAlign: 'center', paddingTop:20}}><i>"La última coca cola del desierto."</i></p>  
      </div>
    </>
  );
};

export default QuoteBox;
