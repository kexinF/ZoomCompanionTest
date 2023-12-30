import {ZoomApiWrapper} from './zoomapi';

class FakeZoomApi implements ZoomApiWrapper {
  async setVirtualForeground(): Promise<any> {}
  async removeVirtualForeground(): Promise<any> {}
}
export type {ZoomApiWrapper};

export function createFromConfig() {
  return new FakeZoomApi();
}
