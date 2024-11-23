import React, { useState } from 'react';
import smile from '../assets/smile.png';
import cry from '../assets/cry.png';

function House({ isActive, gameActive, onScoreChange }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isCrying, setIsCrying] = useState(false);

  const handleClick = () => {
    if (!isActive || !gameActive || isClicked) return;

    const crying = Math.random() > 0.5;
    setIsCrying(crying);
    setIsClicked(true);
    
    if (crying) {
      onScoreChange(-1);
    } else {
      onScoreChange(1);
    }

    setTimeout(() => {
      setIsClicked(false);
      setIsCrying(false);
    }, 5000);
  };

  return (
    <div 
    className={`house ${isActive ? 'active' : ''} ${isClicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      {isClicked && (
        <div className="child">
          <img 
            src={isCrying ? cry : smile} 
            alt={isCrying ? "crying" : "smiling"}
            className="emotion-image"
          />
        </div>
      )}
    </div>
  );
}

export default House;