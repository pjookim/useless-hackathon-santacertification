import React from 'react';

function TutorialModal({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="tutorial-modal">
                <h2>🎅 산타의 자격에 도전하라 ! 🎅</h2>
                <div className="tutorial-content">
                    <p>1. 아이들의 울음소리가 들리면 집을 클릭해주세요.</p>
                    <p>2. 울고 있는 아이를 찾으면 +1점</p>
                    <p>3. 웃고 있는 아이를 찾으면 -1점</p>
                    <p>4. 15초 동안 최대한 많은 점수를 모아주세요!</p>
                    <ul>
                        <li>5점 이상 : 산타</li>
                        <li>1 ~ 4점 : 흑화 산타</li>
                        <li>0점 미만 : 루돌프</li>
                    </ul>
                </div>
                <button className="start-button" onClick={onClose}>
                    Game Start !
                </button>
            </div>
        </div>
    );
}

export default TutorialModal;