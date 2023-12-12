import React, { useState, useEffect } from 'react';
import RefreshAPIs from './RefreshAPIs';
import { apis, invokeZoomAppsSdk } from "./apis";
import zoomSdk from "@zoom/appssdk";


const NameTag = () => {
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [showNametag, setShowNametag] = useState(true);
  const [showHands, setShowHands] = useState(false);
  const [imageData, setImageData] = useState(null);

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

 return (
    <div>
      <div className="flex w-full justify-between">
        {inputValues.map((value, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Enter text ${index + 1}`}
            className="border border-gray-300 rounded-lg p-2 w-1/3"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

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
