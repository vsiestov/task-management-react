import { deleteRequest, getRequest, postRequest, putRequest } from './global.provider';

const api = '/api/v1/tasks';

export const create = async (params) => {
  const response = await postRequest(`${api}`, params);

  return response.data;
};

export const getList = async () => {
  const response = await getRequest(`${api}`);

  return response.data;
};

export const getOne = async (id) => {
  const response = await getRequest(`${api}/${id}`);

  return response.data;
};

export const update = async (id, params) => {
  const response = await putRequest(`${api}/${id}`, params);

  return response.data;
};

export const remove = async (id) => {
  const response = await deleteRequest(`${api}/${id}`);

  return response.data;
};
