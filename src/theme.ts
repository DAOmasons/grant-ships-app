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
  colors: {
    dark: [
      '#D9D9D9',
      '#CCCCCC',
      '#BFBFBF',
      '#B3B3B3',
      '#404040',
      '#262626',
      '#191919',
      '#0D0D0D',
      '#000002',
      '#000000',
    ],
    blue: [
      '#e8f1ff',
      '#d2e0fd',
      '#a2bdf8',
      '#6f98f4',
      '#4579f1',
      '#2d66f0',
      '#205cf2',
      '#144cd7',
      '#0944c1',
      '#003aaa',
    ],
  },
  /* Put your mantine theme override here */
});
