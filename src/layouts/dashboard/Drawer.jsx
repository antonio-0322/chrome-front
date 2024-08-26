import { PropTypes } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  List,
  Link,
  Box,
  Divider,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
// icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
// path
import { PATH_DASHBOARD } from '../../routes/paths';
// override styles
import { MuiDrawer, MuiListItemButton, DrawerHeader } from './style';
import { useAuthStore } from '../../zustand/auth.store';
// assets
import ContactIcon from '../../assets/dashboard/contact_icon.png';

// ----------------------------------------------------------------------

Sidebar.propTypes = {
  trigger: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

const SIDEBAR_MENU = [
  {
    label: 'Home',
    href: PATH_DASHBOARD.general,
    icon: <HomeRoundedIcon />,
  },
  {
    needToSetupResume: true,
    label: 'Application Manager',
    href: PATH_DASHBOARD.editResume,
    icon: <BadgeRoundedIcon />,
  },
  {
    label: 'Applied Jobs',
    href: PATH_DASHBOARD.appliedJobs,
    icon: <WorkHistoryRoundedIcon />,
  },
];

export default function Sidebar({ trigger, open }) {
  const { userData } = useAuthStore();

  const theme = useTheme();
  return (
    <MuiDrawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton onClick={trigger}>
          <ChevronLeftRoundedIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {SIDEBAR_MENU.map(
          (item, index) =>
            (!item.needToSetupResume || !!userData?.resumes?.length) && (
              <ListItem
                key={item.label + index}
                disablePadding
                sx={{ display: 'block' }}
              >
                <Link
                  to={item.href}
                  component={RouterLink}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  <MuiListItemButton
                    open={open}
                    selected={item.href === location.pathname}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        transition: 'all 0.2s',
                        paddingLeft: open ? 2 : 0,
                        opacity: open ? 1 : 0,
                        color: theme.palette.text.primary,
                      }}
                    />
                  </MuiListItemButton>
                </Link>
              </ListItem>
            ),
        )}
      </List>

      {open && (
        <Box sx={{ mt: 'auto' }} textAlign={'center'} pb={5}>
          <Divider />
          <Box p={1 / 2} mt={1}>
            <img src={ContactIcon} alt='Contact image' />
          </Box>
          <Typography
            variant='overline'
            color='text.secondary'
            display={'block'}
          >
            Contact Us
          </Typography>
          <Link
            href='mailto:contact@autosubmit.ai'
            sx={{
              display: 'inline-block',
              color: theme.palette.text.primary,
              textDecorationColor: theme.palette.text.primary,
            }}
          >
            <Typography variant='body2'>contact@autosubmit.ai</Typography>
          </Link>
        </Box>
      )}
    </MuiDrawer>
  );
}
