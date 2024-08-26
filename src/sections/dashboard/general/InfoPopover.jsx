import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Box, Typography, Button, Paper, Backdrop, Slide } from '@mui/material';
// images
import UpgradeImg from '../../../assets/dashboard/general/upgrade_img.svg';
import WelcomeImg from '../../../assets/dashboard/general/purple_bot.png';
// components
import { PointInfo } from '../../../components';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { VITE_EXTENSION_URL } from '../../../utils/variablesFromEnv';

// ----------------------------------------------------------------------

SubscriptionPopover.propTypes = {
  onClick: PropTypes.func,
  state: PropTypes.bool,
  status: PropTypes.number,
};

SubscriptionPopover.defaultProps = {
  status: 1,
};

// ----------------------------------------------------------------------

const styles = {
  minWidth: '40px',
  minHeight: '40px',
  borderRadius: 1,
  position: 'absolute',
  top: '50%',
  left: -12,
  transform: 'translateY(-50%)',
  /* before and after pseudo classes */
  '&:before,&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
  /* after pseudo class */
  '&:after': {
    borderBottomLeftRadius: 6,
    borderWidth: '30px',
    borderLeftColor: 'white',
    borderBottomColor: 'white',
    transform: 'rotate(45deg)',
  },
};

// ----------------------------------------------------------------------

const INFO_POINTS = [
  {
    text: 'Unlimited access to all features: This includes the ability to automate your job applications, track your progress, and get help from our support team.',
  },
  {
    text: "Priority support: If you have any questions or problems, you'll get priority support from our team.",
  },
  {
    text: 'Paid plans give you access to advanced features that can help you land your dream job faster.',
  },
];

// ----------------------------------------------------------------------

export function SubscriptionPopover({
  state,
  setState,
  status,
  planName,
  cancelTimeout,
}) {
  const navigate = useNavigate();

  const STATUS = {
    1: {
      title: 'Your Free Subscription to AutoSubmit is Ending Soon!',
      button: 'Upgrade Plan',
    },
    2: {
      title: 'Your Free Subscription to AutoSubmit is ended!',
      button: 'Upgrade Plan',
    },
    3: {
      title: `Your ${planName?.name} Plan to AutoSubmit is ended!`,
      button: 'Renew or Upgrade Plan ',
    },
    4: {
      title: `Your ${planName?.name} Plan to AutoSubmit is Ending Soon!`,
      button: 'Renew or Upgrade Plan ',
    },
    5: {
      title: `You have already exceeded daily job submissions limit for ${planName?.name} Plan!`,
      button: 'Renew or Upgrade Plan ',
    },
  };

  const handleButtonClick = () => {
    setState(false);
    navigate(PATH_DASHBOARD.pricing);
  };

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      open={state}
      onClick={() => {
        setState(false);
        cancelTimeout();
      }}
    >
      <Slide
        direction='left'
        timeout={1000}
        in={state}
        mountOnEnter
        unmountOnExit
        style={{ transitionDelay: state ? '100ms' : '0ms' }}
      >
        <Paper
          elevation={4}
          sx={{
            py: 4,
            px: 3,
            mr: 4,
            width: '440px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Box sx={styles} />
          <Box>
            <Typography variant='h5' sx={{ color: 'text.primary' }} mb={2}>
              {STATUS[status]?.title}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              textTransform={'uppercase'}
              letterSpacing={'1px'}
            >
              {
                "Don't miss out on all the benefits by upgrading your plan today."
              }
            </Typography>
            <Box
              sx={{
                mb: { xl: 8, lg: 2, md: 1 },
                mt: { xl: 3.5, lg: 1, md: 1 },
              }}
            >
              {INFO_POINTS.map((item) => (
                <PointInfo
                  key={item.text}
                  size={10}
                  mb={1}
                  text={item.text}
                  textAlign={'left'}
                  color={'text.primary'}
                />
              ))}
            </Box>

            <img src={UpgradeImg} width={100} alt={'Upgrade image'} />

            <Typography
              variant='body2'
              sx={{
                color: 'text.secondary',
                mt: { xl: 4, lg: 2, md: 1 },
                mb: { xl: 3, lg: 2, md: 1 },
              }}
            >
              Upgrade to a paid plan today and start enjoying all the benefits
              of Autosubmit AI!
            </Typography>

            <Button
              variant='gradient'
              color='primary'
              size='large'
              elevation={1}
              onClick={handleButtonClick}
              sx={{ ml: 'auto' }}
              fullWidth
            >
              {STATUS[status]?.button}
            </Button>
          </Box>
        </Paper>
      </Slide>
    </Backdrop>
  );
}

// ----------------------------------------------------------------------

WelcomePopover.propTypes = {
  onClick: PropTypes.func,
  state: PropTypes.bool,
};

// ----------------------------------------------------------------------

export function WelcomePopover({ onClick, state, title }) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      open={state}
    >
      <Slide
        direction='left'
        in={state}
        timeout={1000}
        mountOnEnter
        unmountOnExit
        style={{ transitionDelay: state ? '100ms' : '0ms' }}
      >
        <Paper
          elevation={4}
          sx={{
            py: 4,
            px: 3,
            mr: 4,
            width: '440px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Box sx={styles} />
          <Box>
            <Typography variant='h5' sx={{ color: 'text.primary' }} mb={2}>
              {title === 'welcome'
                ? `Welcome to Auto Submit.`
                : `Chrome Extension Needed`}
            </Typography>
            <Typography
              component={'p'}
              variant='caption'
              color='text.secondary'
              textTransform={'uppercase'}
              letterSpacing={'1px'}
              mb={4}
            >
              {
                'Start automating your job applications with our Chrome extension.'
              }
            </Typography>

            <img src={WelcomeImg} width={229} />

            <Typography
              variant='body2'
              sx={{ color: 'text.secondary' }}
              mt={4}
              mb={3}
            >
              {
                "Autosubmit will not work without the Chrome extension. But don't worry, it's super easy to download. Just click the button below"
              }
            </Typography>
              <a href={VITE_EXTENSION_URL} target="_blank" rel="noreferrer" >
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  elevation={1}
                  onClick={onClick}
                  sx={{ ml: 'auto' }}
                  fullWidth
                >
                  Download now
                </Button>
              </a>
          </Box>
        </Paper>
      </Slide>
    </Backdrop>
  );
}
