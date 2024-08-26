import { memo } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

IconPricingPro.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

IconPricingPro.defaultProps = {
  size: 24,
};

// ----------------------------------------------------------------------

function IconPricingPro({ color, size, ...other }) {
  const theme = useTheme();

  const iconColor = color ? color : theme.palette.success.main;

  return (
    <Box {...other} height={size} width={size}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill='none'
      >
        <g clipPath='url(#clip0_601_20530)'>
          <path
            opacity='0.3'
            d='M11.9999 15.4L8.23992 17.67L9.23992 13.39L5.91992 10.51L10.2999 10.13L11.9999 6.1L13.7099 10.14L18.0899 10.52L14.7699 13.4L15.7699 17.68L11.9999 15.4Z'
            fill={iconColor}
          />
          <path
            d='M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z'
            fill={iconColor}
          />
        </g>
        <defs>
          <clipPath id='clip0_601_20530'>
            <rect width={size} height={size} fill='white' />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(IconPricingPro);
