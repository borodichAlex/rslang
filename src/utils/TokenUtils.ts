const REFRESH_TOKEN = 'R_token';

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

export const getRefreshToken = () => {
  const token = localStorage.getItem(REFRESH_TOKEN);
  return token;
};

export const deleteRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

const ACCESS_TOKEN = 'A_token';

export const setAccessToken = (token: string) => {
  sessionStorage.setItem(ACCESS_TOKEN, token);
};

export const getAccessToken = () => {
  const token = sessionStorage.getItem(ACCESS_TOKEN);
  return token;
};

export const deleteAccessToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN);
};
