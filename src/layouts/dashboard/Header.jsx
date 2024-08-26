import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Toolbar,
  IconButton,
  styled,
  AppBar,
  Button,
  Chip,
  MenuList,
  MenuItem,
  ListItemIcon,
  Avatar,
  useTheme,
  Link,
  Divider,
  Menu,
  Typography,
} from '@mui/material';
// icons
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../assets/logo/logo.svg';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
// path
import { PATH_DASHBOARD } from '../../routes/paths';
import { useAuthStore } from '../../zustand/auth.store';
import { Storage } from '../../storage';
import { useUserStore } from '../../zustand/user.store';
import { usePaymentStore } from '../../zustand/payment.store';
import { MobileSupportAlert } from '../../components/MobileSupportAlert';

// ----------------------------------------------------------------------

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0px 0px 0px 1px #E0E0E0',
  zIndex: theme.zIndex.drawer + 1,
}));

const MuiToolBar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    paddingLeft: 20,
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  trigger: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function Header({ trigger, open, userData }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const {plans} = usePaymentStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Storage.clear();
    useAuthStore.setState({ userState: 'not-auth' });
    useAuthStore.setState({ userData: null });
  };

  const nextPlanIndex = userData?.active_subscription
    ? plans?.indexOf(plans?.find(item => item.id === userData?.active_subscription?.plan)) + 1
    : plans?.indexOf(plans?.find(item => item.id === userData?.last_used_subscription?.plan)) + 1;

  return (
    <MuiAppBar position='fixed' open={open} elevation={0}>
      <MuiToolBar
        sx={{
          pl: 1,
        }}
      >
        <IconButton
          size='large'
          aria-label='open drawer'
          onClick={trigger}
          edge='start'
          sx={{
            marginRight: 5,
            color: 'text.primary',
          }}
        >
          <MenuIcon />
        </IconButton>
        <Button onClick={() => navigate(PATH_DASHBOARD.general)}>
          <img src={Logo} alt='Auto Submit logo' width={165} />
        </Button>
          <Link to={PATH_DASHBOARD.pricing} component={RouterLink}>
            <Button variant='outlined' color='inherit' sx={{ ml: 4 }}>
              {
                !plans[nextPlanIndex] ?
                  "Pricing Plans" : "Pricing Plan: Upgrade to"
              }
              {
                plans[nextPlanIndex] &&
                <Chip
                  label={plans[nextPlanIndex]?.name.toUpperCase()}
                  size='small'
                  sx={{
                    ml: 1,
                    background: theme.palette.gradients.primary,
                    color: 'white',
                  }}
                />
              }
            </Button>
          </Link>

        <MenuList sx={{ display: 'flex', ml: 'auto' }}>
          <MenuItem
            sx={{
              ml: 1,
              mr: 1,
              textTransform: 'uppercase',
              color: 'primary.main',
            }}
          >
            FAQ
          </MenuItem>
        </MenuList>
        <Avatar
          sx={{ bgcolor: '#06186E', borderRadius: 1.5, fontSize: 14 }}
          variant='square'
          onClick={handleClick}
        >
          {userData?.first_name[0]}
          {userData?.last_name[0]}
        </Avatar>
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={menuOpen}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1,
              width: '320px',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar
              sx={{ bgcolor: '#06186E', borderRadius: 1.5, fontSize: 14 }}
              variant='square'
              onClick={handleClick}
            >
              {userData?.first_name[0]}
              {userData?.last_name[0]}
            </Avatar>{' '}
            <Typography variant='h6' color={'text.primary'} pl={1.5} noWrap>
              {userData?.first_name} {userData?.last_name}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              setTimeout(() => {
                navigate(PATH_DASHBOARD.profile);
              }, 0);
            }}
          >
            <ListItemIcon sx={{ pr: 3 }}>
              <SettingsIcon />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ pr: 3 }}>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </MuiToolBar>
      <MobileSupportAlert />
    </MuiAppBar>
  );
}
