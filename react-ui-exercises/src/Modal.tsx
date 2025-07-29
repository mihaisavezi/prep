import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({isModalOpen, content, onClose}) => {
  
   

  return (
    isModalOpen &&
    ReactDOM.createPortal(
      <div style={{ position: "absolute", backgroundColor: "green", top: 0, left: 0 }}>
        {content}
        <button onClick={onClose}> CLOSE X </button>
      </div>,
      document.body,
      1
    )
  );
}

export default Modal


