import { File, Typography } from '@/components';
import { Col, Flex, Row } from 'antd';

const RecentFile = () => {
  return (
    <Flex style={{ width: '100%' }} vertical gap={24}>
      <Typography variant="x" fontWeight="medium">
        Các tệp gần đây
      </Typography>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12} xl={8} xxl={6}>
          <File />
        </Col>
        <Col xs={24} lg={12} xl={8} xxl={6}>
          <File />
        </Col>
        <Col xs={24} lg={12} xl={8} xxl={6}>
          <File />
        </Col>

        <Col xs={24} lg={12} xl={8} xxl={6}>
          <File />
        </Col>
        <Col xs={24} lg={12} xl={8} xxl={6}>
          <File />
        </Col>
        <Col xs={24} lg={12} xl={8} xxl={6}>
          <File />
        </Col>
        <Col xs={24} sm={12} lg={8} xxl={6}>
          <File />
        </Col>
      </Row>
    </Flex>
  );
};

export default RecentFile;
