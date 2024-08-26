import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Container,
  Card,
  Box,
  Typography,
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
import { useQuery } from 'react-query';
import { AuthApi } from '../../api/Auth/auth.services';
import { Storage } from '../../storage';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme, large }) => ({
  maxWidth: large ? 520 : 460,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

let attempts = 0;

export default function PaymentStatus() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [success, setSuccess] = useState(false);

  const { refetch: fetchUserData } = useQuery(
    'get-user-data',
    AuthApi.retrieveUserData,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (succeedData) => {
        attempts++;
        attempts === 3
          ? (setStatus('finished'),
            setTimeout(() => {
              Storage.removeItem('old-subscription-id');
              navigate('/dashboard/general');
            }, 7000))
          : (Storage.getItem('old-subscription-id') === 'none' &&
              !succeedData?.data.active_subscription) ||
            Storage.getItem('old-subscription-id') * 1 ===
              succeedData?.data.active_subscription?.id
          ? setTimeout(() => {
              fetchUserData();
            }, 2000)
          : (setSuccess(true),
            setStatus('finished'),
            setTimeout(() => {
              Storage.removeItem('old-subscription-id');
              navigate('/dashboard/general');
            }, 7000));
      },
    },
  );
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Page title='Payment Status'>
      <RootStyle>
        <Container>
          <ContentStyle large={!success}>
            <Card sx={{ p: 3 }} elevation={3}>
              {status === 'pending' ? (
                <Box display={'flex'} justifyContent={'center'}>
                  <CircularProgress sx={{ height: '35px', width: '35px' }} />
                </Box>
              ) : (
                <Box
                  pr={2}
                  sx={{ mb: 0, display: 'flex', alignItems: 'center' }}
                  justifyContent={'space-between'}
                >
                  <Box sx={{ flexGrow: 1, maxWidth: 'calc(100% - 80px)' }}>
                    <Typography variant='h5' gutterBottom>
                      {success ? 'Thank You' : 'Payment Error'}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary' }}
                    >
                      {success
                        ? `Your payment has been successfully processed. Thank you for joining AutoSumbit!`
                        : `Your payment was not processed due to a technical error. Please try again later or contact our support`}
                      {!success && (
                        <a
                          href={'mailto:support@autosubmit.com'}
                          style={{ display: 'inline-block' }}
                        >
                          support@autosubmit.com
                        </a>
                      )}
                    </Typography>
                  </Box>
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
                </Box>
              )}
            </Card>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
