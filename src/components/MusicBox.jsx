import React from 'react';
import { FaMusic } from 'react-icons/fa';
import '../styles/BentoBox.css';

const MusicBox = () => {
  return (
    <>
      <h2>
        <span className="heading-text">Sugerencia de canción de hoy</span>
        <FaMusic style={{ color: '#dd4a4a' }} />
      </h2>
      <div className="inner-box pastel-red" style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <div className="inner-box pastel-blue" style={{ color: 'white', display: 'flex', alignItems: 'center', padding: '20px' }}>
    
        </div>
        
      </div>
    </>
  );
};

export default MusicBox;
