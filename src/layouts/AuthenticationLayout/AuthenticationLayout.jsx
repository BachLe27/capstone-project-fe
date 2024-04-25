import { Flex, Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom';
import palette from 'src/theme/colors';

const AuthenticationLayout = ({ children }) => {
  return (
    <Layout>
      <Header style={{ margin: 0, borderBottom: `1px solid ${palette.gray[30]}` }}>Header</Header>
      <Content style={{ minHeight: `calc(100vh - 64px - 68px)` }}>
        <Flex justify='center' style={{ minHeight: 'inherit' }}>
          {children ?? <Outlet />}
        </Flex>
      </Content>
      <Footer style={{ margin: 0, borderTop: `1px solid ${palette.gray[30]}` }}>Footer</Footer>
    </Layout>
  )
}

export default AuthenticationLayout