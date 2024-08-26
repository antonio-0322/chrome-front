// @mui
import { styled } from '@mui/material/styles';
import { Card, Box, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';

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

export default function ResetPassword() {
  return (
    <Page title='ResetPassword'>
      <RootStyle>
        <Container>
          <ContentStyle>

              <ResetPasswordForm />
                        
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
