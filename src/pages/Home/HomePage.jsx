import { Typography } from '@/components';
import palette from '@/theme/colors';
import { Flex } from 'antd';

const HomePage = () => {
  return (
    <Flex
      style={{
        height: '100%',
        backgroundColor: palette.gray.white,
        borderRadius: 8,
      }}
    >
      <Typography>Home page</Typography>
    </Flex>
  );
};

export default HomePage;
