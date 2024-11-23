import React, { useState } from 'react';

function LeaderboardModal({ score, scores, onSave, onClose }) {
    const [nickname, setNickname] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (nickname.trim()) {
        onSave(nickname, score);
        setIsSubmitted(true);
        setNickname('');
      }
    };
  
    return (
      <div className="modal-overlay">
        <div className="leaderboard-modal">
          <h2>🏆 최고의 산타 순위는 ?! 🏆</h2>
          {!isSubmitted && !scores.find(s => s.score === score) && (
            <form onSubmit={handleSubmit} className="nickname-form">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                maxLength={10}
                required
              />
              <button type="submit" className="submit-button">
                등록
              </button>
            </form>
          )}
          <div className="scores-list">
            {scores.map((entry, index) => (
              <div key={index} className={`score-item ${entry.score === score ? 'current' : ''}`}>
                <span className="rank">{index + 1}등</span>
                <span className="player">{entry.nickname}</span>
                <span className="score">{entry.score}점</span>
              </div>
            ))}
          </div>
          <button onClick={onClose} className="close-button">
            RESTART
          </button>
        </div>
      </div>
    );
  }

export default LeaderboardModal;