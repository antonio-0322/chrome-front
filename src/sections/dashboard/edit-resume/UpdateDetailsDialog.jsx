import PropTypes from 'prop-types';
// @mui
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  DialogTitle,
  Typography,
} from '@mui/material';
// components
import { FormProvider } from '../../../components/hook-form';

// ----------------------------------------------------------------------

UpdateDetailsDialog.propTypes = {
  state: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  methods: PropTypes.any,
};

// ----------------------------------------------------------------------

export default function UpdateDetailsDialog({
  state,
  onClose,
  children,
  methods,
  action,
}) {
  return (
    <Dialog
      open={state}
      onClose={onClose}
      sx={{ maxWidth: '744px', width: '100%', m: 'auto' }}
      fullWidth
    >
      <FormProvider methods={methods}>
        <DialogContent sx={{ backgroundColor: '#F4F7FA', pt: 5, pb: 2, px: 4 }}>
          {children}
        </DialogContent>
        <DialogActions sx={{ px: 4, pt: 1, pb: 2, backgroundColor: '#F4F7FA' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            size='large'
            type='button'
            variant='contained'
            onClick={action}
          >
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
