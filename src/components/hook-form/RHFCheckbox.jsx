import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
};

export default function RHFCheckbox({ name, error, isSubmitted, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControl error={!!error && isSubmitted}>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value ?? false} />
            )}
          />
        }
        {...other}
      />
      <FormHelperText>{!!isSubmitted && error?.message}</FormHelperText>
    </FormControl>
  );
}
