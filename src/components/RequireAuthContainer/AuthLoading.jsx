import { Flex, Spin, Typography } from 'antd';
import { LazyLoading } from '../SuspenseContainer/SuspenseContainer';

function AuthLoading() {
	return (
		<LazyLoading>
			<Flex
				align="center"
				justify="center"
				style={{ width: '100vw', height: '100vh' }}
			>
				<Spin tip="Loading..." size="large">
					<Typography style={{ marginRight: 72 }} />
				</Spin>
			</Flex>
		</LazyLoading>
	);
}

export default AuthLoading;
