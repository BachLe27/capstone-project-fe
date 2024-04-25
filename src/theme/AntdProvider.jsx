import { ConfigProvider } from 'antd';
import './global.css';

const AntdProvider = ({ children }) => {

	return (
		<ConfigProvider theme={{
			token: {
				'colorPrimary': '#0a68ff',
				'fontFamily': 'Inter',
				'colorInfo': '#0a68ff',
				'fontSize': 16,
				'borderRadius': 4,
			},
			components: {
				'Input': {
					'paddingInline': 16,
					'paddingBlock': 8,
					'lineHeight': 1.5,
					'fontSizeIcon': 16
				},
				'Button': {
					'paddingBlock': 19,
					'contentFontSize': 16,
					'contentLineHeight': 0,
					'paddingInline': 16
				},
				'Layout': {
					'headerBg': 'rgb(255, 255, 255)',
					'algorithm': true
				}
			}
		}
		}>
			{children}
		</ConfigProvider >
	);
};

export default AntdProvider;