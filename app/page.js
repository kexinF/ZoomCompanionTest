"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import { apis, invokeZoomAppsSdk } from "./apis";
import NameTag from "./nametag"

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
        <Image
          src="/aimpower.png"
          alt="Aimpower Logo"
          className="h-20 p-5 w-auto rounded-3xl"
          width="400"
          height="400"
        />

        <h3 className="text-xl font-bold text-black-600 p-5">
          Welcome{" "}
          {user ? `${user.first_name} ${user.last_name}` : "Aimpower Apps User"}
          !
        </h3>
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
    

    <footer className="footer">
      <div className="footer-section">
        <a href="/affirmation" className="footer-link">
          <span class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm6-8A6,6,0,0,1,6,13a1,1,0,0,1,2,0,4,4,0,0,0,8,0,1,1,0,0,1,2,0ZM8,10V9a1,1,0,0,1,2,0v1a1,1,0,0,1-2,0Zm6,0V9a1,1,0,0,1,2,0v1a1,1,0,0,1-2,0Z"/></svg>
          </span>
          Affirmation
        </a>
      </div>
      <div className="footer-section">
        <a href="/name-tag" className="footer-link">Name Tag</a>
      </div>
      <div className="footer-section">
        <a href="/mindfulness" className="footer-link">Mindfulness</a>
      </div>
      <div className="footer-section">
        <a href="/wave-hands" className="footer-link">Wave Hands</a>
      </div>
    </footer>

    </div>
  );
}