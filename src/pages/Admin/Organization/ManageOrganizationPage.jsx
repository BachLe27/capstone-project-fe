import palette from '@/theme/colors';
import { Flex } from 'antd';

const ManageOrganization = () => {
  return (
    <Flex style={{ height: '100%' }} vertical gap={24}>
      <Flex
        style={{
          height: '100%',
          backgroundColor: palette.gray.white,
          padding: '28px 32px',
          borderRadius: 8,
        }}
      >
        Quản lý tổ chức
      </Flex>
    </Flex>
  );
};

export default ManageOrganization;
