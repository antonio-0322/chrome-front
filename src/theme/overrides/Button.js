// ----------------------------------------------------------------------
export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 42,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.shadows[1],
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        // outlined
        outlinedInherit: {
          border: `1px solid #E0E0E0`,
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
      variants: [
        {
          props: { variant: 'white' },
          style: {
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: '#eceff4',
            },
            '&.Mui-disabled': {
              color: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
            },
          },
        },
        {
          props: { variant: 'gradient' },
          style: {
            background: theme.palette.gradients.primary,
            boxShadow: theme.shadows[1],
            color: 'white',
            '&:hover': {
              opacity: 0.8,
              boxShadow: theme.shadows[1],
            },
          },
        },
      ],
    },
  };
}
