module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '22em',
        'mantine-breakpoint-sm': '32em',
        'mantine-breakpoint-md': '58em',
        'mantine-breakpoint-lg': '78em',
        'mantine-breakpoint-xl': '94em',
      },
    },
  },
};
