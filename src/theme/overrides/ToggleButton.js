// ----------------------------------------------------------------------

export default function ToggleButton(theme) {
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeMedium: {
          height: 40,
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
  };
}
