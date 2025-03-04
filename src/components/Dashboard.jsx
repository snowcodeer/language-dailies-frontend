import React from 'react';
import '../styles/BentoBox.css';
import '../styles/Dashboard.css'; // Add a new CSS file for Dashboard specific styles
import { FaFire } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <div className="left-container">
        <h1>¡Bienvenidas de nuevo, Natalie!</h1>
        </div>
        <div className="right-container">
          <div className="stat-card words-learned">
            <div className="stat-number">150</div>
            <div className="stat-label">Words Learned</div>
          </div>
          <div className="stat-card streak">
            <FaFire className="streak-icon" />
            <div className="streak-number">7</div>
          </div>
          <div className="stat-card hours-practiced">
            <div className="stat-number">10</div>
            <div className="stat-label">Hours Practiced</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;