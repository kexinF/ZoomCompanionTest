import React, { useState, useEffect } from 'react';
import RefreshAPIs from './RefreshAPIs';
import zoomSdk from "@zoom/appssdk";


const loadImage = (src) => {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
  };


const NameTag = () => {
  const [inputValues, setInputValues] = useState(['', '', '']); // Three separate input values
  const [isToggled, setIsToggled] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (isToggled) {

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = 1600; // Width of the canvas
      canvas.height = 900; // Height of the canvas

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set font and text style (adjust as needed)
      context.font = '50px Arial'; // Font size and style
      context.fillStyle = 'black'; // Text color

      // Draw the three input values on separate lines
      inputValues.forEach((value, index) => {
        context.fillText(value, 300, 500 + index * 50); // Adjust positions as needed
      });


      (async () => {
        try {
          const image = await loadImage('/badges/test.png');
          context.drawImage(image, 272, 254, 400, 100);
          const newImageData = context.getImageData(0, 0, canvas.width, canvas.height);
          console.log(newImageData);
          setImageData(newImageData);

          if (imageData && imageData.data.length > 0) {
            const dataURL = canvas.toDataURL('image/png');
            setImageURL(dataURL);
          }

        } catch (error) {
          console.error('Error loading image:', error);
        }
      })();

    } else {
      // Reset the imageData state if not toggled
      setImageData(null);
      setImageURL(null);

      const zoomAppsSdkApi = zoomSdk["removeVirtualForeground"].bind(zoomSdk);
      zoomAppsSdkApi()
      
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
