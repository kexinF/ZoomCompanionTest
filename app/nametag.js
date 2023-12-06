import React, { useState, useEffect } from 'react';
import RefreshAPIs from './RefreshAPIs';

const NameTag = () => {
  const [inputValues, setInputValues] = useState(['', '', '']); // Three separate input values
  const [isToggled, setIsToggled] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // useEffect(() => {
  //   // Add any side effect code here if needed
  // }, []);

  useEffect(() => {
    if (isToggled) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Set canvas size (adjust as needed)
      canvas.width = 200; // Width of the canvas
      canvas.height = 100; // Height of the canvas

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set font and text style (adjust as needed)
      context.font = '20px Arial'; // Font size and style
      context.fillStyle = 'black'; // Text color

      // Draw the three input values on separate lines
      inputValues.forEach((value, index) => {
        context.fillText(value, 10, 30 + index * 20); // Adjust positions as needed
      });

      // Get the image data from the canvas
      const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Check if the image data is empty or invalid
      if (newImageData && newImageData.data.length > 0) {
        // Convert image data to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Update the imageData state with the data URL
        setImageURL(dataURL);
        setImageData(newImageData);
      } else {
        // Reset the imageData state
        setImageData(null);
      }
    } else {
      // Reset the imageData state if not toggled
      setImageData(null);
    }
  }, [isToggled, inputValues]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
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
      <label className="switch">
        <input
          type="checkbox"
          checked={isToggled}
          onChange={handleToggle}
        />
        <span className="slider"></span>
      </label>
      {imageData && (
        <div>
          <p>Image Data:</p>
          <img src={imageURL} alt="ImageData" />
        </div>
      )}
      <RefreshAPIs imageData={imageData} />

    </div>
  );
};

export default NameTag;
