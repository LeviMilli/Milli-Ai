import ImageGen from './ImageGen';
import React, { useState } from 'react';
import Chatbot from "./Chatbot";

function InputForm() {
  const [toggle, setToggle] = useState(true);

  const handleChatbotClick = () => {
    setToggle(true);
  };

  const handleImageGenClick = () => {
    setToggle(false);
  };

  return (
    <div className="input-form-container">
      <div className="button-group">
        <button 
          className={toggle ? "active" : ""}
          onClick={handleChatbotClick}
        >
          Chatbot
        </button>
        <button 
          className={!toggle ? "active" : ""}
          onClick={handleImageGenClick}
        >
          ImageGen
        </button>
      </div>
      <div className="component-container">
        {toggle ? <Chatbot /> : <ImageGen />}
      </div>
    </div>
  );
}

export default InputForm;
