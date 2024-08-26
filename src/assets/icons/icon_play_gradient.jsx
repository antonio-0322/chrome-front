import { memo } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

IconPlayGradient.propTypes = {
  size: PropTypes.number,
};

IconPlayGradient.defaultProps = {
  size: 20,
};

function IconPlayGradient({ size }) {
  const theme = useTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 18 17" fill="none">
      <path d="M6.91699 12.0833L12.7503 8.33333L6.91699 4.58333V12.0833ZM9.00033 16.6667C7.84755 16.6667 6.76421 16.4479 5.75033 16.0104C4.73644 15.5729 3.85449 14.9792 3.10449 14.2292C2.35449 13.4792 1.76074 12.5972 1.32324 11.5833C0.885742 10.5694 0.666992 9.48611 0.666992 8.33333C0.666992 7.18056 0.885742 6.09722 1.32324 5.08333C1.76074 4.06945 2.35449 3.1875 3.10449 2.4375C3.85449 1.6875 4.73644 1.09375 5.75033 0.65625C6.76421 0.21875 7.84755 0 9.00033 0C10.1531 0 11.2364 0.21875 12.2503 0.65625C13.2642 1.09375 14.1462 1.6875 14.8962 2.4375C15.6462 3.1875 16.2399 4.06945 16.6774 5.08333C17.1149 6.09722 17.3337 7.18056 17.3337 8.33333C17.3337 9.48611 17.1149 10.5694 16.6774 11.5833C16.2399 12.5972 15.6462 13.4792 14.8962 14.2292C14.1462 14.9792 13.2642 15.5729 12.2503 16.0104C11.2364 16.4479 10.1531 16.6667 9.00033 16.6667Z" fill="url(#paint0_linear_2200_7124)"/>
      <defs>
        <linearGradient id="paint0_linear_2200_7124" x1="0.977551" y1="1.40498" x2="17.9418" y2="2.5042" gradientUnits="userSpaceOnUse">
          <stop stopColor={theme.palette.secondary.main}/>
          <stop offset="1" stopColor={theme.palette.primary.dark}/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default memo(IconPlayGradient);
