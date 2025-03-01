import React from "react";
import "./CustomModal.css";

const CustomModal = ({ title, visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
