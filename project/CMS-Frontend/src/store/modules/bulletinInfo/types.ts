export interface BulletinInfo {
  author: String;
  context: String;
  date: String;
  id: String;
  title: String;
}

export interface BulletinInfoState {
  bulletinInfo?: BulletinInfo;
  isEmpty: Boolean;
}
