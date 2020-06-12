
import {
  GlobalActionTypes,
  GlobalState,
  SET_PAGE,
  UPDATE_LOADING_DATA,
} from './types';

const initialState: GlobalState = {
  page: '',
  loadingData: true,
};

export function globalReducer(state = initialState, action: GlobalActionTypes): GlobalState {
  switch (action.type) {
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      }
    }
    case UPDATE_LOADING_DATA: {
      return {
        ...state,
        loadingData: action.payload,
      }
    }
    default:
      return state;
  }
}
