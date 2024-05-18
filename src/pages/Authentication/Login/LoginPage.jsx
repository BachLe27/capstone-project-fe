import { Button, Divider, Flex, Form, Image, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { Logo, Typography } from '@/components';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import palette from '@/theme/colors';
import searchPic from '@/assets/pictures/search.png';
import useAuth from '@/hooks/useAuth';
import { displayError } from '@/utils/error';

const LoginPage = () => {
  const screens = useBreakpoint();
  const { loginWithEmail } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    await loginWithEmail(
      values,
      () => {
        message.success('Đăng nhập thành công');
        setLoading(false);
      },
      (err) => {
        const errorResponse = err.response;

        if (errorResponse?.data?.errorCode === 'AU07') {
          form.setFields([
            {
              name: 'username',
              errors: ['Tài khoản hoặc mật khẩu không đúng'],
            },
            {
              name: 'password',
              errors: ['Tài khoản hoặc mật khẩu không đúng'],
            },
          ]);
        } else {
          displayError(errorResponse?.data?.errorCode);
        }
      },
    );
    setLoading(false);
  };

  return (
    <Flex
      justify="center"
      align="center"
      vertical={!screens.lg}
      style={{
        width: '100%',
        minHeight: 'inherit',
        backgroundColor: '#fff',
        padding: '36px 0',
      }}
      gap={screens.lg ? 80 : 32}
    >
      <Flex
        justify="center"
        align="center"
        vertical
        style={{ width: 481, display: !screens.md && 'none' }}
      >
        <Flex style={{ paddingRight: 32 }}>
          <Image width={280} src={searchPic} preview={false} />
        </Flex>
        <Typography variant="4x" fontWeight="bold">
          Quản lý dữ liệu văn bản và đa phương tiện thông minh
        </Typography>
        <Typography variant="2x" fontWeight="medium">
          Tìm kiếm dễ dàng hơn với sự hỗ trợ của AI
        </Typography>
      </Flex>

      <Flex
        justify="center"
        align="center"
        vertical
        gap={16}
        style={{
          height: '100%',
          padding: '144px 140px',
          borderRadius: 16,
          backgroundColor: palette.gray[10],
          width: 608,
        }}
      >
        <Logo size="medium" />

        <Typography variant="2x" fontWeight="semi-bold">
          Đăng nhập
        </Typography>
        <Form
          form={form}
          name="loginForm"
          initialValues={{ remember: false }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tài khoản của bạn' },
            ]}
          >
            <Input placeholder="Tài khoản" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="Mật khẩu" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: '100%' }}
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Typography variant="base" fontWeight="regular">
          <Link to="/">Quên mật khẩu?</Link>
        </Typography>
        <Divider style={{ margin: '0 0' }} />
        <Typography variant="base" fontWeight="regular">
          Chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link>
        </Typography>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
