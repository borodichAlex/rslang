import { IAction } from './actions';
import {
 SIGN_UP_FAIL, SIGN_UP_SUCCESS, SIGN_UP_REQUEST,
} from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case SIGN_UP_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
