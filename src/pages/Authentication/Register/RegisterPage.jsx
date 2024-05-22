import { Button, Divider, Flex, Form, Image, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Logo, Typography } from '@/components';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import palette from '@/theme/colors';
import searchPic from '@/assets/pictures/search.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
  const screens = useBreakpoint();

  const handleSubmit = (values) => {
    console.log(values);
  };

  const genderOptions = [
    {
      label: 'Nam',
      value: true,
    },
    {
      label: 'Nữ',
      value: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Đăng ký | GeniFast Search</title>
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
            padding: '120px',
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
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập Email của bạn' },
              ]}
            >
              <Input placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên đệm' },
                ]}
                style={{ display: 'inline-block', width: 'calc(50%)' }}
              >
                <Input placeholder="Họ và tên đệm" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên của bạn' },
                ]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  marginLeft: '8px',
                }}
              >
                <Input placeholder="Tên" prefix={<UserOutlined />} />
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[{ required: true, message: 'Vui chọn giới tính' }]}
            >
              <Select
                allowClear
                size="large"
                optionLabelProp="label"
                placeholder={
                  <Flex>
                    <UserOutlined
                      style={{ fontSize: 14, padding: '0 4px', color: 'black' }}
                    />
                    <Typography color={palette.gray[40]}>Giới tính</Typography>
                  </Flex>
                }
              >
                {genderOptions.map((data) => (
                  <Select.Option
                    key={data.value}
                    value={data.value}
                    label={
                      <>
                        <UserOutlined
                          style={{
                            fontSize: 14,
                            padding: '0 4px',
                            color: 'black',
                          }}
                        />
                        <Typography>{data.label}</Typography>
                      </>
                    }
                  >
                    <Typography>{data.label}</Typography>
                  </Select.Option>
                ))}
              </Select>
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
            <Form.Item
              style={{
                marginBottom: 0,
              }}
            >
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: '100%' }}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <Divider style={{ margin: '0 0' }} />
          <Typography variant="base" fontWeight="regular">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </Typography>
        </Flex>
      </Flex>
    </>
  );
};

export default RegisterPage;
