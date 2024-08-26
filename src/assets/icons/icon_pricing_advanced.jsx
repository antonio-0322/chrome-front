import { memo } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

IconPricingAdvanced.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

IconPricingAdvanced.defaultProps = {
  size: 24,
};

function IconPricingAdvanced({ color, size, ...other }) {
  const theme = useTheme();

  const iconColor = color ? color : '#00ACC1';

  return (
    <Box {...other} height={size} width={size}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill='none'
      >
        <g clipPath='url(#clip0_589_48084)'>
          <path
            opacity='0.3'
            d='M8.87975 5H6.23975L4.73975 8H7.37975L8.87975 5Z'
            fill={iconColor}
          />
          <path
            opacity='0.3'
            d='M19.2596 8L17.7596 5H15.1196L16.6196 8H19.2596Z'
            fill={iconColor}
          />
          <path
            opacity='0.3'
            d='M10.9995 16.68V10H5.43945L10.9995 16.68Z'
            fill={iconColor}
          />
          <path
            opacity='0.3'
            d='M12.9995 16.68L18.5595 10H12.9995V16.68Z'
            fill={iconColor}
          />
          <path
            opacity='0.3'
            d='M12.8796 5H11.1196L9.61963 8H14.3796L12.8796 5Z'
            fill={iconColor}
          />
          <path
            d='M18.9995 3H4.99951L1.99951 9L11.9995 21L21.9995 9L18.9995 3ZM17.7595 5L19.2595 8H16.6095L15.1095 5H17.7595ZM6.23951 5H8.88951L7.38951 8H4.73951L6.23951 5ZM10.9995 16.68L5.43951 10H10.9995V16.68ZM9.61951 8L11.1195 5H12.8795L14.3795 8H9.61951ZM12.9995 16.68V10H18.5595L12.9995 16.68Z'
            fill={iconColor}
          />
        </g>
        <defs>
          <clipPath id='clip0_589_48084'>
            <rect
              width={size}
              height={size}
              fill='white'
              transform='translate(-0.000488281)'
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}

export default memo(IconPricingAdvanced);
