import { createTheme, MantineTheme } from '@mantine/core';

export const theme = createTheme({
  defaultRadius: 'md',
  components: {
    Paper: {
      styles: (theme: MantineTheme) => {
        return {
          root: {
            backgroundColor: theme.colors.dark[6],
          },
        };
      },
    },
  },
  /* Put your mantine theme override here */
});
