import { Flex, Layout, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import palette from '@/theme/colors';
import { Logo } from '@/components';
import { useBreakpoint } from '@/hooks/useBreakPoint';

const AuthenticationLayout = ({ children }) => {
  const screens = useBreakpoint();

  return (
    <Layout>
      <Header
        style={{
          margin: 0,
          borderBottom: `1px solid ${palette.gray[30]}`,
          padding: screens.md ? '16px 36px' : '16px 8px',
        }}
      >
        <Logo size="small" />
      </Header>
      <Content style={{ minHeight: 'calc(100vh - 64px - 68px)' }}>
        <Flex justify="center" style={{ minHeight: 'inherit' }}>
          {children ?? <Outlet />}
        </Flex>
      </Content>
      <Footer
        style={{
          margin: 0,
          borderTop: `1px solid ${palette.gray[30]}`,
          height: 64,
          backgroundColor: '#fff',
        }}
      >
        <Flex justify="center">
          <Typography>Copyright2024©GeniFast</Typography>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default AuthenticationLayout;
