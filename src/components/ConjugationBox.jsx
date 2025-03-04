import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import '../styles/BentoBox.css';

const ConjugationBox = () => {
  return (
    <>
        <h2>
            <span className="heading-text">Conjugación de hoy</span>
            <FaPencilAlt style={{ color: '#2a962e' }}/>
            </h2>
            <div className="inner-box pastel-green">
            <p>1. El gato está durmiendo en el sofá.<br />
            2. A ella le encanta leer libros en su tiempo libre.<br />
            3. Viajaremos a España el próximo verano.<br />
            4. Él olvidó traer su paraguas, y empezó a llover.<br />
            5. Ellos están aprendiendo a cocinar comida italiana.</p>
        </div>
    </>
  );
};

export default ConjugationBox;
