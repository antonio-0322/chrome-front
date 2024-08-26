import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthApi } from '../../api/Auth/auth.services';
// @mui
import {
  Container,
  Card,
  Box,
  Typography,
  Button,
  styled,
  Avatar,
  useTheme,
  CircularProgress,
} from '@mui/material';
// components
import { Page } from '../../components';
// icons
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import CachedIcon from '@mui/icons-material/Cached';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme, large }) => ({
  maxWidth: large ? 460 : 400,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function EmailVerification(sendRequest = true) {
  const theme = useTheme();
  const location = useLocation();
  const [success, setSuccess] = useState(true);
  const [verified, setVerified] = useState(false);
  const [emailIssue, setEmailIssue] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let params = new URLSearchParams(window.location.search);
  let code = params.get('code');
  let email = location.search.split('&')[0].split('=')[1];

  const resendEmail = async () => {
    try {
      const response = await AuthApi.forgetPassword({
        email: encodeURIComponent(email),
        email_type: 'activate_account',
      });
      if (response.status === 204) {
        navigate('/auth/sended', {
          state: {
            email: email,
            email_type: 'activate_account',
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function sendCallback() {
      setLoading(true);
      try {
        const response = await AuthApi.activateUser({
          code: code,
          email: email,
        });
        if (response.status === 204) {
          Storage.setItem('accessToken', response.data.access);
          Storage.setItem('refreshToken', response.data.refresh);
          Storage.setItem('loginWithAuth0', true);
          setSuccess(true);
        }
      } catch (e) {
        if (e.response.data.detail === 'This user is already active.') {
          setVerified(false);
          setSuccess(true);
        }
        if (
          e.response.data.detail.includes(
            'There was an error verifying your email address.',
          )
        ) {
          setEmailIssue(true);
          setSuccess(false);
        }
        if (
          e.response.status !== 204 &&
          e.response.data.detail !== 'This user is already active.'
        ) {
          setSuccess(false);
        }
      } finally {
        setLoading(false);
      }
    }
    sendRequest && code !== '' && email !== '' && sendCallback();
  }, [code, email]);

  return (
    <Page title='ForgotPassword'>
      {!!loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <RootStyle>
          <Container>
            <ContentStyle large={!success}>
              <Card sx={{ p: 2.5 }} elevation={3}>
                <Box
                  pr={2}
                  sx={{ mb: 3.5, display: 'flex', alignItems: 'center' }}
                  justifyContent={'space-between'}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      maxWidth: verified ? 270 : success ? 200 : 350,
                    }}
                  >
                    <Typography variant='h5' gutterBottom>
                      {success
                        ? verified
                          ? 'Already Verified'
                          : 'Thank You'
                        : emailIssue
                        ? 'Verification Error'
                        : 'Link Expired'}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary' }}
                    >
                      {success
                        ? verified
                          ? 'The account has already been activated, please login to start using AutoSubmit'
                          : `You are successfully verified. Please Log In to continue.`
                        : emailIssue
                        ? 'There was an error verifying your email address. Please request a new link.'
                        : `The verify link sent to ${email} is expired or invalid.`}
                    </Typography>
                  </Box>
                  {!verified && (
                    <Avatar
                      sx={{
                        width: 54,
                        height: 54,
                        bgcolor: success
                          ? theme.palette.success.a200
                          : theme.palette.error[100],
                      }}
                    >
                      {success ? (
                        <CheckIcon
                          sx={{
                            color: theme.palette.success[900],
                          }}
                        />
                      ) : (
                        <PriorityHighIcon
                          sx={{
                            color: theme.palette.error.main,
                          }}
                        />
                      )}
                    </Avatar>
                  )}
                </Box>

                {success ? (
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={() => navigate('/auth/login')}
                    fullWidth
                  >
                    Sign in
                  </Button>
                ) : (
                  <Button
                    size='medium'
                    color='primary'
                    onClick={() => resendEmail()}
                  >
                    <CachedIcon sx={{ mr: 1 }} />
                    Resend Link
                  </Button>
                )}
              </Card>
            </ContentStyle>
          </Container>
        </RootStyle>
      )}
    </Page>
  );
}
