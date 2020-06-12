
import { User } from '../../models';
import {
  AuthActionTypes,
  SET_USER,
} from './types';

export function setUser(user: User | null): AuthActionTypes {
  return {
    type: SET_USER,
    payload: user,
  }
}
