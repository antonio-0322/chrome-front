import { Outlet, useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Stack,
  Link,
  useTheme,
  Typography,
} from '@mui/material';
// assets
import Logo from '../../assets/logo/logo.svg';
// animations
import { motion } from 'framer-motion';
// configs
import { pageTransition, pageVariants } from '../../config/outletAnimations';
// paths
import { PATH_PAGE } from '../../routes/paths';
import { MobileSupportAlert } from '../../components/MobileSupportAlert';
import NavItems from '../../components/NavItems';

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  padding: theme.spacing(1, 0, 1),
  backgroundColor: 'white',
  boxShadow: theme.shadows[1],
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 0, 1),
  },
  marginBottom: '30px',
}));

const LogoStyle = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 150,
  },
}));

const FooterStyle = styled('footer')(({ theme, margin }) => ({
  padding: theme.spacing(2, 0, 2),
  backgroundColor: 'rgba(37, 90, 232, 0.04)',
  marginTop: margin,
  zIndex: "30"
}));

export default function AuthLayout() {
  const { pathname } = useLocation();
  const theme = useTheme();

  return (
    <>
      <Stack justifyContent={'space-between'} height={'100%'}>
        <HeaderStyle>
          <Container>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Link to='/' component={RouterLink}>
                <LogoStyle src={Logo} alt='Auto Submit logo' />
              </Link>
              <NavItems />
            </Stack>
            <MobileSupportAlert />
          </Container>
        </HeaderStyle>
        <motion.div
          key={pathname}
          initial='initial'
          animate='in'
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
        <FooterStyle
          margin={pathname === '/pricing' ? 'auto' : ''}
        >
          <Container>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography
                textTransform={'uppercase'}
                variant='caption'
                color={theme.palette.grey[700]}
              >
                <Link
                  component={RouterLink}
                  to={PATH_PAGE.policies}
                  target='_blank'
                  sx={{ mr: 2, ml: 0.5 }}
                >
                  Privacy Policy
                </Link>
                {'  '}© 2023 - All rights reserved Autosubmit
              </Typography>
              <Typography
                textTransform={'uppercase'}
                variant='caption'
                color={theme.palette.grey[700]}
              >
                Powered by{' '}
                <Link
                  component={RouterLink}
                  to={'https://st-dev.com'}
                  target='_blank'
                >
                  stdev
                </Link>
              </Typography>
            </Stack>
          </Container>
        </FooterStyle>
      </Stack>
    </>
  );
}
