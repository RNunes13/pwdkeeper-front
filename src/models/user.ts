
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  token: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSchema {
  id: number;
  name: string;
  username: string;
  email: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
