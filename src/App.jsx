import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AntdProvider from './theme/AntdProvider';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
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
          <Router />
        </BrowserRouter>
      </AntdProvider>
    </QueryClientProvider>
  )
}

export default App
