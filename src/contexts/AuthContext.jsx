import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import token from '@/utils/token';
import {
  getNewToken,
  login,
  loginWithGoogleApi,
} from '@/services/api/authentication';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext({
  isAuthenticated: null,
  logout: () => Promise.resolve(),
  loginWithEmail: () => Promise.resolve(),
  me: null,
  loginWithGoogle: () => Promise.resolve(),
});

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [me, setMe] = useState(null);

  const logout = useCallback(async () => {
    try {
      token.removeRefreshToken();
      token.removeAccessToken();
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setMe(null);
      message.success('Đăng xuất thành công');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      message.success('Đăng xuất thất bại');
    } finally {
      queryClient.clear();
      navigate('/', { replace: true });
    }
  }, [navigate, queryClient]);

  const saveMe = useCallback((data) => {
    const user = {
      email: data.email,
      id: data.user_id,
    };

    setMe(user);
    localStorage.setItem('user', JSON.stringify(user));
  }, []);

  const loginWithEmail = useCallback(
    async (data, onSuccess, onError) => {
      try {
        const { username, password } = data;
        const response = await login(username, password);

        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data.data;

        const user = jwtDecode(accessToken);

        saveMe(user);

        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);

        setIsAuthenticated(true);

        onSuccess?.();
        navigate('/', { replace: true });
      } catch (error) {
        if (onError) onError?.(error);
      }
    },
    [navigate, saveMe],
  );

  const loginWithGoogle = useCallback(
    async (data) => {
      try {
        const GOOGLE_API_URL =
          'https://www.googleapis.com/oauth2/v3/userinfo?access_token';

        const accountInfoResponse = await axios.get(
          `${GOOGLE_API_URL}=${data.access_token}`,
        );

        const gmailAccount = accountInfoResponse.data;

        const response = await loginWithGoogleApi({
          email: gmailAccount.email,
          is_social: true,
          first_name: gmailAccount.given_name,
          last_name: gmailAccount.family_name,
          picture: gmailAccount.picture,
        });

        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data.data;

        const user = jwtDecode(accessToken);

        saveMe(user);

        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);

        setIsAuthenticated(true);

        message.success('Đăng nhập thành công');
        navigate('/', { replace: true });
        return true;
      } catch (err) {
        message.error('Đăng nhập bằng Google thất bại');
        // eslint-disable-next-line no-console
        console.error(err);
        return false;
      }
    },
    [navigate, saveMe],
  );

  const loginWithToken = useCallback(async () => {
    try {
      const accessToken = token.getAccessToken();
      const refreshToken = token.getRefreshToken();

      if (!accessToken || !refreshToken) {
        setIsAuthenticated(false);
        return;
      }

      const user = jwtDecode(accessToken);

      const currentTime = Math.floor(Date.now() / 1000);

      if (user.exp < currentTime) {
        const response = await getNewToken(refreshToken);
        const newAccessToken = response.data.data.access_token;
        const newRefreshToken = response.data.data.refresh_token;

        token.setAccessToken(newAccessToken);
        token.setRefreshToken(newRefreshToken);

        saveMe(jwtDecode(newAccessToken));

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      token.removeAccessToken();
      token.removeRefreshToken();
      setIsAuthenticated(false);
      queryClient.clear();
    }
  }, [queryClient, saveMe]);

  useEffect(() => {
    if (isAuthenticated === null) {
      loginWithToken().then(
        () => {},
        () => {},
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      logout,
      loginWithEmail,
      loginWithGoogle,
      me,
    }),
    [isAuthenticated, logout, me, loginWithEmail, loginWithGoogle],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
