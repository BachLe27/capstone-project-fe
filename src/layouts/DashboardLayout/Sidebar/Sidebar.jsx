import { Logo, Typography } from '@/components';
import palette from '@/theme/colors';
import {
  ApartmentOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FileTextOutlined,
  FolderAddOutlined,
  HomeOutlined,
  PlusOutlined,
  ShareAltOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex, Menu, Tooltip } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const siderMenu = useMemo(() => {
    return [
      {
        key: '/home',
        icon: <HomeOutlined />,
        label: 'Trang chủ',
      },
      {
        key: '/manage-organization',
        icon: <ApartmentOutlined />,
        label: 'Quản lý tổ chức',
      },
      {
        key: '/my-files',
        icon: <FileTextOutlined />,
        label: 'Tệp của tôi',
      },
      {
        key: '/organization',
        icon: <TeamOutlined />,
        label: 'Tổ chức của tôi',
      },

      {
        key: '/shared',
        icon: <ShareAltOutlined />,
        label: 'Chia sẻ',
      },
      {
        key: '/starred',
        icon: <StarOutlined />,
        label: 'Được đánh dấu',
      },
      {
        key: '/deleted',
        icon: <DeleteOutlined />,
        label: 'Đã xoá',
      },
    ];
  }, []);

  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(e);
    navigate(e.key);
  };

  const addFileMenu = [
    {
      label: 'Thêm file',
      key: 'addFile',
      icon: <FileAddOutlined style={{ fontSize: 16 }} />,
    },
    {
      label: 'Thêm thư mục',
      href: 'addFolder',
      icon: <FolderAddOutlined style={{ fontSize: 16 }} />,
    },
  ];

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
    >
      <Flex style={{ padding: '28px' }} gap={4} align="center">
        <Logo size="small" />
        {!collapsed && (
          <Typography
            variant="x"
            color={palette.ultramarine[100]}
            fontWeight="medium"
          >
            GeniFast
          </Typography>
        )}
      </Flex>
      <Flex
        vertical
        style={{
          paddingLeft: 8,
          paddingRight: 8,
        }}
        gap={16}
      >
        <Flex
          align="center"
          style={{
            paddingLeft: collapsed ? 8 : 12,
            paddingRight: collapsed ? 8 : 12,
          }}
        >
          <Dropdown
            trigger={['click']}
            placement="topLeft"
            arrow
            menu={{
              theme: 'dark',
              items: addFileMenu,
              mode: 'vertical',
              style: { flex: 1, minWidth: 0 },
              onClick: handleClick,
            }}
          >
            <Tooltip
              title={collapsed ? 'Thêm file/thư mục' : ''}
              placement="right"
            >
              <Button
                type="primary"
                size={collapsed ? 'small' : 'middle'}
                icon={<PlusOutlined />}
                style={{ width: collapsed ? 56 : '' }}
              >
                {!collapsed && 'Thêm'}
              </Button>
            </Tooltip>
          </Dropdown>
        </Flex>
        <Menu
          mode="vertical"
          style={{ height: '100%', borderRight: 0 }}
          items={siderMenu}
          onClick={(e) => {
            navigate(e.key);
          }}
        />
      </Flex>
    </Sider>
  );
};

export default Sidebar;
