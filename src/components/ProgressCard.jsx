import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  styled,
  Typography,
  CircularProgress,
  CardContent,
  LinearProgress,
  linearProgressClasses,
} from '@mui/material';
// assets
import { LogoIconCircle } from '../assets/icons';

// ----------------------------------------------------------------------

ProgressCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  progress: PropTypes.any,
  pricing: PropTypes.bool,
  planName: PropTypes.string,
  remained: PropTypes.string,
  progressTitle: PropTypes.any,
  progressTotal: PropTypes.any,
  color: PropTypes.string,
  used:  PropTypes.any,
  total:  PropTypes.any,
  linearProgress:  PropTypes.any,
  linkButton:  PropTypes.any
};

// ----------------------------------------------------------------------

const BorderLinearProgress = styled(LinearProgress)(({ theme, state }) => ({
  height: 4,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: state,
  },
}));

// ----------------------------------------------------------------------

export default function ProgressCard({
  title,
  color,
  icon,
  pricing,
  planName,
  progress,
  remained,
  progressTitle,
  progressTotal,
  used,
  total,
  linearProgress,
  linkButton,
  ...other
}) {
  return (
    <Card sx={{ bgcolor: 'white', px: 3 }} {...other} variant='outlined'>
      <CardContent sx={{ px: 0, mt: 1, mb: 0 }}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Typography variant='body1' color={'text.primary'}>
              {title}
            </Typography>
            {planName ? (
              <Typography variant='h5' color={'text.primary'} pr={0.6} mt={1.5}>
                {planName}
              </Typography>
            ) : (
              <Box display={'flex'} mt={1.5}>
                <Typography variant='h5' color={'text.primary'} pr={0.6}>
                  {used}
                </Typography>
                <Typography variant='h5' color={'text.secondary'}>
                  / {total}
                </Typography>
              </Box>
            )}
            {remained && (
              <Typography variant='subtitle' color={'text.secondary'}>
                {remained}
              </Typography>
            )}
          </Box>
          <Box
            sx={{ position: 'relative', display: 'inline-flex', ml: 'auto' }}
          >
            <Box sx={{ position: 'relative' }}>
              <CircularProgress
                variant='determinate'
                sx={{
                  color: (theme) => theme.palette.grey[200],
                }}
                size={145}
                thickness={4}
                value={100}
              />
              <CircularProgress
                variant='determinate'
                sx={{
                  color: { color },
                  position: 'absolute',
                  left: 0,
                }}
                size={145}
                value={Number(progress)}
                thickness={4}
              />
            </Box>
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box textAlign={'center'}>
                {pricing ? (
                  <Box position={'relative'}>
                    <Box
                      width={90}
                      height={90}
                      top={'-35px'}
                      right={'-45px'}
                      display={'flex'}
                      bgcolor={'white'}
                      borderRadius={100}
                      position={'absolute'}
                      alignItems={'center'}
                      alignSelf={'center'}
                      component='img'
                      src={icon}
                    />
                    <LogoIconCircle />
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant='body2'
                      color='text.primary'
                      fontSize={22}
                    >
                      {`${Math.round(progress)}%`}
                    </Typography>
                    <Typography variant='subtitle' color='text.secondary'>
                      used
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} mt={2}>
          {progressTitle && (
            <Typography variant='body2' color={'text.secondary'}>
              {progressTitle}
            </Typography>
          )}
          {progressTotal && (
            <Typography variant='body2' color={'text.secondary'}>
              {progressTotal}
            </Typography>
          )}
        </Box>
        {linearProgress !== '' && (
          <BorderLinearProgress
            variant='determinate'
            state={color}
            value={Number(progress)}
            sx={{ mt: 1 }}
          />
        )}
        {linkButton || null}
      </CardContent>
    </Card>
  );
}
