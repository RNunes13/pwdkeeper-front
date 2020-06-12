
import { User } from '../../models';

export const SET_USER = 'SET_USER';

export interface AuthState {
  user: User | null;
}

interface UpdateUserAction {
  type: typeof SET_USER,
  payload: User | null,
}

export type AuthActionTypes = UpdateUserAction;
