import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';
import AntdProvider from './theme/AntdProvider';
import Router from './routes';
import AuthProvider from './contexts/AuthContext';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 3,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <GoogleOAuthProvider clientId="907395185916-kctg2ht5r8mn8dlhthc8g0krr1pr42k7.apps.googleusercontent.com">
          <AntdProvider>
            <BrowserRouter>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </BrowserRouter>
          </AntdProvider>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
