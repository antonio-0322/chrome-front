import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Box, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { ForgotPasswordForm } from '../../sections/auth/forgot-password';
// assets
import SendImage from '../../assets/auth/send_image.svg';

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

export default function ForgotPassword() {
  const [successView] = useState(false);

  return (
    <Page title="ForgotPassword">
      <RootStyle>
        <Container>
          <ContentStyle>
            <Card sx={{ p: 2.5 }} elevation={3}>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {!successView ? 'Forgot Password' : 'Email Sent'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {!successView
                      ? 'Enter your email, to send you password reset link'
                      : 'We sent an email to johndoe@example.org with a link to reset your password.'}
                  </Typography>
                </Box>
              </Box>

              {!successView ? <ForgotPasswordForm /> : <img src={SendImage} />}
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
