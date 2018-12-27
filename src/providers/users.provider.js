import { getRequest, postRequest } from './global.provider';

const api = '/api/v1';

export const signIn = async (params) => {
  const response = await postRequest(`${api}/sign-in`, params);

  return response.data;
};

export const signUp = async (params) => {
  const response = await postRequest(`${api}/sign-up`, params);

  return response.data;
};

export const me = async () => {
  const response = await getRequest(`${api}/me`);

  return response.data;
};
