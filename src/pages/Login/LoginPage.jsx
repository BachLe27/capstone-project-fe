import { LockFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Flex, Input, Typography, theme } from 'antd'
import Link from 'antd/es/typography/Link'
import React from 'react'

const { Title } = Typography

const LoginPage = () => {
  return (
    <Flex justify='center' vertical gap={16} style={{ width: 328, minHeight: 'inherit' }}>
      <Avatar />
      <Title level={3} style={{ margin: `0 0` }}>Đăng nhập</Title>
      <Divider style={{ margin: `0 0` }} />
      <Input placeholder='Tài khoản' prefix={<UserOutlined />} />
      <Input placeholder='Mật khẩu' prefix={<LockFilled />} />
      <Button type='primary'>Đăng nhập</Button>
      <Link href="/" target="_blank">
        Quên mật khẩu?
      </Link>
    </Flex>
  )
}

export default LoginPage