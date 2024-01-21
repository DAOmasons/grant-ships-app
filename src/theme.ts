import { MantineStyleProp, MantineTheme, createTheme } from '@mantine/core';

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
  },

  /* Put your mantine theme override here */
});
