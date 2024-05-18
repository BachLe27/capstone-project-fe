import publicApi from '../config/publicApi.config';

const SERVICE_PATH = '/auth';

export const login = (username, password) => {
  return publicApi({
    method: 'POST',
    url: `${SERVICE_PATH}/login`,
    data: {
      phone: username,
      password,
      platformId: 1,
    },
  });
};

export const refreshToken = () =>
  publicApi({
    method: 'GET',
    url: `${SERVICE_PATH}/refresh-token`,
    withCredentials: true,
  });
