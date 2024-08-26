import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import { SetupApi } from '../api/Setup/setup.services';
import { useDebounce } from '../hooks/useDebounce';

const LocationInput = ({
  onChange = () => {},
  defaultValue,
  placeholder = '',
  error,
  name,
  fieldInputValue,
  helperText,
}) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [notMatchedValues, setNotMatchedValues] = useState(false);

  const { mutateAsync, isLoading } = useMutation('geoapify', SetupApi.getLocations);

  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e) => {setValue(e.target.value)};

  const matchSubstring = (input, searchString) => {
    const regex = new RegExp(`\\b${searchString}`, 'i');
    return regex.test(input);
  }

  useEffect(() => {
    if (debouncedValue) {
      const getLocations = async () => {
        try {
          const response = await mutateAsync(debouncedValue);

          const options = response?.data?.results?.map((item) => ({
            address_line1: item.address_line1,
            address_line2: item.address_line2,
            category: item.category,
            state: item.state,
            city: item.city,
            country_code: item.country_code,
            country: item.country,
          }));

          if(debouncedValue?.length > 2 && matchSubstring("United States", debouncedValue)) {
              options.unshift({
                address_line1: "",
                address_line2: "",
                category: "",
                state: "",
                city: "",
                country_code: "us",
                country: "United States",
              })
          }

          setOptions(options ?? []);
        } catch (err) {
          setOptions([]);
        }
      };
      getLocations();
    } else {
      setOptions([]);
    }
  }, [debouncedValue]);

  return (
    <div>
      <Autocomplete
        noOptionsText={isLoading? "Loading . . ." : notMatchedValues? "No options" : "Type to search"}
        disableClearable={!fieldInputValue?.value}
        value={fieldInputValue?.value}
        defaultValue={defaultValue ? { label: defaultValue } : null}
        options={isLoading? [] : options?.map((item, index) => ({
          ...item,
          label: `${item.city ? item.city + ", " : ""}${item.state ? item.state + ", " : ""}${item.country}`,
          id: `${item.city ? item.city + ", " : ""}${item.state ? item.state + ", " : ""}${item.country}`,
          key: `${item.city ? item.city + ", " : ""}${item.state ? item.state + ", " : ""}${item.country}`,
        }))}
        onInputChange={(event, newInputValue) => {
          setNotMatchedValues(Boolean(newInputValue));
        }}
        onChange={(event, newValue) => {
          onChange(newValue? `${newValue?.state ? newValue?.state + ", " : ""}${newValue?.country}` : "");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            name={name}
            helperText={helperText}
            onChange={handleChange}
            variant={'standard'}
            label={placeholder}
          />
        )}
      />
    </div>
  );
};

LocationInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.any,
  name: PropTypes.any,
  helperText: PropTypes.any,
  fieldInputValue: PropTypes.object
};

export default LocationInput;
