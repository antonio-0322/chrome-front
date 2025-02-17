// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          '.MuiTableSortLabel-icon': {
            opacity: 1,
          },
        },
        head: {
          fontWeight: 500,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.neutral,
          '&:first-of-type': {
            paddingLeft: theme.spacing(2),
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(2),
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        body: {
          '&:first-of-type': {
            paddingLeft: theme.spacing(2),
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(2),
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
