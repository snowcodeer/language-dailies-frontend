import React from 'react';
import '../styles/BentoBox.css';
import '../styles/Dashboard.css'; // Add a new CSS file for Dashboard specific styles
import streakFlameImg from '../assets/streak.png'; // Import your streak image
import { FaCog } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>
        <span>¡Bienvenido/a!</span>
        <FaCog style={{ color: '#999999' }} />
      </h1>
      <div className="stats-container">
        <div className="stat-card words-learned pastel-yellow">
          <div className="stat-number accent-yellow">150</div>
          <div className="stat-label grey-text">Words Learned</div>
        </div>
        <div className="stat-card streak pastel-red">
          <img src={streakFlameImg} alt="Streak" className="streak-icon" />
          <div className="stat-number accent-red">7</div>
        </div>
        <div className="stat-card hours-practiced pastel-green">
          <div className="stat-number accent-green">10</div>
          <div className="stat-label grey-text">Hours Practiced</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;