import { Button, Dropdown, Flex, Layout, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import palette from '@/theme/colors';
import { Logo } from '@/components';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const AuthenticationLayout = ({ children }) => {
  const screens = useBreakpoint();

  const { i18n } = useTranslation();

  const [language, setLanguage] = useState('Vietnamese');

  const languageMenu = [
    { key: 'vi', label: 'Vietnamese' },
    { key: 'en', label: 'English' },
  ];

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleClick = (e) => {
    changeLanguageHandler(e.key);
    setLanguage(e.key === 'en' ? 'English' : 'Vietnamese');
  };

  return (
    <Layout>
      <Header
        style={{
          margin: 0,
          borderBottom: `1px solid ${palette.gray[30]}`,
          padding: screens.md ? '16px 36px' : '16px 8px',
        }}
      >
        <Flex justify="space-between">
          <Logo size="small" />
          <Dropdown
            menu={{
              items: languageMenu,
              selectable: true,
              defaultSelectedKeys: ['vi'],
              onClick: handleClick,
            }}
          >
            <Button>
              <GlobalOutlined />
              {language}
            </Button>
          </Dropdown>
        </Flex>
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
