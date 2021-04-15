import { getUserId } from './UserUtils';
import authorizedRequest from './AuthorizedRequest';
import baseUrl from '../helpers/baseUrl';
import { userLoggedIn, userLogOut } from '../redux/user/actions';
import { IUser } from '../redux/user/interfaces';
import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './TokenUtils';
import authorizedRequestRefresh from './AuthorizedRequestRefresh';

const getUser = async (id: string): Promise<IUser> => {
  const res = await authorizedRequest(`${baseUrl}/users/${id}`);
  return res;
};
const refreshTokens = async (id: string): Promise<{token: string; refreshToken: string}> => {
  const res = await authorizedRequestRefresh(`${baseUrl}/users/${id}/tokens`);
  return res;
};

export const checkAuthUser = async (dispatch: any) => {
  const logOutApp = () => {
    deleteRefreshToken();
    deleteAccessToken();
    dispatch(userLogOut());
  };
  const setUser = async (id: string) => {
    const { avatar, name } = await getUser(id);
    dispatch(userLoggedIn({ avatar, name }));
  };

  const userId = getUserId();
  if (!userId) {
    logOutApp();
    return;
  }

  const accessToken = getAccessToken();
  const refreshT = getRefreshToken();

  if (accessToken && refreshT) {
    try {
      await setUser(userId);
    } catch {
      const { token, refreshToken } = await refreshTokens(userId);

      if (token && refreshToken) {
        setRefreshToken(refreshToken);
        setAccessToken(token);

        await setUser(userId);
      } else {
        logOutApp();
      }
    }
  }

  // if (refreshT) {
  //   const { token, refreshToken } = await refreshTokens(userId);
  //   console.log({refreshToken});

  //   if (token && refreshToken) {
  //     setRefreshToken(refreshToken);
  //     setAccessToken(token);

  //     const { avatar, name } = await getUser(userId);
  //     dispatch(userLoggedIn({ avatar, name }));
  //   } else {
  //     deleteRefreshToken();
  //     deleteAccessToken();
  //     dispatch(userLogOut());
  //   }
  // }
};

export default checkAuthUser;
