import { useEffect, useState } from 'react';
import {isEqual} from 'lodash';
// @mui
import {
  Box,
  Typography,
  Chip,
  Grid,
  Avatar,
  Stack,
  Card,
  useTheme,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';

// components
import {
  FormCardView,
  FileUploadMultiple,
  FileChip,
} from '../../../components';
// icons
import InfoIcon from '@mui/icons-material/Info';
import { useAuthStore } from '../../../zustand/auth.store';
import { useMutation, useQuery } from 'react-query';
import { SetupApi } from '../../../api/Setup/setup.services';

import { v4 as uuid } from 'uuid';
import { AuthApi } from '../../../api/Auth/auth.services';
import { JobApplyingApi } from '../../../api/JobApplying/job_applying.services';

import Skills from '../../../utils/skills.json';
import debounce from 'lodash.debounce';
import Fuse from 'fuse.js';
import { FormProvider } from '../../../components/hook-form';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { useExtensionInfoStore } from '../../../zustand/extensionInfo';
import { EXTENSION_ID } from '../../../utils/variablesFromEnv';

const RenderModalContent = ({
  type,
  fieldData,
  setFieldData,
  clearErrors,
  errors,
  setError,
  isSubmitted,
  isSubmitting,
  setSkillsDraftNotValid
}) => {
  const handleChangeAnswer = (value) => {
    setFieldData((prev) => ({ ...prev, value: value || '' }));
  };
  switch (type) {
    case 'skills':
      return (
        <SkillsForm
          errors={errors}
          fieldData={fieldData}
          setError={setError}
          setFieldData={setFieldData}
          clearErrors={clearErrors}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          setSkillsDraftNotValid={setSkillsDraftNotValid}

        />
      );
    case 'radio':
      return (
        <Grid variant='outlined' width='100%'>
          <Typography variant='h6' mb={3}>
            {`${fieldData.additional_question.title} ${
              fieldData.additional_question.is_required ? '(Required)' : ''
            }`}
          </Typography>
          <RadioGroup
            row
            value={fieldData.value}
            onChange={(e) => handleChangeAnswer(e.target.value)}
          >
            {fieldData.additional_question.items.map((option, index) => (
              <FormControlLabel
                key={option?.value}
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
            {`${fieldData.additional_question.title} ${
              fieldData.additional_question.is_required ? '(Required)' : ''
            }`}
          </Typography>
          <Autocomplete
            multiple={false}
            options={fieldData.additional_question.items}
            defaultValue={fieldData.value}
            onChange={(event, newValue) => handleChangeAnswer(newValue?.value)}
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
    case 'number_input':
      return (
        <Grid variant='outlined' width='100%'>
          <Typography variant='h6' mb={2}>
            {`${fieldData.additional_question.title} ${
              fieldData.additional_question.is_required ? '(Required)' : ''
            }`}
          </Typography>
          <TextField
            variant={'standard'}
            type='text'
            fullWidth
            sx={{ mt: 0.75 }}
            name={`additional_questions[${fieldData.additional_question.id.toString()}]`}
            value={fieldData.value}
            error={
              isSubmitted &&
              errors[
                `additional_questions-${fieldData.additional_question.id.toString()}`
              ]
            }
            helperText={
              isSubmitted
                ? errors[
                    `additional_questions-${fieldData.additional_question.id.toString()}`
                  ]?.message
                : '  '
            }
            onChange={(e) => {
              !e.target.value
                ? setError(
                    `additional_questions-${fieldData.additional_question.id.toString()}`,
                    { message: 'This field is required.' },
                  )
                : clearErrors(
                    `additional_questions-${fieldData.additional_question.id.toString()}`,
                  );
              if (/^[0-9]*$/.test(e.target.value) && e.target.value < 101) {
                handleChangeAnswer(e.target.value);
              }
            }}
            label={fieldData.additional_question.placeholder}
          />
        </Grid>
      );
    default: {
    }
  }
};

// ----------------------------------------------------------------------

const UploadResume = ({ selectedResume, sendingData, filesData }) => {
  const theme = useTheme();
  const handleInfoPopover = useOutletContext();
  const { setUserData, setUserState, userData } = useAuthStore();
  const [files, setFiles] = useState([]);
  const { setIsExtension } = useExtensionInfoStore();

  const { refetch } = useQuery('get-user-data', AuthApi.retrieveUserData, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setUserState('auth');
      setUserData(succeedData.data);
    },
  });

  const { mutateAsync } = useMutation(
    'update-application-info',
    SetupApi.setupUserResume,
    { onSuccess: () => refetch() },
  );

  const { mutateAsync: changeDefaultResume } = useMutation(
    'change-default-resume',
    JobApplyingApi.changeDefaultResume,
    { onSuccess: () => refetch() },
  );

  const deleteFileHandler = async (fileId) => {
    sendingData.deleted_resumes = [fileId];
    await mutateAsync(sendingData);
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
  };

  const invokeFunction = async (func) => {
    try {
      // eslint-disable-next-line no-undef
      await chrome.runtime.sendMessage(
        EXTENSION_ID,
        'checkExtension',
        (response) => {
          if (response === 'extension_available') {
            !userData?.active_subscription ? handleInfoPopover() : func();
          } else {
            setIsExtension(false);
          }
        },
      );
    } catch (e) {
      console.log(e);
      setIsExtension(false);
    }
  };

  useEffect(() => {
    if (filesData) setFiles(filesData);
  }, [filesData, selectedResume.id]);

  return (
    <Card
      sx={{ width: '100%', position: 'relative', padding: 1.5 }}
      variant='outlined'
    >
      <Stack
        mb={2.5}
        display={'flex'}
        direction={'row'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Box>
          <Typography variant='subtitle2'>
            Upload your up to date resume: (Required)
          </Typography>
          <Typography
            mt={2}
            variant='body2'
            display={'flex'}
            alignItems={'center'}
            color={'text.secondary'}
          >
            <InfoIcon
              sx={{ fontSize: 18, color: theme.palette.grey[400], mr: 0.5 }}
            />
            Please note that the selected resume will be used for bulk applying
            to jobs that match your skills and experience.
          </Typography>
        </Box>
        <FileUploadMultiple
          sendingData={sendingData}
          files={files}
          setFiles={setFiles}
          disablePreview={true}
        />
      </Stack>
      {files.map((file) => (
        <FileChip
          sx={{ mr: 1.5, mb: 0.5 }}
          fileName={file.display_name}
          key={file.id}
          selected
          defaultFile={selectedResume.id === file.id}
          defaultChecked={selectedResume.id === file.id}
          onSelect={() => invokeFunction(() => changeDefaultResume(file.id))}
          withradio
          onDelete={() =>
            selectedResume.id === file.id
              ? null
              : invokeFunction(() => deleteFileHandler(file.id))
          }
        />
      ))}
    </Card>
  );
};

// ----------------------------------------------------------------------

const SkillsForm = ({
  fieldData,
  setFieldData,
  clearErrors,
  errors,
  setError,
  isSubmitted,
  isSubmitting,
  setSkillsDraftNotValid
}) => {
  const theme = useTheme();
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [data, setData] = useState([]);

  const buttonStyles = {
    mt: 'auto',
    alignSelf: 'center',
    color: theme.palette.error.dark,
    borderColor: theme.palette.error.dark,
    '&:hover': {
      backgroundColor: theme.palette.error[100],
      borderColor: theme.palette.error.dark,
    },
  };

  const options = {
    includeScore: true,
    useExtendedSearch: true,
  };
  const fuse = new Fuse(Skills['skills'], options);

  const debouncedSearch = debounce((value) => getOptionsForSearch(value), 500);

  const getOptionsForSearch = (search) => {
    if (search && search.length !== 0) {
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

  const disableAddButton = (index) => data[0].name.trim() === ""
    || data[0].experience_in_years === ""
    || !skillsOptions.find(item => item.value === data[index]?.name);

  const filterSkillsFields = () => {
    const nonEmptyFields = data.some(
      (element) => element.name || element.experience_in_years,
    )
      ? data.filter((field) => field.name || field.experience_in_years)
      : [data[0]];
    if (
      nonEmptyFields[0].experience_in_years !== '' &&
      nonEmptyFields[0].name !== ''
    ) {
      clearErrors();
    }
    setData(nonEmptyFields);
  };

  useEffect(() => {
    if (isSubmitting) filterSkillsFields();
  }, [isSubmitting]);

  const validateSkillsField = (id, name, value) => {
    const validatingElement = data.find((element) => element.id === id);

    if (
      id === data[0].id &&
      !data.some((element) => element.name || element.experience_in_years)
    ) {
      !value
        ? setError(name, { message: 'This field is required.' })
        : clearErrors(name);
    }
    if (
      data.some((element) => element.name || element.experience_in_years) &&
      (validatingElement?.name || validatingElement?.experience_in_years)
    ) {
      !value
        ? setError(name, { message: 'This field is required.' })
        : clearErrors(name);
    }
  };

  useEffect(() => {
    setData([{id: uuid(), name: "", experience_in_years: ""} , ...fieldData]);
    if (data?.some((field) => field.name && field.experience_in_years)) {
      clearErrors();
    }
  }, [fieldData]);

  useEffect(() => {
    data[0]?.name === "" && data[0]?.experience_in_years === ""
      ? setSkillsDraftNotValid(false)
      : setSkillsDraftNotValid(true)
  },[data])

  return (
    <Grid variant='outlined' width='100%'>
      <Typography variant='h6' mb={3}>
        List your skills and years of experience for each skill (Required)
      </Typography>

      {data.map((skill, index) => (
        <Stack
          key={skill.id}
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ alignItems: 'flex-end' }}
        >
          <Autocomplete
            noOptionsText={data[0]["name"] === "" ? "Type to search" : "No options"}
            disableClearable={skill?.name === ""}
            getOptionLabel={(option) => option.label}
            options={skillsOptions}
            value={{
              label: data[index].name.toString(),
              value: data[index].name.toString(),
            }}
            onChange={(e, item) => {
              validateSkillsField(
                skill.id,
                `${skill.id}-skill_name`,
                item?.value,
              );
              setData((prev) => {
                prev[index].name = item ? item.value : '';
                return [...prev];
              });
            }}
            sx={{ width: '40%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                name={`${skill.id}-skill_name`}
                error={!!errors[`${skill.id}-skill_name`] && isSubmitted}
                helperText={
                  isSubmitted ? errors[`${skill.id}-skill_name`]?.message : '  '
                }
                onChange={(e) => {
                  debouncedSearch(e.target.value);
                  setData((prev) => {
                    prev[index].name = e.target.value;
                    return [...prev];
                  });
                }}
                label={`Enter skill name ${index === (data?.length - 1) ? '*' : ''}`}
                variant={'standard'}
                value={params?.inputProps?.value ?? ''}
              />
            )}
          />

          <TextField
            sx={{ mt: 1.5, width: '25%', ml: 2 }}
            name={`${skill.id}-experience_in_years`}
            error={!!errors[`${skill.id}-experience_in_years`] && isSubmitted}
            helperText={
              isSubmitted
                ? errors[`${skill.id}-experience_in_years`]?.message
                : '  '
            }
            value={skill.experience_in_years}
            onChange={(e) => {
              validateSkillsField(
                skill.id,
                `${skill.id}-experience_in_years`,
                e.target?.value,
              );
              if (/^[0-9]*$/.test(e.target.value) && e.target.value < 101) {
                setData((prev) => {
                  prev[index].experience_in_years = e.target.value;
                  return [...prev];
                });
              }
            }}
            label={`Years of experience ${index === (data?.length - 1) ? '*' : ''}`}
            variant={'standard'}
          />
          <Button
            variant='outlined'
            disabled={disableAddButton(index) && index === 0}
            sx={index === 0 ? { mt: 'auto', alignSelf: 'center'} : buttonStyles}
            size='small'
            onClick={() => {
              index === 0
                ? !disableAddButton(index) && setFieldData((prev) => [
                    data[0],
                    ...prev
                  ])
                : (setFieldData((prev) => [
                    ...prev.filter((item) => item.id !== skill.id),
                  ]),
                  setFieldData((prev) =>
                    prev.filter((item) => item.id !== skill.id),
                  ));
            }}
          >
            {index === 0 ? 'Add Skill' : 'Delete Skill'}
          </Button>
        </Stack>
      ))}
    </Grid>
  );
};

// ----------------------------------------------------------------------

export default function EditResumeForm() {
  const theme = useTheme();
  const handleInfoPopover = useOutletContext();
  const { setUserData, setUserState, userData } = useAuthStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [infoData, setInfoData] = useState([]);
  const [sendingData, setSendingData] = useState(null);
  const [fieldData, setFieldData] = useState(null);
  const [fieldType, setFieldType] = useState('');
  const [skillsDraftNotValid, setSkillsDraftNotValid] = useState(false);
  const { setIsExtension } = useExtensionInfoStore();

  const { refetch } = useQuery('get-user-data', AuthApi.retrieveUserData, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setUserState('auth');
      setUserData(succeedData.data);
    },
  });

  const onCloseModal = () => setModalOpen(false);

  const { mutateAsync } = useMutation(
    'edit-resume-form',
    SetupApi.setupUserResume,
    {
      onSuccess: () => {
        setModalOpen(false);
        refetch();
      },
    },
  );

  const handleSaveChange = () => {
    const copyOfData = { ...sendingData };
    fieldData.additional_question
      ? (copyOfData.additional_questions = copyOfData.additional_questions.map(
          (item) =>
            Number(item.additional_question_id) ===
            Number(fieldData.additional_question.id)
              ? { ...item, value: fieldData.value }
              : item,
        ))
      : ((copyOfData.skills = fieldData),
        (copyOfData.skills = copyOfData.skills.filter(
          (field) => field.name && field.experience_in_years,
        )),
        !copyOfData.skills.length &&
          (copyOfData.skills = [{ name: '', experience_in_years: '' }]));
    mutateAsync(copyOfData);
  };

  const createStructuredData = () => {
    const info = [
      {
        title: '• Job Application Information',
        customComponent: (
          <UploadResume
            selectedResume={userData.selected_resume}
            sendingData={sendingData}
            filesData={userData.resumes}
          />
        ),
        cards: [
          {
            column: 12,
            title:
              'List your skills and years of experience for each skill (Required)',
            options: sendingData.skills.map((skill) => ({
              label: skill.name,
              avatar: skill.experience_in_years,
            })),
            field: sendingData.skills,
            type: 'skills',
          },
        ],
      },
      {
        title: '• Additional Questions',
        cards: userData.additional_questions.map((question) => ({
          column: 6,
          title: `${question.additional_question.title} ${
            question.additional_question.is_required ? '(Required)' : ''
          }`,
          options: [{ label: question.value || 'Not specified' }],
          field: question,
          type: question.additional_question.type,
        })),
      },
    ];
    setInfoData(info);
  };

  const handleOpenEditModal = async (fieldData, type) => {
    try {
      // eslint-disable-next-line no-undef
      await chrome.runtime.sendMessage(
        EXTENSION_ID,
        'checkExtension',
        (response) => {
          if (response === 'extension_available') {
            userData?.active_subscription
              ? (setFieldData(fieldData),
                setFieldType(type),
                setModalOpen(true))
              : handleInfoPopover();
          } else {
            setIsExtension(false);
          }
        },
      );
    } catch (e) {
      setIsExtension(false);
    }
  };

  const clickSaveForbidden = () =>
    !fieldData?.length
    || skillsDraftNotValid
    || fieldData.find(item => item?.name.trim() === "" || item?.experience_in_years === "");


  const methods = useForm({});

  const {
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = methods;

  const onSubmit = async () => {
    handleSaveChange();
  };

  useEffect(() => {
    if (sendingData) createStructuredData();
  }, [sendingData]);

  useEffect(() => {
    if (userData) {
      setSendingData({
        skills: JSON.parse(JSON.stringify(userData)).skills,
        additional_questions: userData.additional_questions.map((item) => ({
          additional_question_id: item.additional_question.id,
          value: item.value,
        })),
        resumes: [],
        is_update: true,
        deleted_resumes: [],
      });
    }
  }, [userData]);

  useEffect(() => {
    reset();
  }, [isModalOpen]);

  return (
    <>
      {infoData.map((item) => (
        <Box my={2} key={item.title}>
          {item.title && (
            <Typography
              variant='subtitle1'
              mb={1}
              ml={1}
              color={'text.secondary'}
            >
              {item.title}
            </Typography>
          )}
          <Grid container spacing={1.5}>
            <Grid item sm={12}>
              {item.customComponent}
            </Grid>
            {item?.cards?.map((card) => (
              <Grid item sm={card.column} key={card.title}>
                <FormCardView
                  variant='outlined'
                  status='invalid'
                  valid={'true'}
                  title={card.title}
                  onClick={() =>
                    handleOpenEditModal(
                      JSON.parse(JSON.stringify(card.field)),
                      card.type,
                    )
                  }
                >
                  {card.options.map((chip) => (
                    <Chip
                      key={chip.label}
                      size='medium'
                      avatar={
                        chip.avatar && (
                          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                            {chip.avatar}
                          </Avatar>
                        )
                      }
                      label={chip.label}
                      sx={{
                        bgcolor: theme.palette.primary.lighter,
                        mr: 1,
                        mb: 0.5,
                      }}
                    />
                  ))}
                </FormCardView>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Dialog
        open={isModalOpen}
        onClose={onCloseModal}
        sx={{ maxWidth: '744px', width: '100%', m: 'auto' }}
        fullWidth
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{ backgroundColor: '#F4F7FA', pt: 5, pb: 2, px: 4 }}
          >
            <RenderModalContent
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              isSubmitted={isSubmitted}
              isSubmitting={isSubmitting}
              fieldData={fieldData}
              type={fieldType}
              setFieldData={setFieldData}
              setSkillsDraftNotValid={setSkillsDraftNotValid}
            />
          </DialogContent>
          <DialogActions
            sx={{ px: 4, pt: 1, pb: 2, backgroundColor: '#F4F7FA' }}
          >
            <Button onClick={onCloseModal}>Cancel</Button>
            <Button size='large' type='submit' variant='contained' disabled={clickSaveForbidden()}>
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
