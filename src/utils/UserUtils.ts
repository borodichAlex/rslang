const USER_ID = 'userId';

export const setUserId = (userId: string) => {
  localStorage.setItem(USER_ID, userId);
};

export const getUserId = () => {
  const userId = localStorage.getItem(USER_ID);
  return userId;
};

export const deleteUserId = () => {
  localStorage.removeItem(USER_ID);
};
