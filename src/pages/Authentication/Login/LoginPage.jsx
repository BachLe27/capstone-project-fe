import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Flex, Form, Image, Input, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import searchPic from '@/assets/pictures/search.png';
import { Logo, Typography } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import palette from '@/theme/colors';
import { displayError } from '@/utils/error';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const screens = useBreakpoint();
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      await loginWithGoogle(response);
    },
  });

  const { t } = useTranslation();

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
    <>
      <Helmet>
        <title>Đăng nhập | GeniFast Search</title>
      </Helmet>
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
          <Flex vertical>
            <Typography variant="4x" fontWeight="bold">
              {t('common:hero.heading')}
            </Typography>
            <Typography variant="2x" fontWeight="medium">
              {t('common:hero.subHeading')}
            </Typography>
          </Flex>
        </Flex>

        <Flex
          justify="center"
          align="center"
          vertical
          gap={16}
          style={{
            height: '100%',
            padding: '120px 120px',
            borderRadius: 16,
            backgroundColor: palette.gray[10],
            width: 608,
          }}
        >
          <Logo size="medium" />

          <Typography variant="2x" fontWeight="semi-bold">
            {t('auth:login.title')}
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
              <Input.Password
                placeholder="Mật khẩu"
                prefix={<LockOutlined />}
              />
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
          <Typography>hoặc</Typography>
          <Button
            type="primary"
            style={{ backgroundColor: palette.red[60] }}
            icon={<GoogleOutlined style={{ fontSize: 18 }} />}
            onClick={handleLoginGoogle}
          >
            {' '}
            Đăng nhập bằng Google
          </Button>
          <Typography variant="base" fontWeight="regular">
            Chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link>
          </Typography>
          <Typography variant="base" fontWeight="regular">
            <Link to="/">Quên mật khẩu?</Link>
          </Typography>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginPage;
