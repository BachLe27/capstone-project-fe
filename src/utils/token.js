const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const setAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
};

const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

const token = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
};

export default token;
