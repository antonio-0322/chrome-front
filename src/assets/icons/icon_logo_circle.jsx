import { memo } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function LogoIconCircle({ src, ...other }) {
  return (
    <Box {...other}>
      <img src={src} />
    </Box>
  );
}

export default memo(LogoIconCircle);
