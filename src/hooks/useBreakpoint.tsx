import { useMediaQuery } from '@mantine/hooks';
import { BreakPoint } from '../constants/style';

export const useBreakpoint = (bp: BreakPoint) => {
  const isBreakpoint = useMediaQuery(`(max-width: ${bp})`);

  return isBreakpoint;
};

export const useThin = () => useBreakpoint(BreakPoint.Xs);
export const useMobile = () => useBreakpoint(BreakPoint.Sm);
export const useTablet = () => useBreakpoint(BreakPoint.Md);
export const useDesktop = () => useBreakpoint(BreakPoint.Lg);
export const useWide = () => useBreakpoint(BreakPoint.Xl);
