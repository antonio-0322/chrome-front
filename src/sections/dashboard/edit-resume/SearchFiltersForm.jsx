import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
// @mui
import {
  Chip,
  Grid,
  Avatar,
  useTheme,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
  Checkbox,
  FormGroup,
  CircularProgress,
} from '@mui/material';
// components
import { FormCardView } from '../../../components';
import { useAuthStore } from '../../../zustand/auth.store';
import { SetupApi } from '../../../api/Setup/setup.services';
import { AuthApi } from '../../../api/Auth/auth.services';

import MultiInput from '../../../components/MultiInput';
import AutocompleteField from './AutocompleteField';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../../components/hook-form';

import LocationInput from '../../../components/LocationInput';
import { inputDebounce } from '../../../utils/helpers';
import { useOutletContext } from 'react-router-dom';
import { useExtensionInfoStore } from '../../../zustand/extensionInfo';
import { EXTENSION_ID } from '../../../utils/variablesFromEnv';

const JobSearchField = ({
  errors,
  setError,
  clearErrors,
  isSubmitted,
  fieldStructure,
  fieldData,
  fieldValue,
  setFieldValue,
}) => {

  const createField = () => {
    switch (fieldStructure?.type) {
      case 'radio':
        return (
          <Grid variant='outlined' width='100%'>
            <Typography variant='h6' mb={3}>
              {fieldData.additional_question.title}
            </Typography>
            <RadioGroup
              row
              defaultValue={fieldData.value}
              onChange={(e) =>
                handleChangeAnswer(
                  fieldData.additional_question.id,
                  e.target.value,
                )
              }
            >
              {fieldData.additional_question.items.map((option, index) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </Grid>
        );
      case 'select':
        return (
          <Grid variant='outlined' width='100%'>
            <Typography variant='h6'>
              {fieldData.additional_question.title}
            </Typography>
            <Autocomplete
              multiple={false}
              options={fieldData.additional_question.items}
              onChange={(event, newValue) =>
                handleChangeAnswer(
                  fieldData.additional_question.id,
                  newValue.value,
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ mt: 1.5 }}
                  name={`additional_questions[${fieldData.additional_question.id.toString()}]`}
                  label={fieldData.additional_question.placeholder}
                  variant={'standard'}
                />
              )}
            />
          </Grid>
        );
      case 'input':
        return fieldStructure.slug === 'job_location' ? (
          <LocationInput
            name={fieldData.id.toString()}
            fieldInputValue={fieldValue}
            error={!!errors[fieldData.id.toString()] && isSubmitted}
            helperText={isSubmitted && errors[fieldData.id.toString()]?.message}
            onChange={(value) => {
              !value
                ? setError(fieldData.id.toString(), {
                    message: 'This field is required.',
                  })
                : clearErrors();
              setFieldValue((prev) => ({ ...prev, value }));
            }}
            defaultValue={fieldData.value}
            placeholder={fieldStructure.placeholder}
          />
        ) : (
          <TextField
            fullWidth
            type='text'
            sx={{ mt: 0.75 }}
            variant={'standard'}
            defaultValue={fieldData.value}
            name={fieldData.id.toString()}
            error={!!errors[fieldData.id.toString()] && isSubmitted}
            helperText={isSubmitted && errors[fieldData.id.toString()]?.message}
            onChange={(e) =>
              inputDebounce(() => {
                fieldStructure?.is_required &&
                  (!e.target.value.trim()
                    ? setError(fieldData.id.toString(), {
                        message: 'This field is required.',
                      })
                    : clearErrors());
                setFieldValue((prev) => ({ ...prev, value: e.target.value }));
              })
            }
            label={fieldStructure.placeholder}
          />
        );
      case 'checkbox_group':
        return (
          <FormGroup row>
            {fieldStructure.items.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={fieldData.values.includes(item.value * 1)}
                    onChange={(e) =>
                      e.target.checked
                        ? setFieldValue((prev) => ({
                            ...prev,
                            values: [...prev.values, item.value * 1],
                          }))
                        : setFieldValue((prev) => ({
                            ...prev,
                            values: prev.values.filter(
                              (val) => val * 1 !== item.value * 1,
                            ),
                          }))
                    }
                    key={item.value}
                    name={`[${item.value}]`}
                    label={item.label}
                    variant={'standard'}
                  />
                }
                key={item.value}
                label={item.label}
              />
            ))}
          </FormGroup>
        );
      case 'multi_select':
        return (
          <Autocomplete
            multiple
            getOptionLabel={(option) => option.label}
            defaultValue={fieldStructure.items.filter((item) =>
              fieldData.values.includes(item.value),
            )}
            options={fieldStructure.items || []}
            onChange={(event, newValue) =>
              setFieldValue((prev) => ({
                ...prev,
                values: newValue?.map((item) => item.value),
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={fieldStructure.placeholder}
                variant={'standard'}
              />
            )}
          />
        );
      case 'multi_input':
        return fieldStructure.filter_name === 'Title' ? (
          <AutocompleteField
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
            isSubmitted={isSubmitted}
            fieldData={fieldData}
            fieldStructure={fieldStructure}
            setFieldValue={setFieldValue}
          />
        ) : (
          <MultiInput fieldValue={fieldValue} setFieldValue={setFieldValue} />
        );
      default:
        return {};
    }
  };

  useEffect(() => {
    if (fieldStructure && fieldData) {
      const { value, values } = fieldData;
      setFieldValue({ value, values });
    }
  }, [fieldStructure, fieldData]);

  return fieldStructure ? (
    <Grid variant='outlined' width='100%'>
      <Typography variant='h6' mb={3}>
        {`${fieldStructure?.title} ${
          fieldStructure.is_required ? '(Required)' : ''
        }`}
      </Typography>
      {createField()}
    </Grid>
  ) : (
    <></>
  );
};

export default function SearchFiltersForm() {
  const theme = useTheme();
  const handleInfoPopover = useOutletContext();
  const { setUserState, setUserData } = useAuthStore();
  const { setIsExtension } = useExtensionInfoStore();
  const [fieldValue, setFieldValue] = useState({
    value: null,
    values: [],
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const [draftData, setDraftData] = useState("")
  const {
    userData: { job_search_filters, active_subscription },
  } = useAuthStore();

  const { data: jobSearchFilterFields, isLoading } = useQuery(
    'get-job-search-filters',
    () => SetupApi.getJobSearchFilters('linkedin'),
    { refetchOnWindowFocus: false },
  );

  const { refetch } = useQuery('get-user-data', AuthApi.retrieveUserData, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setUserState('auth');
      setUserData(succeedData.data);
    },
  });

  const { mutateAsync } = useMutation(
    'set-job-search-filters',
    SetupApi.setupJobSearchFilters,
    {
      onSuccess: () => {
        refetch();
        setActiveFilter(null);
      },
    },
  );

  const onCloseModal = () => setActiveFilter(null);
  const handleSaveChanges = () => {
    const changedData = job_search_filters?.map((filter) => {
      const isMultiple = jobSearchFilterFields?.data?.find(
        (item) => filter.job_search_filter === item.id,
      )?.is_multiple;
      const result = {
        job_search_filter: filter.job_search_filter,
        is_multiple: isMultiple,
        values: filter?.values ?? [],
        value: filter.value ?? '',
      };

      if (filter.job_search_filter === activeFilter) {
        result.values = fieldValue?.values ?? [];
        result.value = fieldValue?.value ?? '';
      }

      if (result.is_multiple) {
        delete result.value;
      } else {
        delete result.values;
      }

      return result;
    });

    mutateAsync({ job_search_filters: changedData });
  };

  const methods = useForm({});

  const {
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitted },
  } = methods;

  const onSubmit = async () => {
    handleSaveChanges();
  };

  const onOpenModal = async (job_search_filter) => {
    try {
      // eslint-disable-next-line no-undef
      await chrome.runtime.sendMessage(
        EXTENSION_ID,
        'checkExtension',
        (response) => {
          if (response === 'extension_available') {
            !active_subscription
              ? handleInfoPopover()
              : setActiveFilter(job_search_filter);
          } else {
            setIsExtension(false);
          }
        },
        );
    } catch (e) {
      console.log(e)
      setIsExtension(false);
    }
  };

  useEffect(() => {
    !activeFilter && reset();
  }, [activeFilter]);

  return (
    <>
      {isLoading ? (
        <Grid
          spacing={1.5}
          mt={5}
          pt={30}
          display={'flex'}
          container
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={1.5} mt={2}>
          {job_search_filters?.map((card) => {
            const fileds = jobSearchFilterFields?.data?.find(
              (item) => card.job_search_filter === item.id,
            );
            return (
              <Grid item sm={6} key={card?.id}>
                <FormCardView
                  variant='outlined'
                  status='invalid'
                  valid={'true'}
                  title={`${fileds?.title} ${
                    fileds?.is_required ? '(Required)' : ''
                  }`}
                  onClick={() => onOpenModal(card?.job_search_filter)}
                >
                  {card?.values?.length ? (
                    card.values?.map((chip, index) => (
                      <Chip
                        key={index}
                        size='medium'
                        avatar={
                          chip.avatar && (
                            <Avatar
                              sx={{ bgcolor: theme.palette.primary.light }}
                            >
                              {chip.avatar}
                            </Avatar>
                          )
                        }
                        label={
                          fileds?.items
                            ? fileds?.items.find((item) => item.value == chip)
                                .label
                            : chip
                        }
                        sx={{
                          bgcolor: theme.palette.primary.lighter,
                          mr: 1,
                          mb: 0.5,
                        }}
                      />
                    ))
                  ) : (
                    <Chip
                      size='medium'
                      avatar={
                        card.avatar && (
                          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                            {card.avatar}
                          </Avatar>
                        )
                      }
                      label={card.value || 'Not Specified'}
                      sx={{
                        bgcolor: theme.palette.primary.lighter,
                        mr: 1,
                        mb: 0.5,
                      }}
                    />
                  )}
                </FormCardView>
              </Grid>
            );
          })}
        </Grid>
      )}
      {jobSearchFilterFields && job_search_filters && (
        <Dialog
          open={activeFilter !== null}
          onClose={onCloseModal}
          sx={{ maxWidth: '744px', width: '100%', m: 'auto' }}
          fullWidth
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent
              sx={{ backgroundColor: '#F4F7FA', pt: 5, pb: 2, px: 4 }}
            >
              <JobSearchField
                errors={errors}
                setError={setError}
                clearErrors={clearErrors}
                isSubmitted={isSubmitted}
                fieldValue={fieldValue}
                setFieldValue={setFieldValue}
                fieldStructure={jobSearchFilterFields?.data.find(
                  (item) => item.id === activeFilter,
                )}
                fieldData={job_search_filters?.find(
                  (item) => item.job_search_filter === activeFilter,
                )}
              />
            </DialogContent>
            <DialogActions
              sx={{ px: 4, pt: 1, pb: 2, backgroundColor: '#F4F7FA' }}
            >
              <Button onClick={onCloseModal}>Cancel</Button>
              <Button size='large' type='submit' variant='contained'>
                Save
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
}
