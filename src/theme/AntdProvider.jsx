import { ConfigProvider } from 'antd';
import './global.css';
import palette from './colors';

const AntdProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: palette.ultramarine[70],
          fontFamily: 'Inter',
          colorInfo: palette.ultramarine[70],
          borderRadius: 8,
        },
        components: {
          Input: {
            paddingInline: 16,
            paddingBlock: 8,
            lineHeight: 1.5,
            fontSizeIcon: 16,
          },
          Button: {
            paddingBlock: 0,
            controlHeight: 40,
            controlHeightSM: 32,
          },
          Layout: {
            headerBg: palette.gray.white,
            algorithm: true,
          },
          Menu: {
            iconSize: 20,
          },
          Dropdown: {
            paddingBlock: 8,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
