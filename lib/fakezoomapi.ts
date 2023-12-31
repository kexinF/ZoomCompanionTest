import { ZoomApiWrapper } from './zoomapi';
import { GeneralMessageResponse }  from "@zoom/appssdk";

class FakeZoomApi implements ZoomApiWrapper {
  async setVirtualForeground(): Promise<GeneralMessageResponse> { return {} as GeneralMessageResponse; }
  async removeVirtualForeground(): Promise<GeneralMessageResponse> { return {} as GeneralMessageResponse; }
}
export type {ZoomApiWrapper};

export function createFromConfig() {
  return new FakeZoomApi();
}
