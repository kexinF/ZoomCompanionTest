export namespace affirmations {
  export function getCurrentAffirmation(): string|null {
    return localStorage.getItem('title');
  }
  export function setCurrentAffirmation(text: string) {
    localStorage.setItem('title', text);
  }

  export function getAffirmationsAsString(): string|null {
    localStorage.getItem('buttons');
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
    localStorage.getItem('waveHands');
  }
  export function setHandChoicesAsString(hands: string) {
    localStorage.setItem('waveHands', hands);
  }

}
