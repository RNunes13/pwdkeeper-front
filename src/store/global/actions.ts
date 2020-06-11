
import {
  GlobalActionTypes,
  SET_PAGE,
  UPDATE_LOADING_DATA,
} from './types';

export function setPage(page: string): GlobalActionTypes {
  return {
    type: SET_PAGE,
    payload: page,
  }
}

export function updateLoadingPage(isLoading: boolean): GlobalActionTypes {
  return {
    type: UPDATE_LOADING_DATA,
    payload: isLoading,
  }
}
