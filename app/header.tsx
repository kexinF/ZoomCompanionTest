import React, { useState, useEffect } from 'react';
import { affirmations, hands } from './state';
import { drawNametag } from './nametag/nametag';
import RefreshAPIs from './nametag/RefreshAPIs';

const Header: React.FC = () => {
  const [runningContext, setRunningContext] = useState<string | null>(null);
  const [userContextStatus, setUserContextStatus] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  async function configureSdk() {
    try {
      const configResponse = await zoomSdk.config({
        capabilities: ["setVirtualForeground", "removeVirtualForeground"],
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

  const header_title = affirmations.getCurrentAffirmation();

  const initialWaveHands: string[] = [
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ];

  const [waveHands, setWaveHands] = useState<string[]>(() => {
    const localStorageData = hands.getHandChoicesAsString();
    return localStorageData ? JSON.parse(localStorageData) : initialWaveHands;
  });

  const [selectedWaveHand, setSelectedWaveHand] = useState<number | null>(() => {
    const localStorageData = hands.getCurrentHand();
    return localStorageData ? JSON.parse(localStorageData) : null;
  });

  const handleWaveHandsClick = (index: number) => {
    if (index === selectedWaveHand) {
      setSelectedWaveHand(null);
    } else {
      setSelectedWaveHand(index);
    }
  };

  useEffect(() => {
    localStorage.setItem('waveHands', JSON.stringify(waveHands));
  }, [waveHands]);

  useEffect(() => {
    localStorage.setItem('selectedWaveHand', JSON.stringify(selectedWaveHand));
    const newImageData = drawNametag();
    setImageData(newImageData);
  }, [selectedWaveHand]);

  return (
    <div className="header">
      <div className="self-confirm">
        <h1>{header_title}</h1>
      </div>

      <div className="button-rows">
        {waveHands.map((waveHand, index) => (
          <button
            key={index}
            className={`wave-hand-button ${selectedWaveHand === index ? 'selected' : ''}`}
            onClick={() => handleWaveHandsClick(index)}
          >
            {waveHand}
          </button>
        ))}
      </div>

      <RefreshAPIs imageData={imageData} />
    </div>
  );
};

export default Header;
