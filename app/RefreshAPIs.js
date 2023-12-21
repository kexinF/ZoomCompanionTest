// RefreshAPIs.js

import React, { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";

function RefreshAPIs({ imageData }) {
  const [display, setDisplay] = useState(true); 
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Disable the code for 0.01 seconds
    setTimeout(() => {
      setIsDisabled(false);
    }, 100);
  }, []);


  useEffect(() => {
    if (!isDisabled) {
      if (display) { 
        if (imageData) {
          // console.log('APIs refreshed with imageData:', imageData); 
          const zoomAppsSdkApi = zoomSdk["setVirtualForeground"].bind(zoomSdk);
          zoomAppsSdkApi({ imageData: imageData });
        }
      } else { 
        const zoomAppsSdkApi = zoomSdk["removeVirtualForeground"].bind(zoomSdk);
        zoomAppsSdkApi();
      }
    }
  }, [display, imageData]);



  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={display} 
          onChange={() => setDisplay(!display)} 
        />
        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <div className={`dot absolute w-6 h-6 bg-[#35377D] rounded-full shadow -left-1 -top-1 transition ${display ? 'transform translate-x-full' : ''}`}></div> {/* Changed 'displayHands' to 'display' */}
      </div>
      <div className="ml-3 text-gray-700 font-medium">
        Display
      </div>
    </label>
  );
}

export default RefreshAPIs;
