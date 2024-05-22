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
  login,
  loginWithGoogleApi,
  refreshToken as refreshTokenApi,
} from '@/services/api/authentication';
import { useNavigate } from 'react-router-dom';

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
    const info = {
      id: data.id,
      code: data.code,
      phone: data.phone,
      name: data.name,
      legalName: data.legalName,
      avatarUrl: data.avatarUrl,
      email: data.email,
      roles: data.userRoles.map(({ role }) => {
        return {
          id: role.id,
          name: role.name,
          description: role.description,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        };
      }),

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isActive: data.isActive ? 'onBoard' : 'offBoard',
      branchIds: data.branchIds.map((item) => item.toString()),
    };

    setMe((currState) => ({ ...currState, ...info }));
  }, []);

  const loginWithEmail = useCallback(
    async (data, onSuccess, onError) => {
      try {
        const { username, password } = data;
        const response = await login(username, password);

        const { accessToken, user } = response.data.result;

        saveMe(user);

        token.setAccessToken(accessToken);

        setIsAuthenticated(true);

        onSuccess?.();
        navigate('/', { replace: true });
      } catch (error) {
        if (onError) onError?.(error);
      }
    },
    [saveMe, navigate],
  );

  const loginWithGoogle = useCallback(
    async (data) => {
      try {
        const response = await loginWithGoogleApi(data);

        const { accessToken } = response.data.data;
        const { refreshToken } = response.data.data;

        saveMe(response.data.data.user);

        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        setIsAuthenticated(true);

        message.success('Sign in successfully');
        navigate('/', { replace: true });
        return true;
      } catch (err) {
        message.error('Sign in with Google failed');
        // eslint-disable-next-line no-console
        console.error(err);
        return false;
      }
    },
    [navigate, saveMe],
  );

  const loginWithToken = useCallback(async () => {
    try {
      if (!token.getAccessToken()) {
        setIsAuthenticated(false);
        if (token.getRefreshToken()) token.removeRefreshToken();
        return;
      }

      const response = await refreshTokenApi();

      const { accessToken, user } = response.data.result;

      saveMe(user);

      token.setAccessToken(accessToken);

      setIsAuthenticated(true);
    } catch (error) {
      token.removeAccessToken();
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
