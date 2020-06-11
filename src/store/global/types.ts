
export const SET_PAGE = 'SET_PAGE';
export const UPDATE_LOADING_DATA = 'UPDATE_LOADING_DATA';

export interface GlobalState {
  page: string;
  loadingData: boolean;
}

interface UpdatePageAction {
  type: typeof SET_PAGE,
  payload: string,
}

interface UpdateLoadingDataAction {
  type: typeof UPDATE_LOADING_DATA,
  payload: boolean,
}

export type GlobalActionTypes = UpdatePageAction | UpdateLoadingDataAction;
