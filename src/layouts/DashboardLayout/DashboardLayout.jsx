import useAuth from '@/hooks/useAuth';
import { Flex, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const { Content } = Layout;

const DashboardLayout = ({ children }) => {
  const { logout, isAuthenticated, me } = useAuth();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content>
          <Flex
            style={{ padding: '28px 60px', height: '100%' }}
            vertical
            gap={24}
          >
            <Header />
            {children ?? <Outlet />}
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
