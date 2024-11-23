import React from 'react';
import santaCertificate from '../assets/SantaC.png';
import rudolfCertificate from '../assets/RuldolphC.png';
import failCertificate from '../assets/BSantaC.png';

function ResultModal({ result, onClose }) {
  const getCertificateImage = () => {
    switch (result) {
      case `이제 진짜 '공인' 산타네요 !`:
        return santaCertificate;
      case '산타는 못 돼도, 산타보다 멋있잖아요 !':
        return failCertificate;
      default:
        return rudolfCertificate;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{result}</h2>
        <div className="certificate-container">
          <img 
            src={getCertificateImage()} 
            alt="자격증" 
            className="certificate-image"
          />
        </div>
        <button onClick={onClose} className="close-button">
          닫기
        </button>
      </div>
    </div>
  );
}

export default ResultModal;