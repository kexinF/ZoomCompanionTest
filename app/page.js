"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import { apis, invokeZoomAppsSdk } from "./apis";
import NameTag from "./nametag"
import Header from './header';
import Footer from './footer';

export default function Home() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [runningContext, setRunningContext] = useState(null);
  const [userContextStatus, setUserContextStatus] = useState("");
  const [apiSearchText, setApiSearchText] = useState("");
  const [showVideos, setShowVideos] = useState(false);

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

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">

        <Header title={'test'} />
      </div>

      <NameTag />
      
      <div className="flex flex-col items-center justify-center w-full  p-4">
        <div className="max-w-xs w-full overflow-auto">
          <div className="space-y-2">
            {apis?.map((api) => (
              <button
                onClick={invokeZoomAppsSdk(api)}
                className="w-full bg-[#35377D] hover:bg-slate-900 text-white font-medium py-2 rounded-lg focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
                key={api.buttonName || api.name}
              >
                {" "}
                {api.buttonName || api.name}
              </button>
            ))}
            

          </div>
        </div>
      </div>

    <Footer />

    </div>
  );
}