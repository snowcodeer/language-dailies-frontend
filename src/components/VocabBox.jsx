import React, { useState, useEffect } from 'react';
import { FaBook, FaUndo, FaCheck } from 'react-icons/fa';
import '../styles/VocabBox.css';

const VocabBox = () => {
  const [clicked, setClicked] = useState(Array(4).fill(false));
  const [hidden, setHidden] = useState(Array(4).fill(false));
  const [showUndo, setShowUndo] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [inputs, setInputs] = useState(Array(4).fill(''));
  const [randomDisplay, setRandomDisplay] = useState(Array(4).fill(false));
  const [allFilled, setAllFilled] = useState(false);
  const [check, setCheck] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [correct, setCorrect] = useState(Array(4).fill(false));

  const vocabDictionary = {
    // Nouns (42 words)
  "desenlace": "outcome",
  "sublevación": "uprising",
  "insurrección": "insurrection",
  "desventura": "misfortune",
  "vergüenza": "shame",
  "pena": "sorrow",
  "desdén": "disdain",
  "resquicio": "trace",
  "albricias": "reward",
  "acantilado": "cliff",
  "alcázar": "fortress",
  "lisonja": "flattery",
  "añoranza": "nostalgia",
  "estrago": "devastation",
  "estrépito": "uproar",
  "fragor": "clamor",
  "sopor": "drowsiness",
  "trueno": "thunder",
  "penumbra": "twilight",
  "bruma": "mist",
  "crepúsculo": "dusk",
  "alborada": "dawn",
  "regocijo": "delight",
  "embrollo": "mess",
  "garbo": "elegance",
  "solaz": "solace",
  "desvelo": "sleeplessness",
  "quebranto": "breakdown",
  "fragilidad": "fragility",
  "ceguera": "blindness",
  "ensoñación": "daydream",
  "regaño": "scolding",
  "silencio": "silence",
  "azar": "chance",
  "contienda": "struggle",
  "boato": "splendor",

  // Verbs (30 words)
  "trascender": "to transcend",
  "subyugar": "to subjugate",
  "desvelar": "to keep awake",
  "contemplar": "to contemplate",
  "desenredar": "to untangle",
  "desentrañar": "to unravel",
  "suscitar": "to provoke",
  "refutar": "to refute",
  "reivindicar": "to assert",
  "dilucidar": "to elucidate",
  "persuadir": "to persuade",
  "enaltecer": "to exalt",
  "sofocar": "to suppress",
  "asombrar": "to astonish",
  "desafiar": "to challenge",
  "transgredir": "to transgress",
  "intensificar": "to intensify",
  "suavizar": "to soften",
  "vulnerar": "to violate",
  "inquirir": "to inquire",
  "meditar": "to meditate",
  "conjurar": "to conjure",
  "aventurar": "to venture",
  "desestabilizar": "to destabilize",
  "dilatar": "to dilate",
  "exasperar": "to exasperate",
  "perscrutar": "to scrutinize",
  "intuir": "to intuit",
  "conferir": "to confer",
  "asistir": "to attend",

  // Prepositions (12 words)
  "entre": "between",
  "tras": "beyond",
  "según": "according to",
  "durante": "during",
  "mediante": "by means of",
  "bajo": "under",
  "salvo": "except for",
  "frente a": "facing",
  "acerca de": "about",
  "a través de": "through",
  "respecto a": "regarding",
  "excepto": "except",

  // Time-related words (18 words)
  "pronto": "soon",
  "tarde": "late",
  "temprano": "early",
  "mientras": "while",
  "nunca": "never",
  "siempre": "always",
  "inmediatamente": "immediately",
  "al instante": "instantly",
  "ayer": "yesterday",
  "mañana": "tomorrow",
  "posteriormente": "later",
  "actualmente": "currently",
  "anoche": "last night",
  "ahora": "now",
  "entonces": "then",
  "próximamente": "upcoming",
  "posterior": "subsequent",
  "previo": "prior",

  // Technical Terms (22+ words)
  // Politics
  "gobernabilidad": "governability",
  "descentralización": "decentralisation",
  "federalismo": "federalism",
  "pluripartidismo": "multiparty system",
  "censura": "censorship",
  "soberanía": "sovereignty",

  // Science
  "entropía": "entropy",
  "epistemología": "epistemology",
  "nanotecnología": "nanotechnology",
  "biotecnología": "biotechnology",
  "metabolismo": "metabolism",

  // Environment
  "biodiversidad": "biodiversity",
  "sostenibilidad": "sustainability",
  "ecología": "ecology",
  "contaminación": "pollution",
  "reciclaje": "recycling",

  // Technology
  "algoritmo": "algorithm",
  "criptografía": "cryptography",
  "ciberseguridad": "cybersecurity",
  "automatización": "automation",
  "virtualización": "virtualization"
  };

  const getRandomEntries = (dict, count) => {
    const entries = Object.entries(dict);
    const shuffled = entries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [selectedEntries, setSelectedEntries] = useState(getRandomEntries(vocabDictionary, 4));

  const handleClick = (index) => {
    if (answer) return; // Prevent clicking in answer state
    setCooldown(true);
    setTimeout(() => {setCooldown(false);}, 3000); // Undo button cooldown

    const newClicked = [...clicked];
    newClicked[index] = true;
    setClicked(newClicked);
    setShowUndo(true);

    setTimeout(() => {
      const newHidden = [...hidden];
      newHidden[index] = true;
      setHidden(newHidden);
    }, 800); // Set visibility to hidden after 0.8s
  };

  const handleUndo = () => {
    if (cooldown) return; // Prevent clicking during cooldown

    setClicked(Array(4).fill(false));
    setHidden(Array(4).fill(false));
    setShowUndo(false);
    setAnswer(false);
    setInputs(Array(4).fill(''));
    setRandomDisplay(Array(4).fill(false));
    setAllFilled(false);
    setCheck(false);
    setCorrect(Array(4).fill(false));
  };

  const handleCheck = () => {
    const newCorrect = inputs.map((input, index) => {
      const [spanishWord, englishWord] = selectedEntries[index];
      const normalizedInput = input.trim().toLowerCase();
      const normalizedEnglishWord = englishWord.toLowerCase();
      if (randomDisplay[index]) {
        return normalizedInput === normalizedEnglishWord || normalizedInput === normalizedEnglishWord.replace(/^to\s+/, '');
      } else {
        return normalizedInput === spanishWord.toLowerCase();
      }
    });
    setCorrect(newCorrect);
    setCheck(true);
    setShowUndo(false);
    setTimeout(() => {
      handleUndo();
      setCheck(false);
    }, 5000); // Reset 
    
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const refreshWords = () => {
    setSelectedEntries(getRandomEntries(vocabDictionary, 4));
    setClicked(Array(4).fill(false));
    setHidden(Array(4).fill(false));
    setShowUndo(false);
    setAnswer(false);
    setInputs(Array(4).fill(''));
    setRandomDisplay(Array(4).fill(false));
    setAllFilled(false);
    setCheck(false);
    setCooldown(false);
    setCorrect(Array(4).fill(false));
  };

  useEffect(() => {
    if (clicked.every(Boolean)) {
      setTimeout(() => {
        setAnswer(true);
        setHidden(Array(4).fill(false)); // Ensure Spanish words are visible
        setClicked(Array(4).fill(false)); // Turn off faded state
        setRandomDisplay(Array(4).fill().map(() => Math.random() >= 0.5)); // Randomize display
      }, 1500);
    }
  }, [clicked]);

  useEffect(() => {
    if (inputs.every(input => input.trim() !== '')) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }
  }, [inputs]);

  return (
    <>
      <h2>
        <span className="heading-text">Vocabulario de hoy</span>
        {check ? (
          <FaCheck style={{ color: '#219fed', cursor: 'pointer' }} />
        ) : allFilled ? (
          <FaCheck style={{ color: '#219fed', cursor: 'pointer' }} onClick={handleCheck} />
        ) : answer ? (
          <FaUndo style={{ color: '#219fed', cursor: cooldown ? 'not-allowed' : 'pointer' }} onClick={cooldown ? null : handleUndo} disabled={cooldown}/>
        ) : (
          <FaBook style={{ color: '#219fed', cursor: 'pointer' }} onClick={refreshWords} />
        )}
      </h2>
      <div className="vocab-grid">
        {selectedEntries.map(([spanishWord, englishWord], index) => (
          <div
            key={index}
            className={`vocab-box ${clicked[index] ? 'faded' : ''} ${answer ? 'answer' : ''} ${check ? (correct[index] ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleClick(index)}
            style={{ outline: 'none', cursor: answer ? 'default' : 'pointer' }}
          >
            {answer ? (
              randomDisplay[index] ? (
                <>
                  <span className="spanish-word visible fade-in">{spanishWord}</span>
                  <input
                    type="text"
                    value={inputs[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="text-entry fade-in"
                    style={{ marginLeft: 'auto', textAlign: 'right' }}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={inputs[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="text-entry fade-in"
                    style={{ marginRight: 'auto' }}
                  />
                  <span className="english-word visible fade-in"><em>{englishWord}</em></span>
                </>
              )
            ) : (
              <>
                <span className={`spanish-word ${hidden[index] ? 'hidden' : ''}`}>{spanishWord}</span>
                <span className={`english-word ${hidden[index] ? 'hidden' : ''}`}><em>{englishWord}</em></span>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default VocabBox;