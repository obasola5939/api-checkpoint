// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-text">Loading Users</div>
      </div>
      
      <div className="loading-details">
        <div className="loading-card">
          <div className="loading-avatar"></div>
          <div className="loading-info">
            <div className="loading-line large"></div>
            <div className="loading-line medium"></div>
          </div>
        </div>
        
        <div className="loading-stats">
          <div className="loading-stat">
            <div className="loading-circle"></div>
            <div className="loading-line small"></div>
          </div>
          <div className="loading-stat">
            <div className="loading-circle"></div>
            <div className="loading-line small"></div>
          </div>
          <div className="loading-stat">
            <div className="loading-circle"></div>
            <div className="loading-line small"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
