import { Typography as AntdTypography } from 'antd';
import PropTypes from 'prop-types';

const typographyStyles = {
  'x-small': {
    fontSize: '10px',
  },
  small: {
    fontSize: '12px',
  },
  base: {
    fontSize: '14px',
  },
  medium: {
    fontSize: '16px',
  },
  large: {
    fontSize: '18px',
  },
  x: {
    fontSize: '20px',
  },
  '2x': {
    fontSize: '24px',
  },
  '3x': {
    fontSize: '28px',
  },
  '4x': {
    fontSize: '32px',
  },
  '5x': {
    fontSize: '48px',
  },
};

const fontWeights = {
  bold: 700,
  'semi-bold': 600,
  medium: 500,
  regular: 400,
};

const Typography = ({
  variant = 'x-small',
  children,
  color,
  style,
  fontWeight,
}) => {
  return (
    <AntdTypography
      style={{
        ...typographyStyles[variant],
        fontWeight: fontWeights[fontWeight],
        color,
        ...style,
      }}
    >
      {children}
    </AntdTypography>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'x-small',
    'small',
    'base',
    'medium',
    'large',
    'x',
    '2x',
    '3x',
    '4x',
    '5x',
  ]),
  fontWeight: PropTypes.oneOf(['bold', 'semi-bold', 'medium', 'regular']),
  children: PropTypes.node.isRequired,
};

Typography.defaultProps = {
  variant: 'base',
  fontWeight: 'regular',
};

export default Typography;
