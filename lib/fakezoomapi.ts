import {ZoomApiWrapper} from './zoomapi';

class FakeZoomApi implements ZoomApiWrapper {
  async setVirtualForeground() {}
  async removeVirtualForeground() {}
}
export {ZoomApiWrapper};

export function createFromConfig() {
  return new FakeZoomApi();
}
