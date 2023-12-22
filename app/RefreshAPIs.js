// RefreshAPIs.js

import React, { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";

function RefreshAPIs({ imageData }) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Disable the code for 0.1 seconds
    setTimeout(() => {
      setIsDisabled(false);
    }, 200);
  }, []);


  useEffect(() => {
    if (!isDisabled) {
        if (imageData) {
          // console.log('APIs refreshed with imageData:', imageData); 
          const zoomAppsSdkApi = zoomSdk["setVirtualForeground"].bind(zoomSdk);
          zoomAppsSdkApi({ imageData: imageData });
      } else { 
        const zoomAppsSdkApi = zoomSdk["removeVirtualForeground"].bind(zoomSdk);
        zoomAppsSdkApi();
      }
    }
  }, [imageData]);


  return (
    <label className="flex items-center cursor-pointer">
      <div>
        
      </div>
    </label>
  );
}

export default RefreshAPIs;
