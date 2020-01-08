export interface User {
  email: String;
  name: String;
  image: String | null;
  role: String;
  introduction: String | null;
}

export interface UserState {
  user?: User;
  error: Boolean;
}
