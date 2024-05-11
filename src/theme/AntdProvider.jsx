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
          fontSize: 16,
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
            paddingBlock: 19,
            contentFontSize: 16,
            contentLineHeight: 0,
            paddingInline: 16,
          },
          Layout: {
            headerBg: 'rgb(255, 255, 255)',
            algorithm: true,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
