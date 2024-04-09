import { Loader, Tooltip, createTheme } from '@mantine/core';
import { RingLoader } from './components/loader/RingLoader';
import { BreakPoint } from './constants/style';

export const theme = createTheme({
  fontFamily: 'Roboto',
  headings: {
    fontFamily: 'Share Tech',
  },
  defaultRadius: 'md',
  components: {
    ThemeIcon: {
      styles: {
        default: {
          border: 'none',
        },
      },
    },
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        color: 'dark.8',
      },
    }),
  },
  breakpoints: {
    xs: BreakPoint.Xs,
    sm: BreakPoint.Sm,
    md: BreakPoint.Md,
    lg: BreakPoint.Lg,
    xl: BreakPoint.Xl,
  },
  /* Put your mantine theme override here */
});
