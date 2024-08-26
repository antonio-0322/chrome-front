// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Card, Box, Button } from '@mui/material';
// components
import Page from '../../components/Page';
// assets
import SendImage from '../../assets/auth/send_image.svg';
// icons
import CachedIcon from '@mui/icons-material/Cached';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthApi } from '../../api/Auth/auth.services';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function EmailSended() {
  const navigate = useNavigate();
  const location = useLocation();
  const resendEmail = async () => {
    try {
      const response = await AuthApi.forgetPassword({
        email: location.state.email,
        email_type: location.state.email_type,
      });
      if (response.status === 204) {
        navigate('/auth/sended', {
          state: {
            email: location.state.email,
            email_type: location.state.email_type,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Page title='Account Activation'>
      <Container>
        <ContentStyle>
          <Card sx={{ p: 2.5 }} elevation={3}>
            <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h5' gutterBottom>
                  Email Sent
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {`We sent an email to ${location.state.email} with a link to verify
                  your account.`}
                </Typography>
              </Box>
            </Box>

            <Box mb={2}>
              <img src={SendImage} />
            </Box>
            <Button size='large' color='primary' onClick={() => resendEmail()}>
              <CachedIcon sx={{ mr: 1 }} />
              Resend Link
            </Button>
          </Card>
        </ContentStyle>
      </Container>
    </Page>
  );
}
