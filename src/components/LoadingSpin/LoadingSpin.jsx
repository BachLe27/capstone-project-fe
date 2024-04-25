import { Spin } from 'antd';

const LoadingSpin = ({
  size = 'large'
}) => {
  return (
    <Spin size={size}></Spin>
  );
};

export default LoadingSpin;