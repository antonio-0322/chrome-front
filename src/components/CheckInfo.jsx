import PropTypes from 'prop-types';
// icons
import CheckIcon from '../assets/landing/check-icon.svg';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
// @mui
import { Box, Typography, Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

CheckInfo.propTypes = {
  sx: PropTypes.object,
  size: PropTypes.number,
  text: PropTypes.string,
  variant: PropTypes.string,
  helper: PropTypes.bool,
};

CheckInfo.defaultProps = {
  size: 22,
  text: '',
  variant: 'caption',
};

// ----------------------------------------------------------------------

export function CheckInfo({ size, text, sx, variant, description, ...other }) {
  return (
    <Box sx={{ ...sx }} {...other} display='flex' alignItems='center' py={0.8}>
      <img src={CheckIcon} alt='Check Icon' width={size} />
      <Typography
        variant={variant}
        pl={2}
        textTransform='uppercase'
        fontWeight={500}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
        {description && (
          <Tooltip
            title={
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            }
            placement='right'
          >
            <HelpRoundedIcon sx={{ fontSize: 16, mb: '2px', ml: 1 }} />
          </Tooltip>
        )}
      </Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------

PointInfo.propTypes = {
  sx: PropTypes.object,
  size: PropTypes.number,
  text: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
};

PointInfo.defaultProps = {
  size: 10,
  text: '',
  variant: 'body2',
  color: 'white',
};

// ----------------------------------------------------------------------

export function PointInfo({ size, text, color, sx, variant, ...other }) {
  return (
    <Box sx={{ ...sx }} {...other} display='flex' alignItems='center' py={0.8}>
      <Box
        sx={{
          width: size,
          height: size,
          backgroundColor: '#1C44C7',
          borderRadius: 1 / 3,
        }}
      ></Box>
      <Typography
        variant={variant}
        pl={2}
        color={color}
        width={`calc(100% - ${size}px - 10px)`}
      >
        {text}
      </Typography>
    </Box>
  );
}
