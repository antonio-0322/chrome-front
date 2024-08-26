import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

// @mui
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  useTheme,
  TextField,
  Autocomplete,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from '../../../components/hook-form';
import { FormCard } from '../../../components';
import { useMutation, useQuery } from 'react-query';
import { SetupApi } from '../../../api/Setup/setup.services';

import JobTitles from '../../../utils/jobTitles.json';
import debounce from 'lodash.debounce';
import Fuse from 'fuse.js';
import { AuthApi } from '../../../api/Auth/auth.services';
import { useAuthStore } from '../../../zustand/auth.store';
import LocationInput from '../../../components/LocationInput';
import MultiInput from '../../../components/MultiInput';
import { EXTENSION_ID } from '../../../utils/variablesFromEnv';

// ----------------------------------------------------------------------

LinkedinQuestionsDialog.propTypes = {
  state: PropTypes.bool,
  onClose: PropTypes.func,
  userData: PropTypes.any,
};

// ----------------------------------------------------------------------

export default function LinkedinQuestionsDialog({ state, onClose, userData }) {
  const theme = useTheme();
  const { setUserData, setUserState } = useAuthStore();
  const [validFields, setValidFields] = useState({});
  const [jobTitlesOptoions, setJobTitlesOptions] = useState([]);
  const [multiInputData, setMultiInputData] = useState({ values: [] });
  const [notMatchedValues, setNotMatchedValues] = useState({});

  const options = {
    includeScore: true,
    useExtendedSearch: true,
  };

  const fuse = new Fuse(JobTitles['job-titles'], options);

  const { data } = useQuery(
    'get-platform-questions',
    () => SetupApi.getJobSearchFilters('linkedin'),
    { refetchOnWindowFocus: false },
  );

  const { refetch } = useQuery(
    'get-job-search-url',
    () => SetupApi.getSearchJobUrl('linkedin'),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  const { mutateAsync, isLoading } = useMutation(
    'setup-job-search',
    SetupApi.setupJobSearchFilters,
  );

  const schemas = {};
  data?.data.map((field) => {
    if (field.is_required)
      schemas[field.id.toString()] = Yup.string().required();
  });

  const LinkedinQuestionsDialog = Yup.object().shape(schemas);

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(LinkedinQuestionsDialog),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = methods;

  const setMultiInputValues = (key, value) => {
    const currentValues = getValues()[key];
    Array.isArray(currentValues)
      ? (setValue(key, [...currentValues, value]),
        setMultiInputData({ values: [...currentValues, value] }))
      : (setValue(key, [value]), setMultiInputData({ values: [value] }));
  };

  const deleteMultiInputValue = (key, index) => {
    const currentValues = getValues()[key];
    currentValues.splice(index, 1);
    setValue(key, currentValues);
    setMultiInputData({ values: currentValues });
  };

  const getIndexes = (arr) => {
    let newArr = [];

    arr.forEach((x, i) => {
      x === true && newArr.push(i);
    });

    return newArr;
  };

  const { refetch: fetchUserData } = useQuery(
    'get-user-data',
    AuthApi.retrieveUserData,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (succeedData) => {
        setUserState('auth');
        setUserData(succeedData.data);
      },
    },
  );

  const prepareData = (data) => {
    let newData = [
      {
        job_search_filter: 1,
        value: data[1] || '',
      },
      {
        job_search_filter: 2,
        is_multiple: true,
        values: Array.isArray(data[2]) ? [...data[2].map((x) => x.value)] : [],
      },
      {
        job_search_filter: 3,
        value: data[3] || '',
      },
      {
        job_search_filter: 4,
        is_multiple: true,
        values: Array.isArray(data[4]) ? [...data[4].map((x) => x.value)] : [],
      },
      {
        job_search_filter: 5,
        is_multiple: true,
        values: data[5] || [],
      },
      {
        job_search_filter: 6,
        is_multiple: true,
        values: [...getIndexes(data[6])],
      },
      {
        job_search_filter: 7,
        is_multiple: true,
        values: Array.isArray(data[7]) ? [...data[7].map((x) => x.value)] : [],
      },
    ];

    return newData;
  };

  const onSubmit = async () => {
    let requestData = prepareData(getValues());
    await mutateAsync({ job_search_filters: requestData });

    let response = await refetch();
    fetchUserData();
    onClose();
    const jobTitles = response?.data?.data?.job_titles;

    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage(EXTENSION_ID, {
      accessToken: localStorage.getItem('accessToken'),
      titles: jobTitles ? JSON.stringify(jobTitles) : [],
    });

    if (response.data.status === 200) {
      window.open(response?.data?.data?.url, "_blank");
    }
  };

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

  const closeHandling = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (!state) {
      setValidFields({});
      setMultiInputData({ values: [] });
    }
  }, [state]);

  return (
    <Dialog open={state} onClose={closeHandling} maxWidth='lg' fullWidth>
      <DialogContent
        sx={{
          px: 4,
          pt: 2.5,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
        bgcolor={'#F4F7FA'}
      >
        <Typography variant='h6'>
          LinkedIn Filters to Help You Apply More Targeted Job Postings.
        </Typography>

        <Typography
          variant='body2'
          color={'text.secondary'}
          component={'p'}
          mt={0.5}
        >
          {
            'To get started, just fill a few quick fields about your skills, experience, and desired job.'
          }
          <br />
          {
            "We'll use your answers to match you with more relevant job openings and automatically fill out your narrowed target applications."
          }
        </Typography>
      </DialogContent>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ bgcolor: '#F4F7FA', pt: 1, pb: 2, px: 4 }}>
          <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {data?.data?.map(
              (field, i) =>
                field?.fillable && (
                  <Grid item xs={6} key={i}>
                    <FormCard
                      variant='outlined'
                      status='invalid'
                      valid={validFields[field.id] || !errors[field.id]}
                      required={
                        field.is_required &&
                        (validFields[field.id] || errors[field.id])
                      }
                    >
                      <Typography variant='subtitle2'>
                        {field.title} {field.is_required && ' (Required)'}
                      </Typography>
                      {field.type === 'input' &&
                        field.slug === 'job_location' && (
                          <LocationInput
                            fieldInputValue={{...{value: getValues()[3] || ""}}}
                            onChange={(value) => {
                              setValue(field.id.toString(), value);
                              setValidFields((prev) => ({
                                ...prev,
                                [field.id]: Boolean(value),
                              }));
                            }}
                            placeholder={field.placeholder}
                          />
                        )}
                      {(field.type === 'input' ||
                        field.type === 'multi_input') &&
                        field.filter_name !== 'Title' &&
                        field.slug !== 'job_location' &&
                        field.slug !== 'excluded_companies' && (
                          <RHFTextField
                            sx={{ mt: 1.5 }}
                            name={field.id.toString()}
                            label={field.placeholder}
                            variant={'standard'}
                            onChange={(e) => {
                              setValue(field.id.toString(), e.target.value);
                              setValidFields((prev) => ({
                                ...prev,
                                [field.id]: Boolean(e.target.value),
                              }));
                            }}
                          />
                        )}

                      {field?.slug === 'excluded_companies' && (
                        <MultiInput
                          fieldValue={multiInputData}
                          type={'setting'}
                          setMultiInputValues={setMultiInputValues}
                          deleteMultiInputValue={deleteMultiInputValue}
                          inputKey={field.id.toString()}
                          placeholder={field?.placeholder}
                        />
                      )}

                      {(field.type === 'input' ||
                        field.type === 'multi_input') &&
                        field.filter_name === 'Title' && (
                          <Autocomplete
                            multiple
                            noOptionsText={notMatchedValues[field.id.toString()] ? "No options" : "Type to search"}
                            getOptionLabel={(option) => option.label}
                            options={jobTitlesOptoions}
                            onChange={(event, newValue) => {
                              setValue(field.id.toString(), newValue);
                              setValidFields((prev) => ({
                                ...prev,
                                [field.id]: Boolean(newValue.length),
                              }));
                            }}
                            freeSolo={
                              getValues()[field.id] &&
                              getValues()[field.id].length ===
                                userData?.active_subscription?.job_titles
                                  ?.possible
                                ? true
                                : false
                            }
                            getOptionDisabled={() =>
                              getValues()[field.id] &&
                              getValues()[field.id].length ===
                                userData?.active_subscription?.job_titles
                                  ?.possible
                                ? true
                                : false
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{ mt: 1.5 }}
                                label={field.placeholder}
                                variant={'standard'}
                                onChange={(e) =>
                                  {
                                    debouncedSearch(e.target.value);
                                    setNotMatchedValues(prev => ({...prev, [field.id.toString()] : Boolean(e.target.value)}))
                                  }
                                }
                                value={params?.inputProps?.value ?? ''}
                              />
                            )}
                          />
                        )}

                      {field.type === 'checkbox_group' &&
                        field.items.map((item) => (
                          <RHFCheckbox
                            key={item.value}
                            sx={{ mt: 1.5 }}
                            name={`${field.id}[${item.value}]`}
                            label={item.label}
                            variant={'standard'}
                          />
                        ))}
                      {field.type === 'multi_select' && (
                        <Autocomplete
                          multiple
                          getOptionLabel={(option) => option.label}
                          options={field.items || []}
                          onChange={(event, newValue) =>
                            setValue(field.id.toString(), newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{ mt: 1.5 }}
                              label={field.placeholder}
                              variant={'standard'}
                            />
                          )}
                        />
                      )}
                    </FormCard>
                  </Grid>
                ),
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 1 }}>
          <Button onClick={closeHandling}>Cancel</Button>
          <LoadingButton
            size='large'
            type='submit'
            variant='contained'
            onClick={onSubmit}
          >
            Start Applying
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
