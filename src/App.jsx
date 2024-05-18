import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
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
      <AntdProvider>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </AntdProvider>
    </QueryClientProvider>
  );
};

export default App;
