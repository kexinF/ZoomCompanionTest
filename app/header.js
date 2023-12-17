import React, { useState } from 'react';

const Header = () => {

  const header_title = localStorage.getItem('title') || 'The session default title';

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (index) => {
    console.log(index)
    setSelectedButton(index);
  };

  const buttons = [
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ];


  return (
    <div className="header">
      <div className="self-confirm">
          <h1>{header_title}</h1>
      </div>

      <div className="button-rows">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`wave-hand-button ${
                selectedButton === index ? 'selected' : ''
              }`}
              onClick={() => handleButtonClick(index)}
            >
              {button}
            </button>
          ))}
      </div>
    </div>

  );
};

export default Header;