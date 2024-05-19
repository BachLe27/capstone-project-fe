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
  refreshToken as refreshTokenApi,
} from '@/services/api/authentication';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  isAuthenticated: false,
  logout: () => Promise.resolve(),
  loginWithEmail: () => Promise.resolve(),
  me: null,
});

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const loginWithToken = useCallback(async () => {
    try {
      if (!token.getAccessToken()) {
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
    if (me === null)
      loginWithToken().then(
        () => {},
        () => {},
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      logout,
      loginWithEmail,
      me,
    }),
    [isAuthenticated, logout, me, loginWithEmail],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
