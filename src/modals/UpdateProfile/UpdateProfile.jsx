import {
  ApartmentOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Tag,
  Tooltip,
} from 'antd';
import { Typography } from '../../components';

const Profile = ({ isModalOpen, handleCancel }) => {
  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <Modal
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Huỷ
        </Button>,
        <Button
          type="primary"
          form="updateProfileForm"
          key="submit"
          htmlType="submit"
        >
          Lưu
        </Button>,
      ]}
      onCancel={handleCancel}
      title={
        <Typography variant="large" fontWeight="semi-bold">
          Sửa thông tin cá nhân
          <Divider />
        </Typography>
      }
      open={isModalOpen}
    >
      <Flex
        align="center"
        vertical
        gap={8}
        style={{ paddingBottom: 8, paddingLeft: 16, paddingRight: 16 }}
      >
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
        <Typography variant="medium">admin@gmail.com</Typography>

        <Form
          name="updateProfileForm"
          onFinish={handleSubmit}
          layout="vertical"
          style={{ width: '100%' }}
          initialValues={{
            displayName: 'Bach Le',
          }}
        >
          <Form.Item
            name="displayName"
            label="Tên hiển thị"
            rules={[
              { required: true, message: 'Vui lòng nhập tài khoản của bạn' },
            ]}
          >
            <Input
              placeholder="Tên hiển thị"
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="rePassword"
            label="Nhập lại mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  );
};

export default Profile;
