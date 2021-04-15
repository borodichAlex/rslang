import { getAccessToken } from './TokenUtils';

export default async function authorizedRequest(url: string, body?: any, method = 'GET') {
  const token = getAccessToken();
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
