import React from 'react';
import { FaComments } from 'react-icons/fa';

const ConversationBox = () => {
  return (
    <>
      <h2>
        <span className="heading-text">Compañero conversacional</span>
        <FaComments style={{ color: '#3d26d4' }}/>
      </h2>
      <div className="inner-box pastel-indigo"></div>
    </>
  );
};

export default ConversationBox;
