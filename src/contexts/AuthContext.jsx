import { useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import token from 'src/utils/token';

export const AuthContext = createContext({
	isAuthenticated: null,
	logout: () => Promise.resolve(),
	me: null,
});


const AuthProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [me, setMe] = useState(null);

	useEffect(() => {
		setIsAuthenticated(false);
	}, [isAuthenticated]);

	const logout = useCallback(async () => {
		try {
			token.removeRefreshToken();
			message.success('Đăng xuất thành công');
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
			message.success('Đăng xuất thất bại');
		} finally {
			token.removeAccessToken();
			setIsAuthenticated(false);
			setMe(null);
			queryClient.clear();
			navigate('/', { replace: true });
		}
	}, [navigate, queryClient]);

	const contextValue = useMemo(
		() => ({
			isAuthenticated,
			logout,
			me,
		}),
		[isAuthenticated, logout, me, ],
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;

};

export default AuthProvider;