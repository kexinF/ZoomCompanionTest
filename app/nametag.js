import React, { useState, useEffect } from 'react';
import RefreshAPIs from './RefreshAPIs';
import zoomSdk from "@zoom/appssdk";


const NameTag = () => {
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [showNametag, setShowNametag] = useState(true);
  const [showHands, setShowHands] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [selectedPronoun, setSelectedPronoun] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 1600; // Width of the canvas
    canvas.height = 900; // Height of the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (showNametag) {

      context.fillStyle = 'white'; // Set the background color to white
      // context.roundRect(x, y, width, height, radii);
      context.roundRect(780, 550, 505, 170, 20);

      // Fill the rounded rectangle
      context.fill();

      context.strokeStyle = '#FFD700'; // This is a gold-like color, often associated with the term "Asian yellow"

      // Set the line width
      context.lineWidth = 9;

      // Draw the line
      context.beginPath();
      context.moveTo(790, 570); // Starting point of the line
      context.lineTo(790, 710); // Ending point of the line
      context.stroke(); // Apply the stroke

      // Draw the three input values on separate lines
      inputValues.forEach((value, index) => {
        context.font = '40px Arial'
        context.fillStyle = 'black'; // Text color
        const textWidth = context.measureText(value).width;
        context.fillText(value, 800 , 600 + index * 50); // Adjust positions as needed
        console.log(textWidth, value)
      });
    }
    
    if (showHands) {
      // Set font and text style (adjust as needed)
      context.font = '50px Arial'; // Font size and style
      context.fillStyle = 'black'; // Text color

      // Draw the three input values on separate lines
      inputValues.forEach((value, index) => {
        context.fillText(value, 0, 500 + index * 50);
      });
    }
    const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // console.log(newImageData);
    setImageData(newImageData);

  }, [showNametag, showHands, inputValues]);

  const handleNametag = () => {
    setShowNametag(!showNametag);
  };

  const handleHands = () => {
    setShowHands(!showHands);
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

   const handlePronounChange = (e) => {
    setSelectedPronoun(e.target.value);
  };


  const blockStyle = {
    height: '20px', // Adjust the height value to control the spacing
  };

 return (
    <div>

        <div>
          <label>Full Name </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-1/3"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
        </div>
        <div style={blockStyle}></div>

        <div>
          <label>Preferred Name </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-1/3"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>
        <div style={blockStyle}></div>

        <div>
          <label>Select Pronouns</label>
          <select
            value={selectedPronoun}
            onChange={handlePronounChange}
            className="border border-gray-300 rounded-lg p-2 w-1/3"
          >
            <option value="">Select Pronouns</option>
            <option value="he/him">He/Him</option>
            <option value="she/her">She/Her</option>
            <option value="they/them">They/Them</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={blockStyle}></div>


        <div>
          <label>Self Disclosure </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-1/3"
            value={inputValues[2]}
            onChange={(e) => handleInputChange(2, e.target.value)}
          />
        </div>
        <div style={blockStyle}></div>

        <div>
          Show Nametag:
          <input
            type="checkbox"
            checked={showNametag}
            onChange={handleNametag}
          />
        </div>

      <div>
        Show Hands:
        <input
          type="checkbox"
          checked={showHands}
          onChange={handleHands}
        />
      </div>


      <RefreshAPIs imageData={imageData} />

    </div>
  );
};


export default NameTag;
