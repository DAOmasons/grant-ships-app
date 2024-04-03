import { useMediaQuery } from '@mantine/hooks';
import { BreakPoint } from '../constants/style';

export const useBreakpoint = (bp: BreakPoint) =>
  useMediaQuery(
    `(${bp === BreakPoint.UpperRange ? 'min-width' : 'max-width'}: ${bp})`
  );

export const useThin = () => useBreakpoint(BreakPoint.Xs);
export const useMobile = () => useBreakpoint(BreakPoint.Sm);
export const useTablet = () => useBreakpoint(BreakPoint.Md);
export const useLaptop = () => useBreakpoint(BreakPoint.Lg);
export const useDesktop = () => useBreakpoint(BreakPoint.UpperRange);

export const useBreakpoints = () => {
  const isThin = useThin();
  const isMobile = useMobile();
  const isTablet = useTablet();
  const isLaptop = useLaptop();
  const isDesktop = useDesktop();

  return {
    isThin: isThin,
    isMobile: isMobile && !isThin,
    isTablet: isTablet && !isMobile,
    isLaptop: isLaptop && !isTablet,
    isDesktop,
  };
};
