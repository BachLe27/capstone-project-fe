import useAuth from '@/hooks/useAuth';
import { Profile } from '@/modals';
import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex } from 'antd';
import { useState } from 'react';

const Header = () => {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClick = (e) => {
    if (e.key === 'profile') handleOpen();
    if (e.key === 'logout') logout();
  };

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
    <Flex justify="flex-end" align="center">
      <Flex align="center" gap={8}>
        <Button
          shape="circle"
          icon={<BellOutlined style={{ fontSize: 16 }} />}
        />
        <Button
          shape="circle"
          icon={<SettingOutlined style={{ fontSize: 16 }} />}
        />

        <Dropdown
          trigger={['click']}
          placement="topRight"
          arrow
          menu={{
            theme: 'dark',
            items: accountMenu,
            mode: 'vertical',
            style: { flex: 1, minWidth: 0 },
            onClick: handleClick,
          }}
        >
          <Button
            shape="circle"
            icon={<UserOutlined style={{ fontSize: 16 }} />}
          />
        </Dropdown>
      </Flex>
      <Profile isModalOpen={isModalOpen} handleCancel={handleClose} />
    </Flex>
  );
};

export default Header;
