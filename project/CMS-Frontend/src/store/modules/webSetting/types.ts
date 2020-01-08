export interface WebSetting {
  URLs: Array<object>;
  images: Array<object>;
  clinicAddress: String;
  description: String;
  doctorDescription: String;
  ourServices: String;
  title: String;
}

export interface WebSettingState {
  webSetting?: WebSetting;
  isEmpty: Boolean;
}
