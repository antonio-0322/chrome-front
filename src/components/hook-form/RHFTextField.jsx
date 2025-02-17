import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, isSubmitted, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={field?.value ?? ''}
          error={!!error && isSubmitted}
          helperText={isSubmitted && error?.message}
          {...other}
        />
      )}
    />
  );
}
