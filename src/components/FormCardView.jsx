import PropTypes from 'prop-types';
// @mui
import { Typography, Card, Stack, IconButton, styled } from '@mui/material';
// icons
import EditIcon from '@mui/icons-material/Edit';

// ----------------------------------------------------------------------

FormCardView.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.any,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

// ----------------------------------------------------------------------

const FormCardWrapper = styled(Card)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: theme.spacing(1.5),
}));

// ----------------------------------------------------------------------

export default function FormCardView({
  sx,
  title,
  onClick,
  children,
  ...other
}) {
  return (
    <FormCardWrapper sx={{ ...sx }} {...other}>
      <Stack
        mb={1}
        display={'flex'}
        justifyContent={'space-between'}
        direction={'row'}
      >
        {title && <Typography variant='subtitle2'>{title}</Typography>}
        <IconButton
          onClick={onClick}
          sx={{ position: 'relative', top: '-10px', right: '-10px' }}
        >
          <EditIcon color='primary' />
        </IconButton>
      </Stack>
      {children}
    </FormCardWrapper>
  );
}
