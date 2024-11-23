import React, { useState, useEffect } from 'react';
import './App.css';
import House from './components/House';
import winterVillage from './assets/map1.png';
import ResultModal from './components/ResultModal';
import TutorialModal from './components/TutorialModal'
import LeaderboardModal from './components/LeaderboardModal';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameActive, setGameActive] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showCry, setShowCry] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('santaGameScores');
    return saved ? JSON.parse(saved) : [];
  });

  const saveScore = (nickname, score) => {
    const newScores = [...highScores, { nickname, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setHighScores(newScores);
    localStorage.setItem('santaGameScores', JSON.stringify(newScores));
  };

  const endGame = () => {
    setGameActive(false);
    if (score >= 5) {
      setGameResult(`이제 진짜 '공인' 산타네요 !`);
    } else if (score >= 0) {
      setGameResult('산타는 못 돼도, 산타보다 멋있잖아요 !');
    } else {
      setGameResult('너는 그냥 열심히 썰매나 끌어 !');
    }
    setShowModal(true);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    startGame();
  };

  const closeModal = () => {
    setShowModal(false);
    setShowLeaderboard(true);
  };

  const closeLeaderboard = () => {
    setShowLeaderboard(false);
    setShowTutorial(true);
  };

  const createGrid = () => {
    const grid = [];
    const activeCoordinates = [
      { row: 2, col: 2 },
      { row: 2, col: 5 },
      { row: 2, col: 8 },
      { row: 3, col: 3 },
      { row: 3, col: 6 },
      { row: 3, col: 9 },
      { row: 4, col: 2 },
      { row: 4, col: 5 },
      { row: 4, col: 8 },
      { row: 5, col: 3 },
      { row: 5, col: 6 },
      { row: 5, col: 9 }
    ];

    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 16; col++) {
        const isActive = true;
        grid.push({
          row,
          col,
          isActive
        });
      }
    }
    return grid;
  };

  const [tiles, setTiles] = useState(createGrid());

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(15);
    setGameResult(null);
    setShowCry(true);
    setTimeout(() => setShowCry(false), 1000);
  };

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  return (
    <div className="game">
      {showCry && (
        <div className="crying-text">
          으앙 😫
        </div>
      )}
      {showTutorial && <TutorialModal onClose={closeTutorial} />}
      <div className="game-bar">
        <div className="game-info">
          <h2>점수: {score}</h2>
          <h2>남은 시간: {timeLeft}초</h2>
        </div>
      </div>
      <div className="game-container" style={{
        backgroundImage: `url(${winterVillage})`
      }}>
        <div className="grid-container">
          {tiles.map((tile, index) => (
            <House
              key={index}
              isActive={tile.isActive}
              gameActive={gameActive}
              onScoreChange={(points) => setScore(prev => prev + points)}
            />
          ))}
        </div>
        {showModal && gameResult && (
          <ResultModal
            result={gameResult}
            onClose={closeModal}
          />
        )}
        {showLeaderboard && (
          <LeaderboardModal
            score={score}
            scores={highScores}
            onSave={saveScore}
            onClose={closeLeaderboard}
          />
        )}
      </div>
    </div>
  );
}

export default App;