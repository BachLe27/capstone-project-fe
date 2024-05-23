import publicApi from '../config/publicApi.config';

const SERVICE_PATH = '/auth';

export const login = (username, password) => {
  return publicApi({
    method: 'POST',
    url: `${SERVICE_PATH}/login`,
    data: {
      email: username,
      password,
    },
  });
};

export const loginWithGoogleApi = (data) => {
  return publicApi({
    method: 'POST',
    url: `${SERVICE_PATH}/social-login`,
    data,
  });
};

export const getNewToken = (refreshToken) =>
  publicApi({
    method: 'POST',
    url: `${SERVICE_PATH}/refresh-token`,
    data: {
      refresh_token: refreshToken,
    },
  });
