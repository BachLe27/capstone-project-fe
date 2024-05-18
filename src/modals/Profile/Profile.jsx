import { Avatar, Button, Divider, Flex, Modal, Tag } from 'antd';
import { ApartmentOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Typography } from '../../components';
import { UpdateProfile } from '..';

const Profile = ({ isModalOpen, handleCancel }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Modal
      footer={null}
      onCancel={handleCancel}
      title={
        <Typography variant="large" fontWeight="semi-bold">
          Thông tin cá nhân
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
        <Button
          onClick={() => {
            handleOpenEditModal();
          }}
        >
          Sửa thông tin cá nhân
        </Button>
      </Flex>
      <UpdateProfile isModalOpen={isEditModalOpen} handleCancel={handleClose} />
    </Modal>
  );
};

export default Profile;
