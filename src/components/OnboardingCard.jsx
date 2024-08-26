import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
// components
import { PointInfo } from '../components';
// icons
import CheckIcon from '@mui/icons-material/Check';

// ----------------------------------------------------------------------

OnboardingCard.propTypes = {
  title: PropTypes.string,
  stepNumber: PropTypes.number,
  points: PropTypes.array,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.any,
  isDisabled: PropTypes.any,
  completed: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]), 
};

// ----------------------------------------------------------------------

export default function OnboardingCard({
  isDisabled,
  stepNumber,
  title,
  points,
  buttonLabel,
  onClick,
  icon,
  completed,
  ...other
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: 'primary.main',
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      {...other}
    >
      <Box sx={{ display: 'flex' }}>
        <Avatar
          sx={{
            bgcolor: completed ? theme.palette.success.a200 : '#1C44C7',
            width: 56,
            height: 56,
            color: completed ? theme.palette.success[900] : '#D0E4FC',
          }}
        >
          {completed ? <CheckIcon /> : stepNumber}
        </Avatar>
        <Box px={2}>
          <Typography variant='body1' color={'rgba(255, 255, 255, 0.70)'}>
            Step {stepNumber}
          </Typography>
          <Typography variant='h5' color={'white'}>
            {title}
          </Typography>
        </Box>
        <Avatar
          sx={{
            ml: 'auto',
            bgcolor: 'white',
            width: 56,
            height: 56,
            color: '#1C44C7',
            borderRadius: 1.5,
          }}
        >
          {icon}
        </Avatar>
      </Box>
      <CardContent sx={{ px: 0, mt: 1 }}>
        {points.map((item) => (
          <PointInfo key={item.text} size={10} text={item.text} />
        ))}
      </CardContent>
      {!completed && (
        <CardActions sx={{ justifyContent: 'flex-end', px: 0, mt: 'auto' }}>
          <Button
            disabled={isDisabled}
            variant='white'
            onClick={onClick}
            color='white'
            sx={{ backgroundColor: 'white', color: 'primary.main' }}
          >
            {buttonLabel}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
