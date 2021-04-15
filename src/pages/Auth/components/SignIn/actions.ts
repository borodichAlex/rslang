import {
 SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, ActionType,
} from './types';

interface IAction {
  type: ActionType;
  payload: {
    isLoading: boolean,
    isError: boolean,
    error?: number,
  }
}

const signInRequest = (): IAction => ({
    type: SIGNIN_REQUEST,
    payload: {
      isLoading: true,
      isError: false,
    },
  });

const signInSuccess = (): IAction => ({
    type: SIGNIN_SUCCESS,
    payload: {
      isLoading: false,
      isError: false,
    },
  });

const signInFail = (error: number): IAction => ({
    type: SIGNIN_FAIL,
    payload: {
      isLoading: false,
      isError: true,
      error,
    },
  });

export type { IAction };

export {
  signInRequest,
  signInSuccess,
  signInFail,
};
