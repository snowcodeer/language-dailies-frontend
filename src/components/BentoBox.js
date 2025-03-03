// src/components/BentoBox.js
import React, { useState } from 'react';
import './BentoBox.css';
import { FaMusic, FaQuoteRight, FaBook, FaComments, FaPencilAlt, FaLightbulb, FaCheck, FaHistory } from 'react-icons/fa';

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
        <h1>¡Bienvenidas de nuevo, Natalie!</h1>
      </div>

      <div className="bento-item card2">
        <h2>
          <span className="heading-text">Vocabulario de hoy</span>
          <FaBook style={{ color: '#219fed' }}/>
        </h2>
        <div className="translation-boxes">
            <div className="translation-box">
                <span className="spanish-word">Hola</span>
                <span className="english-word"><em>Hello</em></span>
            </div>
            <div className="translation-box">
                <span className="spanish-word">Adiós</span>
                <span className="english-word"><em>Goodbye</em></span>
            </div>
            <div className="translation-box">
                <span className="spanish-word">Gracias</span>
                <span className="english-word"><em>Thank you</em></span>
            </div>
            <div className="translation-box">
                <span className="spanish-word">Por favor</span>
                <span className="english-word"><em>Please</em></span>
            </div>
            </div>
      </div>

      <div className="card3">
        <div className="card-top">
          <h2>
            <span className="heading-text">Reflexión diaria</span>
            <FaLightbulb style={{ color: '#faae3c' }}/>
          </h2>
          {/* Multi-line text area for reflection */}
          <textarea
            className="reflection-textarea"
            placeholder="Escribe tu reflexión aquí, al menos 80 palabras. ¡Puedes escribir sobre lo que quieras! Mientras que esté correcto..."
            value={reflection}
            onChange={handleReflectionChange}
          ></textarea>
          {/* New container for word count and buttons */}
          <div className="reflection-controls">
            <p className="word-count">Palabras: {wordCount}</p>
            <div className="reflection-buttons">
              <button className="reflection-btn historial"><FaHistory /></button>
              <button className="reflection-btn correction"><FaCheck /></button>
            </div>
          </div>
        </div>

        <div className="card-bottom">
          <h2>
            <span className="heading-text">Sugerencia de canción de hoy</span>
            <FaMusic style={{ color: '#dd4a4a' }}/>
          </h2>
          <div className="spotify-embed">
            <iframe
            src="https://open.spotify.com/embed/track/5H1LLTRLRw59GZh6Xd5lGe?utm_source=generator"
            width="96%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Embed"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="bento-item card4">
        <h2>
          <span className="heading-text">Frase del día</span>
          <FaQuoteRight style={{ color: '#ad6be3' }}/> 
        </h2>
        <div className="inner-box">
            <p><i>"Caminante, no hay camino, se hace caminho al andar."</i><br />
            Traveler, there is no path; the path is made by walking.</p>
        </div>
      </div>

      <div className="bento-item card5">
        <h2>
            <span className="heading-text">Compañero conversacional</span>
            <FaComments style={{ color: '#3d26d4' }}/>
        </h2>
        <p>Click to start convo</p>
      </div>

      <div className="bento-item card6">
        <h2>
            <span className="heading-text">Conjugación de hoy</span>
            <FaPencilAlt style={{ color: '#2a962e' }}/>
        </h2>
        <div className="inner-box conjugation-box">
            <p>1. El gato está durmiendo en el sofá.<br />
            2. A ella le encanta leer libros en su tiempo libre.<br />
            3. Viajaremos a España el próximo verano.<br />
            4. Él olvidó traer su paraguas, y empezó a llover.<br />
            5. Ellos están aprendiendo a cocinar comida italiana.</p>
        </div>
      </div>

      



    </div>
  );
};

export default BentoBox;
