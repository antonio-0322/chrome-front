import PropTypes from 'prop-types';
// @mui
import {
  Card,
  Typography,
  Box,
  Chip,
  Button,
  useTheme,
  CardContent,
} from '@mui/material';
// components
import { CheckInfo } from './CheckInfo';
// assets
import { LogoIconCircle } from '../assets/icons';
import { useQuery } from 'react-query';
import { PaymentApi } from '../api/Payment/payment.services';
import { Storage } from '../storage';
import { useAuthStore } from '../zustand/auth.store';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

PaymentPlanCard.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  icon: PropTypes.any,
  benefits: PropTypes.array,
  is_favorite: PropTypes.bool,
  current: PropTypes.bool,
  slug: PropTypes.string,
};

// ----------------------------------------------------------------------

export default function PaymentPlanCard({
  id,
  is_favorite,
  name,
  slug,
  amount,
  image,
  label,
  description,
  price,
  options,
  sx,
  icon,
  current,
  ...other
}) {
  const theme = useTheme();
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  const { refetch: getCheckoutLink } = useQuery(
    'getCheckoutLink',
    () => PaymentApi.getCheckoutLink(id),
    {
      enabled: false,
      onSuccess: (data) => {
        Storage.setItem(
          'old-subscription-id',
          userData?.active_subscription?.id ?? 'none',
        );
        window.location.replace(data.data.url);
      },
    },
  );

  return (
    <Card
      sx={{
        height: '100%',
        overflow: 'inherit',
        display: 'flex',
        position: 'relative',
        borderRadius: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...sx,
      }}
      {...other}
    >
      {is_favorite && (
        <Chip
          label='Best Value'
          color='primary'
          size='small'
          sx={{ position: 'absolute', ml: 2, mt: -1.5 }}
        />
      )}
      <Box
        sx={{
          py: 1.5,
          px: 2,
          display: 'flex',
          bgcolor: theme.palette.primary.lighter,
          borderBottom: '1px solid rgba(0, 0, 0, 0.10)',
        }}
      >
        <Box mt={1} sx={{minHeight: 105}}>
          <Typography
            component={'h3'}
            variant={'caption'}
            textTransform='uppercase'
            fontWeight={700}
            color={'text.primary'}
            letterSpacing={'1px'}
          >
            {name}
          </Typography>
          <Typography
            component={'p'}
            variant={'caption'}
            my={0.5}
            color={'text.secondary'}
          >
            {label}
          </Typography>
          <Typography
            variant={'h5'}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant='h6' color={'text.secondary'} pr={0.5}>
              $
            </Typography>
            {amount}
          </Typography>
          {slug !== "free" && <Chip
            label={"One-Time Payment"}
            sx={{
              bgcolor: "rgba(25, 118, 210, 0.08)",
              padding: "3px 4px 3px 4px",
              width: 140,
              height: 24,
              borderRadius: 16,
              "& .MuiChip-label" : {
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 18,
                letterSpacing: 0.16,
                padding: 0
              }
            }}
          />}
        </Box>
        <Box position={'relative'} ml={'auto'} mt={1} mr={0}>
          <LogoIconCircle src={image} />
        </Box>
      </Box>
      <CardContent px={2.5} py={2}>
        {options?.map((item, index) => (
          <CheckInfo
            key={index}
            size={16}
            text={item.text}
            description={item.description}
          />
        ))}
      </CardContent>
      <Box p={2} mt={'auto'}>
        <Button
          disabled={(id === 1 && !!userData) || current}
          variant={is_favorite ? 'contained' : 'outlined'}
          textTransform={'uppercase'}
          fullWidth
          onClick={
            !userData
              ? () => navigate(PATH_AUTH.register)
              : current
              ? null
              : getCheckoutLink
          }
        >
          {current
            ? 'Current'
            : slug !== 'free' &&
              id === userData?.last_used_subscription?.plan &&
              !userData?.active_subscription
            ? `Upgrade ${name}`
            : `${id !== 1 || !userData ? 'Select' : ''} ${name}`}{' '}
          Plan
        </Button>
      </Box>
    </Card>
  );
}
