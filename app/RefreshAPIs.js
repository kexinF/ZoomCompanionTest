// RefreshAPIs.js

import React from 'react';
import { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import invokeZoomAppsSdk from "./apis";


function RefreshAPIs({ imageData }) {
  const handleRefreshClick = () => {
    if (imageData) {
      console.log('APIs refreshed with imageData:', imageData); // Example usage
      const zoomAppsSdkApi = zoomSdk["setVirtualForeground"].bind(zoomSdk);
      zoomAppsSdkApi({imageData:imageData,})
        .then((clientResponse) => {
            console.log(
                `setVirtualForeground success with response: ${JSON.stringify(
                    clientResponse
                )}`
            );
        })
        .catch((clientError) => {
            console.log(
                `setVirtualForeground error: ${JSON.stringify(clientError)}`
            );
        });

    } else {
      console.log('APIs refreshed without imageData'); // Example usage
    }
  };

  return (
    <button style={{ backgroundColor: 'blue' }} onClick={handleRefreshClick}>Refresh APIs</button>
  );
}

export default RefreshAPIs;
