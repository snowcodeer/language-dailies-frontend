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
      <div className="inner-box pastel-red">
        {/* Add your music suggestion content here */}
        <p></p>
      </div>
    </>
  );
};

export default MusicBox;
