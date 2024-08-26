import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Button, Typography, Stack, Box } from '@mui/material';
// icons
import { ReactComponent as GoogleIcon } from '../../assets/icons/ic_google.svg';
import {Storage} from '../../storage';
import { getGoogleUrl } from './auth0.config';

AuthWithSocial.propTypes = {
  label: PropTypes.string,
};

export default function AuthWithSocial({ label, loading }) {
  const { pathname } = useLocation();
  const googleLogIn = () => {
    Storage.setItem("googleLoginFrom", pathname, false)
    window.location.replace(getGoogleUrl());
  };

  return (
    <>
      <Stack sx={{ my: 1.5 }}>
        <Typography variant='overline' align='center' color={'text.secondary'}>
          OR
        </Typography>
      </Stack>
      <Button
        variant='outlined'
        color='inherit'
        size='large'
        disabled={loading}
        onClick={() => googleLogIn()}
        fullWidth
      >
        <Box sx={{ mr: 1 }} alignItems={'center'} display={'flex'}>
          <GoogleIcon />
        </Box>
        {label || 'Sign In with Google'}
      </Button>
    </>
  );
}
