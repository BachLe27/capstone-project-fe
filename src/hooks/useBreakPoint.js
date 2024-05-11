import { Grid } from 'antd';

const { useBreakpoint: useBreakpointAntd } = Grid;

export const useBreakpoint = () => {
  return useBreakpointAntd();
};
