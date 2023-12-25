export namespace affirmations {
  export function getCurrentAffirmation(): string|null {
    return localStorage.getItem('title');
  }
  export function setCurrentAffirmation(text: string) {
    localStorage.setItem('title', text);
  }

  export function getAffirmationsAsString(): string|null {
    return localStorage.getItem('buttons');
  }
  export function setAffirmationsAsString(affirmations: string) {
    localStorage.setItem('buttons', affirmations);
  }
}

export namespace hands {

  export function getCurrentHand(): string|null {
    return localStorage.getItem('selectedWaveHand');
  }
  export function setCurrentHand(text: string) {
    localStorage.setItem('selectedWaveHand', text);
  }

  export function getHandChoicesAsString(): string|null {
    return localStorage.getItem('waveHands');
  }
  export function setHandChoicesAsString(hands: string) {
    localStorage.setItem('waveHands', hands);
  }
}


export namespace nametags {

  export function getCurrentNametag(): string[] {
    const inputValues: string[] = [];
    for (let index = 0; index < 4; index++) {
        const key = `inputValue${index}`;
        const value = localStorage.getItem(key);
        if (value !== null) {
            inputValues.push(value);
        } else {
          inputValues.push('')
        }
    }
    return inputValues;
}

  export function setCurrentNametag(inputValues: string[]) {
    inputValues.forEach((value, index) => {
        const key = `inputValue${index}`;
        localStorage.setItem(key, value);
    });
}

  export function getNametagStatus(): string|null {
    return localStorage.getItem('showNametag');
  }
  export function setNametagStatus(showNametag: string) {
    localStorage.setItem('showNametag', showNametag);
  }


}
