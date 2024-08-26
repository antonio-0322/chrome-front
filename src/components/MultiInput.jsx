import { useState } from 'react';
import { Chip, FormControl, Grid, TextField } from '@mui/material';

const MultiInput = ({
  fieldValue,
  setFieldValue,
  placeholder,
  type,
  setMultiInputValues,
  deleteMultiInputValue,
  inputKey,
}) => {
  const [currValue, setCurrValue] = useState('');

  const handleKeyUp = (e) => {
    if (e.keyCode == 13 && e.target.value.trim()) {
      e.preventDefault();
      setCurrValue('');
      if (type === 'setting') {
        setMultiInputValues(inputKey, e.target.value);
        return;
      }
      setFieldValue((prev) => ({
        ...prev,
        values: [...prev.values, e.target.value],
      }));
    }
  };

  const handleDeleteMultiInputValue = (item, index) => {
    if (type === 'setting') {
      deleteMultiInputValue(inputKey, index);
      return;
    }
    let arr = [...fieldValue.values];
    arr.splice(index, 1);
    setFieldValue((prev) => ({ ...prev, values: arr }));
  };

  const handleChangeMultiInputValue = (e) => {
    setCurrValue(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <Grid container spacing={0}>
        {fieldValue?.values?.map((item, index) => (
          <Grid item key={index} sx={{ paddingLeft: 0, paddingRight: '8px' }}>
            <Chip
              size='small'
              onDelete={() => handleDeleteMultiInputValue(item, index)}
              label={item}
            />
          </Grid>
        ))}
      </Grid>
      <TextField
        fullWidth
        variant='standard'
        value={currValue}
        placeholder={placeholder}
        onChange={(event) => handleChangeMultiInputValue(event)}
        onKeyDown={handleKeyUp}
        helperText={
          currValue ? 'Press Enter to keep or add more companies' : ''
        }
      />
    </FormControl>
  );
};

export default MultiInput;
