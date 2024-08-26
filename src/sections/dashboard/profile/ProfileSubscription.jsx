import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
// @mui
import {
  Box,
  Typography,
  Stack,
  Card,
  useTheme,
  Button,
  Chip,
  Link,
} from '@mui/material';
// paths
import { PATH_DASHBOARD } from '../../../routes/paths';
import { usePaymentStore } from '../../../zustand/payment.store';
import { getLeftDays } from '../../../utils/getLeftDays';

// ----------------------------------------------------------------------

export default function ProfileSubscription({ userData }) {
  const theme = useTheme();
  const { plans } = usePaymentStore();

  const currentPlan = plans.find(
    (plan) => plan.id === userData?.active_subscription?.plan,
  );

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
      }}
      variant='outlined'
    >
      <Stack
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        flexDirection={'row'}
      >
        <Box>
          <Typography variant='subtitle2' mb={2}>
            Subscription Plan
          </Typography>
          <Chip
            size='medium'
            label={`Plan Name: ${
              currentPlan?.name || 'No Active Subscription'
            }`}
            sx={{
              bgcolor: theme.palette.primary.lighter,
              mr: 1,
            }}
          />
        </Box>
        <Link
          to={PATH_DASHBOARD.pricing}
          component={RouterLink}
          sx={{ ml: 'auto' }}
        >
          <Button variant='outlined' color='primary'>
            Change Pricing Plan
          </Button>
        </Link>
      </Stack>
      <Box px={1.5} mt={1}>
        <Typography color='text.secondary'>
          {currentPlan?.options.map(
            (option, index) =>
              index < 3 && (
                <Typography mt={1}>
                  <div
                    dangerouslySetInnerHTML={{ __html: `• ${option.text} ` }}
                  />
                </Typography>
              ),
          )}
        </Typography>
      </Box>
      <Typography variant='caption' color='text.secondary' mt={'auto'} px={1.5}>
        Upgrade to a paid plan today and start enjoying all the benefits of
        Autosubmit
      </Typography>
    </Card>
  );
}

// ----------------------------------------------------------------------
