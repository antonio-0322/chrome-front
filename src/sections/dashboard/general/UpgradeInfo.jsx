import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Typography, Card, Button, Link } from '@mui/material';
// images
import UpgradeImg from '../../../assets/dashboard/general/upgrade_img.svg';
// path
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function UpgradeInfo() {
  return (
    <Card
      elevation={0}
      variant='outlined'
      sx={{ py: 1.5, px: 3, display: 'flex', alignItems: 'center' }}
    >
      <img src={UpgradeImg} />
      <Box pl={3}>
        <Typography variant='h6' sx={{ color: 'text.primary' }} mb={1}>
          Upgrade today and enjoy all the features!
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Upgrade your plan today and automate your job applications, saving you
          time and effort.
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Land your dream job with our advanced features and affordable pricing.
        </Typography>
      </Box>
      <Link
        to={PATH_DASHBOARD.pricing}
        component={RouterLink}
        sx={{ ml: 'auto' }}
      >
        <Button variant='gradient' size='large' elevation={2}>
          Act Now
        </Button>
      </Link>
    </Card>
  );
}
