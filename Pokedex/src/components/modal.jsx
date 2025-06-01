import React from 'react';
import './Modal.css';

function Modal({ message, onClose }) {
  return (
    <div className="modal-back">
      <div className="modal-text">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Modal;
