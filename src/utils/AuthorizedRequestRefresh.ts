import { getRefreshToken } from './TokenUtils';

export default async function authorizedRequestRefresh(url: string, body?: any, method = 'GET') {
  const token = getRefreshToken();
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  const parsedResponse = await response.json();
  return parsedResponse;
}
