import { Button, Divider, Flex, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Typography } from '@/components';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import palette from '@/theme/colors';
import {
  EyeSVG,
  EyeSplashSVG,
  LockSVG,
  LogoSVG,
  PersonSVG,
} from '@/assets/icons';

const RegisterPage = () => {
  const screens = useBreakpoint();

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
        vertical
        style={{ width: 481, display: !screens.md && 'none' }}
      >
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
        <LogoSVG />

        <Typography variant="2x" fontWeight="semi-bold">
          Đăng ký
        </Typography>
        <Input placeholder="Tài khoản" prefix={<PersonSVG />} />
        <Input.Password
          placeholder="Mật khẩu"
          prefix={<LockSVG />}
          suffix={<LockSVG />}
          // eslint-disable-next-line react/no-unstable-nested-components
          iconRender={(visible) => (
            <Flex style={{ cursor: 'pointer' }}>
              {visible ? <EyeSplashSVG /> : <EyeSVG />}
            </Flex>
          )}
        />
        <Input.Password
          placeholder="Nhập lại khẩu"
          prefix={<LockSVG />}
          suffix={<LockSVG />}
          // eslint-disable-next-line react/no-unstable-nested-components
          iconRender={(visible) => (
            <Flex style={{ cursor: 'pointer' }}>
              {visible ? <EyeSplashSVG /> : <EyeSVG />}
            </Flex>
          )}
        />
        <Button type="primary" style={{ width: '100%' }}>
          Đăng nhập
        </Button>
        <Divider style={{ margin: '0 0' }} />
        <Typography variant="base" fontWeight="regular">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Typography>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
