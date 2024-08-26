import { PropTypes } from 'prop-types';
// @mui
import {
  Box,
  Radio,
  RadioGroup,
  ListItem,
  List,
  ListItemButton,
  FormControlLabel,
} from '@mui/material';
// components
import { SplitButton } from '../../../components';
import { useAuthStore } from '../../../zustand/auth.store';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { JobApplyingApi } from '../../../api/JobApplying/job_applying.services';
import { AuthApi } from '../../../api/Auth/auth.services';

// ----------------------------------------------------------------------

ApplyButton.propTypes = {
  light: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
};

// ----------------------------------------------------------------------

export default function ApplyButton({ light }) {
  const { setUserData, setUserState, userData } = useAuthStore();
  const [selected, setSelected] = useState(
    userData?.selected_resume?.id || null,
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
    'change-default-resume',
    JobApplyingApi.changeDefaultResume,
    { onSuccess: () => refetch() },
  );

  const handleChangeDefaultResume = (id) => mutateAsync(id);

  useEffect(() => {
    setSelected(userData?.selected_resume?.id);
  }, [userData?.selected_resume?.id]);

  return (
    <SplitButton label={'Start Applying'} light={light}>
      <Box sx={{ py: 0 }}>
        <RadioGroup>
          <List>
            {userData?.resumes?.map((option) => (
              <ListItem disablePadding key={option}>
                <ListItemButton sx={{ py: 0.5 }}>
                  <FormControlLabel
                    checked={selected === option.id}
                    onChange={() => handleChangeDefaultResume(option.id)}
                    value={option.id}
                    control={<Radio size='small' />}
                    label={option.display_name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </RadioGroup>
      </Box>
    </SplitButton>
  );
}
