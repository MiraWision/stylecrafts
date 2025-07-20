import { APIPath, HTTPMethod } from './types';

const sendRequest = async (url: APIPath, method: HTTPMethod, data?: any) => {
  const response = await fetch(url, {
    method,
    body: data,
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData);
  }
}

export { sendRequest };
