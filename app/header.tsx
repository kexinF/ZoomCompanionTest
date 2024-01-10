import React, { useState, useEffect } from 'react';
import { affirmations, hands } from './state';
import { drawNametag } from './nametag/nametag';
import RefreshAPIs from './nametag/RefreshAPIs';
import { WaveHandButton } from '@/components/WaveHandButton';

const Header: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const header_title = affirmations.getCurrentAffirmation();

  const initialWaveHands: string[] = [
    '👋',
    '👋 I\'m not done',
    '👋 Question',
    '👋 Agree',
    '👋 Different Opinion',
    '👋 Support',
  ];

  const [waveHands, _setWaveHands] = useState<string[]>(() => {
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
          <WaveHandButton
            key={index}
            selected={selectedWaveHand === index}
            onClick={() => handleWaveHandsClick(index)}
            text={waveHand}
          />
        ))}
      </div>

      <RefreshAPIs imageData={imageData} />
    </div>
  );
};

export default Header;
