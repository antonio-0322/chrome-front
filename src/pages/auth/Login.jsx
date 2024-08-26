import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Box, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { LoginForm } from '../../sections/auth/login';
import AuthWithSocial from '../../sections/auth/AuthWithSocial';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <Page title='Login'>
      <RootStyle>
        <Container>
          <ContentStyle>
            <Card sx={{ p: 2.5 }} elevation={3}>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='h5' gutterBottom>
                    Sign In
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Welcome back
                  </Typography>
                </Box>
              </Box>

              <LoginForm setLoading={setLoading} />

              <AuthWithSocial loading={loading} />

              <Typography variant='body1' sx={{ mt: 2.5, textAlign: 'center' }}>
                Don’t have an account?{' '}
                <Link
                  variant='body1'
                  to={PATH_AUTH.register}
                  component={RouterLink}
                >
                  Sign Up
                </Link>
              </Typography>
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
