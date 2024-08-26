import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Grid,
  useTheme,
  TextField,
  Autocomplete,
  Avatar,
  Chip
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import {
  FormProvider,
  RHFTextField,
  RHFRadioGroup,
} from '../../../components/hook-form';
import { UploadButtons, FormCard } from '../../../components';
import { useMutation, useQuery } from 'react-query';
import { SetupApi } from '../../../api/Setup/setup.services';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { AuthApi } from '../../../api/Auth/auth.services';
import { useAuthStore } from '../../../zustand/auth.store';

import Skills from '../../../utils/skills.json';
import debounce from 'lodash.debounce';
import Fuse from 'fuse.js';
// ----------------------------------------------------------------------

QuestionsDialog.propTypes = {
  state: PropTypes.bool,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function QuestionsDialog({ state, onClose }) {
  const { setUserData, setUserState } = useAuthStore();
  const theme = useTheme();
  const [validFields, setValidFields] = useState([]);
  const [error, setError] = useState(null);
  const [sendingData, setSendingData] = useState({
    resumes: [],
    additional_questions: [],
    skills: [],
    is_update: false,
  });

  const [skillsOptions, setSkillsOptions] = useState([]);
  const [skillsFieldValues, setSkillsFieldValues] = useState({name: "", experience_in_years: ""});

  const options = {
    includeScore: true,
    useExtendedSearch: true,
  };

  const fuse = new Fuse(Skills['skills'], options);

  const handleSetFile = (name, file, isAdding) => {
    isAdding
      ? setSendingData((prev) => ({
          ...prev,
          resumes: [{ display_name: name, file }],
        }))
      : setSendingData((prev) => ({
          ...prev,
          resumes: [],
        }));
  };

  const handleChangeAdditionalQuestion = (index, id, value) => {
    value
      ? setValidFields((prev) => [...prev, id])
      : setValidFields((prev) => prev.filter((item) => item !== id));
    setSendingData((prev) => {
      prev.additional_questions[index] = {
        additional_question_id: id,
        value,
      };
      return { ...prev };
    });
  };

  const { data } = useQuery({
    queryKey: 'get-additional-questions',
    queryFn: SetupApi.getAdditionalQuestions,
    refetchOnWindowFocus: false,
  });

  const { refetch } = useQuery('get-user-data', AuthApi.retrieveUserData, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setUserState('auth');
      setUserData(succeedData.data);
    },
  });

  const { mutateAsync } = useMutation(
    'setup-resume',
    SetupApi.setupUserResume,
    {
      onSuccess: () => {
        refetch();
        onClose();
        setValidFields([]);
      },
      onError: (error) => {
        setError(error.response.data);
        error.response?.data?.skills && setSendingData(prev => ({...prev, skills: []}));
      },
    },
  );

  const schemas = {};
  data?.data.map((field) => {
    if (field.is_required)
      schemas[field.id.toString()] = Yup.string().required();
  });

  const QuestionsDialogSchema = Yup.object().shape({});

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(QuestionsDialogSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = () => {
    setError(null);
    sendingData.skills = sendingData.skills.filter(
      (field) => field.name && field.experience_in_years,
    );
    if (!sendingData?.skills.length) {
      sendingData.skills = [{name: "", experience_in_years: ""}];
    }
    mutateAsync(sendingData);
  };

  const debouncedSearch = debounce((value) => getOptionsForSearch(value), 500);

  const getOptionsForSearch = (search) => {
    if (search.length !== 0) {
      const results = fuse.search(search);
      let newResults = [];

      results.forEach(
        (x, index) =>
          index <= 49 && newResults.push({ label: x.item, value: x.item }),
      );

      setSkillsOptions(newResults);
    } else {
      setSkillsOptions([]);
    }
  };

  const handleAddSkill = () => {
      const updatedSkills = [...sendingData.skills];
      updatedSkills.push({...skillsFieldValues, id: uuid()});

    resetField("skill_name");
    setSendingData(prev => ({...prev, skills: updatedSkills}));
    setSkillsFieldValues({name: "", experience_in_years: ""});
  };

  const handleRemoveSkill = (id) => {
    const copySkillsArr = [...sendingData.skills];
    const updatedSkills = copySkillsArr.filter(skill => skill.id !== id);

    setSendingData(prev => ({...prev, skills: updatedSkills}));
  };

  const isEmpty = () => !sendingData?.skills.length
    && !sendingData?.resumes.length
    && !sendingData?.additional_questions?.find(item => item.value)
    && !skillsFieldValues?.name.trim()
    && !skillsFieldValues?.experience_in_years;

  useEffect(() => {
    if (state) {
      setSendingData({
        resumes: [],
        additional_questions: [],
        skills: [],
        is_update: false,
      });
    }
    if (data) {
      const additional_questions = [];
      for (let i = 0; i < data.data.length; i++) {
        additional_questions.push({
          additional_question_id: data.data[i].id,
          value: '',
        });
      }
      setSendingData((prev) => ({ ...prev, additional_questions }));
    }
  }, [data, state]);

  useEffect(() => {
    setError(null);
    setValidFields([]);
    setSkillsFieldValues({name: "", experience_in_years: ""});
  }, [state]);

  return (
    <Dialog open={state} onClose={onClose} maxWidth='lg' fullWidth>
      <DialogTitle
        sx={{
          px: 4,
          pt: 2.5,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
        bgcolor={'#F4F7FA'}
      >
        <Typography variant='h6'>
          Quick Questions to Help You Automate Your Job Application Process
        </Typography>

        <Typography
          variant='body2'
          color={'text.secondary'}
          component={'p'}
          mt={0.5}
        >
          {
            'To get started, just answer a few quick questions about your skills, experience, and desired job.'
          }
          <br />
          {
            "We'll use your answers to match you with relevant job openings and automatically fill out your applications."
          }
        </Typography>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ bgcolor: '#F4F7FA', pt: 1, pb: 2, px: 4 }}>
          <Typography
            variant='subtitle1'
            mb={1}
            ml={1}
            color={'text.secondary'}
          >
            • Job Application Information
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormCard
              variant='outlined'
              status='invalid'
              valid={!!sendingData.resumes.length}
              required={!!sendingData.resumes.length || error?.resumes}
            >
              <Typography variant='subtitle2'>
                Upload your up to date resume: (Required)
              </Typography>
              <UploadButtons setFile={handleSetFile} />
            </FormCard>
          </Stack>
          <Stack mt={2}>
            <FormCard
              variant='outlined'
              width='25%'
              valid={sendingData.skills.some(
                (skill) => skill.name && skill.experience_in_years,
              )}
              required={
                sendingData.skills.some(
                  (skill) => skill.name && skill.experience_in_years,
                ) || error?.skills
              }
            >
              <Typography variant='subtitle2'>
                List your skills and years of experience for each skill
                (Required)
              </Typography>
              <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ alignItems: 'flex-end' }}
              >
                <Autocomplete
                  noOptionsText={!skillsFieldValues?.name ? 'Type to search' : 'No options'}
                  getOptionLabel={(option) => option.label || ""}
                  options={skillsOptions}
                  inputValue={skillsFieldValues?.name}
                  value={skillsFieldValues?.name}
                  disableClearable={!skillsFieldValues?.name}
                  onChange={(e, value) =>
                    setSkillsFieldValues(prev => ({...prev, name: value? value.label : ""}))
                  }
                  sx={{ mt: 1.5, width: '40%' }}
                  renderInput={(params) => (
                    <RHFTextField
                      {...params}
                      name={"skill_name"}
                      onChange={(e) => {
                        debouncedSearch(e.target.value);
                        setSkillsFieldValues(prev => ({...prev, name: e.target.value}))
                      }}
                      label={`Enter skill name ${!sendingData?.skills?.length ? '*' : ''}`}
                      variant={'standard'}
                    />
                  )}
                />
                <RHFTextField
                  sx={{ mt: 1.5, width: '25%', ml: 2 }}
                  name={"skill_experience_in_years"}
                  defaultValue={''}
                  value={skillsFieldValues.experience_in_years}
                  onChange={(e) => {
                    if (
                      /^[0-9]*$/.test(e.target.value) &&
                      e.target.value < 101
                    ) {
                      setSkillsFieldValues(prev => ({...prev, experience_in_years: e.target.value}))
                    }
                  }}
                  label={`Years of experience ${!sendingData?.skills?.length ? '*' : ''}`}
                  variant={'standard'}
                />
                <Button
                  variant='outlined'
                  sx={{ mt: 'auto' }}
                  size='small'
                  disabled={
                    skillsFieldValues.name === ""
                    || skillsFieldValues.experience_in_years.trim() === ""
                    || (!skillsOptions.find(option => option.value === skillsFieldValues?.name) && !!skillsFieldValues?.name)
                  }
                  onClick={handleAddSkill}
                >
                  Add Skill
                </Button>
              </Stack>
              {!!sendingData?.skills[0]?.name &&
                <Stack direction="row" sx={{flexWrap: 'wrap'}}>
                  {
                    sendingData?.skills.map(skill =>
                      <Chip
                        key={skill.id}
                        sx={{
                          bgcolor: "#EDF4FC",
                          "& .MuiChip-deleteIcon": {
                            color: "rgba(0, 0, 0, 0.87)",
                            height: 15,
                            width: 15
                          },
                          mt: 1.5,
                          mr: 1.2
                        }}
                        label={skill.name}
                        avatar={
                          <Avatar sx={{ height: 24, width: 24, bgcolor: "#D0E4FC" }}>
                            <Typography
                              sx={{
                                color: "#01579B",
                                fontSize: 12
                              }}
                            >
                              {skill.experience_in_years}y
                            </Typography>
                          </Avatar>
                        }
                        onDelete={() => {
                          handleRemoveSkill(skill.id)
                        }}
                      />
                    )
                  }
                </Stack>
              }
            </FormCard>
          </Stack>
          <Typography
            variant='subtitle1'
            mt={2}
            ml={1}
            color={'text.secondary'}
          >
            • Additional Questions
          </Typography>
          <Grid container spacing={1.5}>
            {data?.data.map((field, index) => (
              <Grid item xs={6} key={index}>
                <FormCard
                  variant='outlined'
                  valid={validFields.find((val) => val === field.id)}
                  required={
                    field.is_required &&
                    ((error?.additional_questions &&
                      error?.additional_questions[index]?.non_field_errors) ||
                      validFields.find((val) => val === field.id))
                  }
                >
                  <Typography variant='subtitle2'>
                    {field.title}
                    {field.is_required ? ' (Required)' : ''}
                  </Typography>
                  {field.type === 'radio' && (
                    <RHFRadioGroup
                      name={`additional_questions[${field.id.toString()}]`}
                      options={field.items}
                      onChange={(e) =>
                        handleChangeAdditionalQuestion(
                          index,
                          field.id,
                          e.target.value,
                        )
                      }
                      sx={{
                        mt: 1.5,
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  )}
                  {field.type === 'select' && (
                    <Autocomplete
                      multiple={false}
                      options={field.items}
                      defaultValue={''}
                      onChange={(event, newValue) =>
                        handleChangeAdditionalQuestion(
                          index,
                          field.id,
                          newValue?.value || '',
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ mt: 1.5 }}
                          name={`additional_questions[${field.id.toString()}]`}
                          label={field.placeholder}
                          variant={'standard'}
                        />
                      )}
                    />
                  )}
                  {field.type === 'number_input' && (
                    <RHFTextField
                      variant={'standard'}
                      type='text'
                      sx={{ mt: 0.75 }}
                      name={`additional_questions[${field.id.toString()}]`}
                      defaultValue={''}
                      value={sendingData?.additional_questions[index]?.value}
                      onChange={(e) => {
                        if (
                          /^[0-9]*$/.test(e.target.value) &&
                          e.target.value < 101
                        ) {
                          handleChangeAdditionalQuestion(
                            index,
                            field.id,
                            e.target.value,
                          );
                        }
                      }}
                      label={field.placeholder}
                    />
                  )}
                </FormCard>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton
            size='large'
            type='submit'
            variant='contained'
            loading={isSubmitting}
            disabled={isEmpty()}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
