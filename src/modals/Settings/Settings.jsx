import { Avatar, Button, Divider, Flex, Modal, Tag } from 'antd';
import { ApartmentOutlined, UserOutlined } from '@ant-design/icons';
import { Typography } from '../../components';

const Settings = ({ isModalOpen, handleCancel }) => {
  return (
    <Modal
      footer={null}
      onCancel={handleCancel}
      title={
        <Typography variant="large" fontWeight="semi-bold">
          Thông tin tài khoản
          <Divider />
        </Typography>
      }
      open={isModalOpen}
    >
      <Flex align="center" vertical gap={8} style={{ paddingBottom: 8 }}>
        <Avatar size={80} icon={<UserOutlined />} />
        <Tag style={{ padding: '4px 12px', borderRadius: '16px' }} color="red">
          Admin
        </Tag>
        <Flex gap={8}>
          <ApartmentOutlined />
          <Typography variant="medium" fontWeight="bold">
            FPT Organization
          </Typography>
        </Flex>
        <Typography variant="3x" fontWeight="medium">
          Lê Công Bách
        </Typography>
        <Typography variant="medium">admin@gmail.com</Typography>
      </Flex>
    </Modal>
  );
};

export default Settings;
