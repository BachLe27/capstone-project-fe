import { Button, Divider, Flex, Form, Image, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Logo, Typography } from '@/components';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import palette from '@/theme/colors';
import searchPic from '@/assets/pictures/search.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const RegisterPage = () => {
  const screens = useBreakpoint();

  const handleSubmit = (values) => {
    console.log(values);
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
          Đăng ký
        </Typography>
        <Form
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
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
              placeholder="Nhập lại khẩu"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '0 0' }} />
        <Typography variant="base" fontWeight="regular">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Typography>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
