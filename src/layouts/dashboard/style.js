// @mui
import { Drawer, ListItemButton, styled } from '@mui/material';

// ----------------------------------------------------------------------

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const closedMixinButton = (theme) => ({
  width: 48,
  paddingLeft: 12,
  paddingRight: 12,
  justifyContent: 'center',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 8,
  borderRadius: 100,
});

const openedMixinButton = (theme) => ({
  width: 'calc(100% - 16px)',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  paddingLeft: 20,
  borderRadius: '0px 12px 12px 0px',
});

export const MuiListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: 'calc(100% - 16px)',
  minHeight: 48,
  ...(open && {
    ...openedMixinButton(theme),
    '& .MuiButtonBase-root': openedMixinButton(theme),
  }),
  ...(!open && {
    ...closedMixinButton(theme),
    '& .MuiButtonBase-root': closedMixinButton(theme),
  }),
  '&.Mui-selected': {
    backgroundColor: '#D0E4FC',

    '.MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '.MuiListItemText-root': {
      color: theme.palette.primary.main,
    },
  },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
