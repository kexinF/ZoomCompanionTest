import React, { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";

interface RefreshAPIsProps {
  imageData: string; 
}

const RefreshAPIs: React.FC<RefreshAPIsProps> = ({ imageData }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Disable the code for 0.1 seconds
    setTimeout(() => {
      setIsDisabled(false);
    }, 100);
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
      setRunningContext(configResponse.runningContext);
      setUserContextStatus(configResponse.auth.status);

      const userContext = await zoomSdk.invoke("getUserContext");
      setUser(userContext);
    } catch (error) {
      console.log('zoom sdk not loaded');
    }
  }

  useEffect(() => {
    configureSdk();
  }, []);

  useEffect(() => {
    if (!isDisabled) {
      if (imageData) {
        const zoomAppsSdkApi = zoomSdk["setVirtualForeground"].bind(zoomSdk);
        zoomAppsSdkApi({ imageData: imageData });
      } else {
        const zoomAppsSdkApi = zoomSdk["removeVirtualForeground"].bind(zoomSdk);
        zoomAppsSdkApi();
      }
    }
  }, [imageData, isDisabled]);

  return (
    <label className="flex items-center cursor-pointer">
      <div>
        {/* Add content inside the label if needed */}
      </div>
    </label>
  );
};

export default RefreshAPIs;
