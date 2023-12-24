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

  async function configureSdk() {
    try {
      const configResponse = await zoomSdk.config({
        capabilities: [
          "setVirtualForeground",
          "removeVirtualForeground"

        ],
        version: "0.16.0",
      });
      console.log("App configured", configResponse);
      setRunningContext(configResponse.runningContext);

      setUserContextStatus(configResponse.auth.status);

      const userContext = await zoomSdk.invoke("getUserContext");
      setUser(userContext);
    } catch (error) {
      console.log('zoom sdk not loaded')
    }
  }

  useEffect(() => {
    configureSdk();
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
