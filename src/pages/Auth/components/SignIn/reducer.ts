import { IAction } from './actions';
import {
 SIGNIN_FAIL, SIGNIN_SUCCESS, SIGNIN_REQUEST,
} from './types';

export const initialState = {
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
