import {
 USER_LOGGED_IN, USER_LOG_OUT, ActionType,
} from './types';

import { IState, IUser } from './interfaces';

interface IAction {
  type: ActionType;
  payload?: IState;
}

const userLoggedIn = ({ name, avatar }: IUser): IAction => ({
  type: USER_LOGGED_IN,
  payload: {
    isAuth: true,
    name,
    avatar,
  },
});

const userLogOut = (): IAction => ({
  type: USER_LOG_OUT,
});

export type { IAction };

export {
  userLoggedIn,
  userLogOut,
};
