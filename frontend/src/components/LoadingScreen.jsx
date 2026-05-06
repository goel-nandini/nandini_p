import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-logo">NG</div>
      <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', fontFamily: 'var(--font-secondary)', letterSpacing: '3px', textTransform: 'uppercase' }}>
        Loading portfolio...
      </div>
      <div className="loading-bar-wrap">
        <div className="loading-bar" />
      </div>
    </div>
  );
};

export default LoadingScreen;
