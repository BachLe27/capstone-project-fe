import palette from '@/theme/colors';
import { FileWordOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Flex } from 'antd';
import styled from 'styled-components';
import { Typography } from '..';

const HoverableFlex = styled(Flex)`
  width: 100%;
  background-color: ${palette.gray[10]};
  border-radius: 8px;
  padding: 16px;
  flex-direction: column;
  gap: 16px;
  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${palette.gray[20]};
  }
`;

const File = () => {
  return (
    <HoverableFlex
      style={{
        width: '100%',
        borderRadius: 8,
        padding: 16,
      }}
      vertical
      gap={16}
    >
      <Flex style={{ width: '100%' }} align="center" justify="space-between">
        <Flex gap={8}>
          <FileWordOutlined style={{ fontSize: 24 }} />
          <Typography variant="medium" fontWeight="medium">
            {' '}
            File name.docx{' '}
          </Typography>
        </Flex>
        <Button shape="circle" type="text" icon={<MoreOutlined />} />
      </Flex>

      <Flex
        style={{
          backgroundColor: palette.gray[30],
          height: 180,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Preview
      </Flex>

      <Flex gap={8} align="center">
        <Avatar size={36} />
        <Typography>Bạn đã tải lên</Typography>
        <Badge dot color={palette.gray[70]} />
        <Typography>22 Tháng 3, 2024</Typography>
      </Flex>
    </HoverableFlex>
  );
};

export default File;
