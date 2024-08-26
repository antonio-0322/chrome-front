import { PropTypes } from 'prop-types';
// @mui
import { Grid } from '@mui/material';
// components
import { OnboardingCard, Iconify } from '../../../components';
import { useAuthStore } from '../../../zustand/auth.store';

// ----------------------------------------------------------------------

Onboarding.propTypes = {
  setUpResume: PropTypes.func,
  setUpLinkedin: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function Onboarding({ setUpResume, setUpLinkedin }) {
  const { userData } = useAuthStore();
  const CARDS_CONFIGS = [
    {
      title: 'Set Up Your Resume',
      icon: <Iconify icon={'ic:twotone-badge'} sx={{ fontSize: 32 }}></Iconify>,
      buttonLabel: 'Set Up Resume',
      action: setUpResume,
      completed: userData?.resumes?.length,
      check_info: [
        {
          text: 'Upload your up to date resume.',
        },
        {
          text: 'We apply to the jobs that best matches your resume',
        },
        {
          text: 'Your privacy is our top priority. Your resume is only shared with the job postings',
        },
      ],
    },
    {
      title: 'Start Applying Your LinkedIn',
      icon: <Iconify icon={'mdi:linkedin'} sx={{ fontSize: 32 }}></Iconify>,
      buttonLabel: 'Start Applying',
      action: setUpLinkedin,
      completed: false,
      check_info: [
        {
          text: 'We apply to the best job matches',
        },
        {
          text: 'We automatically fill in all the details based on your resume',
        },
        {
          text: 'Make sure you have a complete profile with up to date details',
        },
        {
          text: 'Make sure you are logged in to your Linkedin',
        },
      ],
    },
  ];

  return (
    <Grid container spacing={3} mt={0}>
      {CARDS_CONFIGS.map((item, index) => (
        <Grid item md={6} key={index}>
          <OnboardingCard
            isDisabled={!userData?.resumes?.length && index === 1}
            title={item.title}
            stepNumber={index + 1}
            points={item.check_info}
            onClick={item.action}
            icon={item.icon}
            completed={item.completed}
            buttonLabel={item.buttonLabel}
          />
        </Grid>
      ))}
    </Grid>
  );
}
