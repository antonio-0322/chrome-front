// ----------------------------------------------------------------------

import { alpha } from '@mui/material/styles';

export default function CssBaseline(theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
        '::-webkit-scrollbar': {
          width: 6,
          height: 6,
          backgroundColor: 'transparent',
          borderRadius: 4,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.4),
          borderRadius: 4,
        },
        '::-webkit-scrollbar-track': {
          visibility: 'hidden',
          borderRadius: 4,
          opacity: 0,
        },
        '*': {
          scrollbarColor: `${alpha(
            theme.palette.primary.main,
            0.4,
          )} transparent`,
          scrollbarWidth: 'thin',
        },
      },
    },
  };
}
