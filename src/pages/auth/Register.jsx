import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Box, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { RegisterForm } from '../../sections/auth/register';
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

// ----------------------------------------------------------------------

export default function Register() {
  const [loading, setLoading] = useState(false);

  return (
    <Page title='Register'>
      <RootStyle>
        <Container>
          <ContentStyle>
            <Card sx={{ p: 2.5 }} elevation={3}>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='h5' gutterBottom>
                    Sign Up
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Get started for free
                  </Typography>
                </Box>
              </Box>

              <RegisterForm setLoading={setLoading} />

              <AuthWithSocial loading={loading} />

              <Typography variant='body1' sx={{ mt: 2.5, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link
                  variant='body1'
                  to={PATH_AUTH.login}
                  component={RouterLink}
                >
                  Sign In
                </Link>
              </Typography>
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
