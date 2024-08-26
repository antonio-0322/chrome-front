import React, { useState } from 'react';
import { useAuthStore } from '../../../zustand/auth.store';

import JobTitles from '../../../utils/jobTitles.json';
import debounce from 'lodash.debounce';
import Fuse from 'fuse.js';
import { Autocomplete, TextField } from '@mui/material';

export default function AutocompleteField({
  errors,
  setError,
  clearErrors,
  isSubmitted,
  fieldData,
  fieldStructure,
  setFieldValue,
}) {
  const { userData } = useAuthStore();
  const [jobTitlesOptoions, setJobTitlesOptions] = useState([]);
  const [jobTitleValue, setJobTitleValue] = useState(
    fieldData ? fieldData.values : [],
  );
  const [inputEmpty, setInputEmpty] = useState(true);

  const options = {
    includeScore: true,
    useExtendedSearch: true,
  };

  const fuse = new Fuse(JobTitles['job-titles'], options);

  const debouncedSearch = debounce((value) => getOptionsForTitles(value), 500);

  const getOptionsForTitles = (search) => {
    if (search.length !== 0) {
      const results = fuse.search(search);
      let newResults = [];

      results.forEach(
        (x, index) =>
          index <= 49 && newResults.push({ label: x.item, value: x.item }),
      );

      setJobTitlesOptions(newResults);
    } else {
      setJobTitlesOptions([]);
    }
  };

  const createOption = (value) => {
    let newOption = [];
    if (value && value.length > 0) {
      value.forEach((x) => newOption.push({ label: x, value: x }));
    } else {
      newOption = [];
    }
    return newOption;
  };

  return (
    <Autocomplete
      multiple
      noOptionsText={inputEmpty? "Type to search" : "No options"}
      getOptionLabel={(option) => option.label}
      options={jobTitlesOptoions}
      defaultValue={createOption(jobTitleValue)}
      onChange={(event, newValue) => {
        fieldStructure?.is_required &&
          (!newValue?.length
            ? setError(fieldData.id.toString(), {
                message: 'This field is required.',
              })
            : clearErrors());
        setJobTitleValue(() =>
          newValue.length > 0 ? newValue.map((item) => item.value) : [],
        );
        setFieldValue((prev) => ({
          ...prev,
          values: newValue.map((item) => item.value),
        }));
      }}
      freeSolo={
        jobTitleValue.length ===
        userData.active_subscription.job_titles.possible
          ? true
          : false
      }
      getOptionDisabled={(options) =>
        jobTitleValue.length ===
        userData.active_subscription.job_titles.possible
          ? true
          : false
      }
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ mt: 1.5 }}
          name={fieldData.id.toString()}
          error={!!errors[fieldData.id.toString()] && isSubmitted}
          helperText={isSubmitted && errors[fieldData.id.toString()]?.message}
          label={fieldStructure.placeholder}
          variant={'standard'}
          onChange={(e) => {
            debouncedSearch(e.target.value);
            setInputEmpty(!e.target.value)
          }}
        />
      )}
    />
  );
}
