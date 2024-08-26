import PropTypes from 'prop-types';
// icons
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
// @mui
import { Box, Card, styled } from '@mui/material';

// ----------------------------------------------------------------------

FormCard.propTypes = {
  sx: PropTypes.object,
  valid: PropTypes.bool,
  children: PropTypes.any,
  required: PropTypes.any,
};

// ----------------------------------------------------------------------

const FormCardWrapper = styled(Card)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: theme.spacing(1.5, 2, 2),
}));

const IconWrapper = styled(Box)(({ theme, valid }) => ({
  top: '6px',
  right: '6px',
  width: '20px',
  content: '""',
  height: '20px',
  display: 'block',
  textAlign: 'center',
  position: 'absolute',
  borderRadius: '100%',
  backgroundColor: valid
    ? theme.palette.success.a200
    : theme.palette.error.light,
}));

// ----------------------------------------------------------------------

export default function FormCard({ sx, valid, required, children, ...other }) {
  return (
    <FormCardWrapper sx={{ ...sx }} {...other}>
      {children}
      {required && (
        <IconWrapper valid={valid ? 'yes' : null}>
          {valid ? (
            <CheckCircleRoundedIcon color='success' sx={{ fontSize: '14px' }} />
          ) : (
            <ErrorRoundedIcon color='error' sx={{ fontSize: '14px' }} />
          )}
        </IconWrapper>
      )}
    </FormCardWrapper>
  );
}
