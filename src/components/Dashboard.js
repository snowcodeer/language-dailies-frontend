import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Top Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-left">
          <span className="nav-title">Natalie’s dashboard</span>
        </div>
        <div className="nav-right">
          <button className="flag-button">spanish flag</button>
          <button className="flag-button">french flag</button>
        </div>
      </nav>

      {/* Main Heading */}
      <h1 className="dashboard-heading">Spanish dailies</h1>

      {/* Bento Box Layout */}
      <div className="bento-container">
        <div className="bento-item bento-yellow">
          <h2>Word of the day</h2>
          <p>Write a sentence using this word</p>
          <p>Día 1: ¡Aguanta el ritmo!</p>
        </div>

        <div className="bento-item bento-purple">
          <h2>Quote of the day</h2>
          <p>“Hola, welcome to Spanish dailies!”</p>
          <p>— Some Spanish quote</p>
        </div>

        <div className="bento-item bento-blue">
          <h2>Sticky Note</h2>
          <p>Type anything, @mention anyone</p>
        </div>

        <div className="bento-item bento-pink">
          <h2>Sticky Note</h2>
          <p>Type anything, @mention anyone</p>
        </div>

        <div className="bento-item bento-peach">
          <h2>Sticky Note</h2>
          <p>Type anything, @mention anyone</p>
        </div>

        <div className="bento-item bento-lilac">
          <h2>Sticky Note</h2>
          <p>Type anything, @mention anyone</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
