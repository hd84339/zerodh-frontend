import React, { useState } from 'react';

const UniversalPopup = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)' // Safari support
  };

  const popupStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '90%',
    width: '400px',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    margin: '0 1rem',
    animation: 'slideIn 0.3s ease-out'
  };

  const messageStyle = {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    lineHeight: '1.5'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666',
    padding: '5px',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    WebkitTapHighlightColor: 'transparent' // Remove tap highlight on mobile
  };

  const closeButtonHoverStyle = {
    backgroundColor: '#f0f0f0',
    color: '#333'
  };

  // Inject the animation CSS
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  return (
    <div 
      style={overlayStyle} 
      onClick={() => setIsVisible(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-message"
    >
      <div 
        style={popupStyle} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          style={closeButtonStyle}
          onMouseEnter={e => Object.assign(e.target.style, closeButtonHoverStyle)}
          onMouseLeave={e => Object.assign(e.target.style, closeButtonStyle)}
          onClick={() => setIsVisible(false)}
          aria-label="Close popup"
        >
          ×
        </button>
        <p 
          style={messageStyle}
          id="popup-message"
        >
          This is a desktop site. Please open in desktop mode.
        </p>
      </div>
    </div>
  );
};

export default UniversalPopup;