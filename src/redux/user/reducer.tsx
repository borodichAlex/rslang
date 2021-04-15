import { Reducer } from 'redux';
import { IAction } from './actions';
import { IState } from './interfaces';
import { USER_LOGGED_IN, USER_LOG_OUT } from './types';

const initState: IState = {
  avatar: '',
  name: '',
  isAuth: false,
};

const userReducer: Reducer<IState, IAction> = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOG_OUT:
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export default userReducer;
