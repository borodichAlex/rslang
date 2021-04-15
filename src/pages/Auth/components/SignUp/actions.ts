import {
 SIGN_UP_FAIL, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, ActionType,
} from './types';

interface IAction {
  type: ActionType;
  payload: {
    isLoading: boolean,
    isError: boolean,
    isSuccess?: boolean,
    error?: number,
  }
}

const signUpRequest = (): IAction => ({
  type: SIGN_UP_REQUEST,
  payload: {
    isLoading: true,
    isError: false,
  },
});

const signUpSuccess = (): IAction => ({
  type: SIGN_UP_SUCCESS,
  payload: {
    isLoading: false,
    isError: false,
    isSuccess: true,
  },
});

const signUpFail = (error: number): IAction => ({
  type: SIGN_UP_FAIL,
  payload: {
    isLoading: false,
    isError: true,
    isSuccess: false,
    error,
  },
});

export type { IAction };

export {
  signUpRequest,
  signUpSuccess,
  signUpFail,
};
