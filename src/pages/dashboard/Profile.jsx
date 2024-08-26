import { useState } from 'react';
// @mui
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
  Avatar,
  styled,
  useTheme,
} from '@mui/material';
// components
import { Page } from '../../components';
// section
import {
  ProfileDetails,
  ProfileSubscription,
  UpdatePasswordDialog,
  UpdateDetailsDialog,
} from '../../sections/dashboard/profile';
import { useAuthStore } from '../../zustand/auth.store';
import { ApplyButton } from '../../sections/dashboard/@globals';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

// ----------------------------------------------------------------------

export default function Profile() {
  const theme = useTheme();
  const { userData } = useAuthStore();
  const [updatePasswordDialog, setUpdatePasswordDialog] = useState(false);
  const [updateDetailsDialog, setUpdateDetailsDialog] = useState(false);

  const updatePasswordDialogHandler = () => {
    setUpdatePasswordDialog(!updatePasswordDialog);
  };

  const updateDetailsDialogHandler = () => {
    setUpdateDetailsDialog(!updateDetailsDialog);
  };

  return userData ? (
    <Page title='Applied Jobs'>
      <Container>
        <ContentStyle>
          <Box
            display='flex'
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={2}
          >
            <Box
              display='flex'
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Avatar
                sx={{
                  bgcolor: '#A3C7F7',
                  width: 56,
                  height: 56,
                  fontWeight: 500,
                  borderRadius: 2,
                  color: theme.palette.primary.dark,
                }}
              >
                {userData.first_name[0]}
                {userData.last_name[0]}
              </Avatar>
              <Box pl={2.5}>
                <Typography variant='h5'>Account Profile</Typography>
                <Typography variant='body2' color={'text.secondary'}>
                  Manage your personal information
                </Typography>
              </Box>
            </Box>
            {!!userData?.job_search_filters?.length && <ApplyButton />}
          </Box>
          <Divider sx={{ borderColor: theme.palette.grey[300] }} />
          <Grid container spacing={2} mt={0.5}>
            <Grid item sm={6}>
              <ProfileDetails
                userData={userData}
                passwordAction={updatePasswordDialogHandler}
                detailsAction={updateDetailsDialogHandler}
              />
            </Grid>
            <Grid item sm={6}>
              <ProfileSubscription userData={userData} />
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
      <UpdatePasswordDialog
        onClose={updatePasswordDialogHandler}
        state={updatePasswordDialog}
      />
      <UpdateDetailsDialog
        userData={userData}
        onClose={updateDetailsDialogHandler}
        state={updateDetailsDialog}
      />
    </Page>
  ) : (
    <></>
  );
}
