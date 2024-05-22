import { Typography } from '@/components';
import palette from '@/theme/colors';
import {
  CalendarOutlined,
  CaretDownOutlined,
  ControlOutlined,
  FileOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex, Input } from 'antd';
import { Helmet } from 'react-helmet-async';
import RecentFile from './components/RecentFile';

const HomePage = () => {
  const accountMenu = [
    {
      label: 'Thông tin tài khoản',
      href: '/profile',
      key: 'profile',
      icon: <UserOutlined style={{ fontSize: 16 }} />,
    },
    {
      label: 'Đăng xuất',
      href: '/logout',
      key: 'logout',
      icon: <LogoutOutlined style={{ fontSize: 16 }} />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Trang chủ | GeniFast Search</title>
      </Helmet>

      <Flex style={{ height: '100%' }} vertical gap={24}>
        <Flex
          style={{ height: 'fit-content', width: '100%' }}
          justify="center"
          align="center"
          vertical
          gap={8}
        >
          <Typography variant="3x" fontWeight="medium">
            Welcome to GeniFast ✌️
          </Typography>
          <Input
            placeholder="Tìm kiếm thông minh..."
            allowClear
            prefix={<SearchOutlined style={{ fontSize: 20, marginRight: 4 }} />}
            suffix={
              <Button
                type="text"
                icon={<ControlOutlined style={{ fontSize: 20 }} />}
                size="small"
                shape="circle"
                style={{ height: 20, width: 20, padding: '4px' }}
              />
            }
            style={{ width: '45%', borderRadius: 16 }}
          />
          <Flex gap={8}>
            <Dropdown
              trigger={['click']}
              menu={{
                theme: 'dark',
                items: accountMenu,
                mode: 'vertical',
                style: { flex: 1, minWidth: 0 },
              }}
            >
              <Button
                type="text"
                shape="round"
                size="small"
                icon={<FileOutlined style={{ fontSize: 16 }} />}
                style={{
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: palette.gray[50] },
                }}
              >
                Loại tệp
                <CaretDownOutlined />
              </Button>
            </Dropdown>

            <Dropdown
              trigger={['click']}
              menu={{
                theme: 'dark',
                items: accountMenu,
                mode: 'vertical',
                style: { flex: 1, minWidth: 0 },
              }}
            >
              <Button
                type="text"
                shape="round"
                size="small"
                icon={<UserOutlined style={{ fontSize: 16 }} />}
                style={{ backgroundColor: '#fff' }}
              >
                Người sở hữu
                <CaretDownOutlined />
              </Button>
            </Dropdown>

            <Dropdown
              trigger={['click']}
              menu={{
                theme: 'dark',
                items: accountMenu,
                mode: 'vertical',
                style: { flex: 1, minWidth: 0 },
              }}
            >
              <Button
                type="text"
                shape="round"
                size="small"
                icon={<CalendarOutlined style={{ fontSize: 16 }} />}
                style={{ backgroundColor: '#fff' }}
              >
                Ngày chỉnh sửa
                <CaretDownOutlined />
              </Button>
            </Dropdown>
          </Flex>
        </Flex>

        <Flex
          style={{
            height: '100%',
            backgroundColor: palette.gray.white,
            padding: '28px 52px',
            borderRadius: 8,
          }}
        >
          <RecentFile />
        </Flex>
      </Flex>
    </>
  );
};

export default HomePage;
