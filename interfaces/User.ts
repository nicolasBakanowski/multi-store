export interface LoginData {
  email: string;
  password: string;
}
export interface UserState {
  id: number | null;
  email: string | null;
  role: string | null;
  token: string | null;
}

export const initialState: UserState = {
  id: null,
  email: null,
  role: null,
  token: null,
};
export interface UserRegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}
