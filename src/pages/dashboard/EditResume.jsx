import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Box,
  Divider,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
// components
import { Page } from '../../components';
// sections
import {
  EditResumeForm,
  SearchFiltersForm,
} from '../../sections/dashboard/edit-resume';
import { ApplyButton } from '../../sections/dashboard/@globals';
import { useAuthStore } from '../../zustand/auth.store';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

// ----------------------------------------------------------------------

export default function EditResume() {
  const { userData } = useAuthStore();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('set_up_resume');

  const RESUME_TABS = [
    {
      value: 'set_up_resume',
      label: 'Set Up Resume',
      component: <EditResumeForm />,
    },
    {
      value: 'search_filters',
      label: 'Search Filters',
      component: <SearchFiltersForm />,
    },
  ];

  return (
    <Page title='Applied Jobs'>
      <Container>
        <ContentStyle>
          <Box
            display='flex'
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={2}
          >
            <Typography variant='h5'>Job Application Manager</Typography>
            {!!userData?.job_search_filters?.length && <ApplyButton />}
          </Box>
          <Divider sx={{ borderColor: theme.palette.grey[300] }} />
          {!!userData?.job_search_filters?.length && (
            <Tabs
              sx={{ borderBottom: 1, borderColor: theme.palette.grey[300] }}
              value={currentTab}
              scrollButtons='auto'
              variant='scrollable'
              allowScrollButtonsMobile
              onChange={(e, value) => setCurrentTab(value)}
            >
              {RESUME_TABS.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          )}

          {RESUME_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </ContentStyle>
      </Container>
    </Page>
  );
}
