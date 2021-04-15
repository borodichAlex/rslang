export type IUser = {
  name: string,
  avatar: string,
}

export interface IState extends IUser {
  isAuth: boolean;
}
