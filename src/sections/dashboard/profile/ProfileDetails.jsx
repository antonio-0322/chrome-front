import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Typography,
  Stack,
  Card,
  useTheme,
  Button,
  Chip,
} from '@mui/material';

// ----------------------------------------------------------------------

ProfileDetails.propTypes = {
  passwordAction: PropTypes.func,
  detailsAction: PropTypes.func,
  userData: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function ProfileDetails({
  userData,
  passwordAction,
  detailsAction,
}) {
  const theme = useTheme();

  const FIELDS = [
    {
      title: 'About you',
      chips: [
        {
          label: 'Full Name',
          value: `${userData.first_name} ${userData.last_name}`,
        },
      ],
    },
    {
      title: 'Contact',
      chips: [
        {
          label: 'Email',
          value: userData.email,
        },
      ],
    },
    userData.signup_type === 'email' && {
      title: 'Password',
      action: (
        <Button color='primary' onClick={passwordAction}>
          Change Password
        </Button>
      ),
    },
  ];

  return (
    <Card
      sx={{ width: '100%', position: 'relative', padding: 1.5, height: '100%' }}
      variant='outlined'
    >
      <Stack
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        flexDirection={'row'}
      >
        <Box>
          {FIELDS.map((item, index) => (
            <Box key={item.label} mt={index === 0 ? 0 : 2.5}>
              <Typography variant='subtitle2' mb={2}>
                {item.title}
              </Typography>
              {item.chips &&
                item.chips.map((chip) => (
                  <Chip
                    key={chip.label}
                    size='medium'
                    label={chip.label + ': ' + chip.value}
                    sx={{
                      bgcolor: theme.palette.primary.lighter,
                      mr: 1,
                    }}
                  />
                ))}
              {item.action}
            </Box>
          ))}
        </Box>
        {userData?.signup_type === 'email' && (
          <Button variant='outlined' color='primary' onClick={detailsAction}>
            Update details
          </Button>
        )}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
