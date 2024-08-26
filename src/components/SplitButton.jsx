import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PropTypes } from 'prop-types';
// @mui
import {
  MenuList,
  MenuItem,
  Popper,
  Paper,
  ButtonGroup,
  Button,
  Grow,
  Box,
  ClickAwayListener,
} from '@mui/material';
// icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useQuery } from 'react-query';
import { SetupApi } from '../api/Setup/setup.services';
import { useAuthStore } from '../zustand/auth.store';
import { useExtensionInfoStore } from '../zustand/extensionInfo';
import { EXTENSION_ID } from '../utils/variablesFromEnv';

// ----------------------------------------------------------------------

SplitButton.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  light: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function SplitButton({ label, children, light }) {
  const { setIsExtension } = useExtensionInfoStore();
  const { userData } = useAuthStore();
  const handleInfoPopover = useOutletContext();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [needExtension, setNeedExtension] = useState(false);

  const checkExt = async () => {
    try {
      // eslint-disable-next-line no-undef
      await chrome.runtime.sendMessage(
        EXTENSION_ID,
        'checkExtension',
        (response) => {
          if (response === 'extension_available') {
            if (!userData?.active_subscription) handleInfoPopover();
            setNeedExtension(false);
          } else {
            setNeedExtension(true);
          }
        },
      );
    } catch (error) {
      console.log(error)
      setNeedExtension(true);
    }
  };

  useQuery('check-ext', checkExt);

  const { refetch: getUrl } = useQuery(
    'get-job-search-url',
    () => SetupApi.getSearchJobUrl('linkedin'),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: async (linkedinUrl) => {
        // eslint-disable-next-line no-undef
        try {
          const jobTitles = linkedinUrl?.data?.job_titles;
          console.log('start')
          // eslint-disable-next-line no-undef
          chrome.runtime.sendMessage(EXTENSION_ID, {
            accessToken: localStorage.getItem('accessToken'),
            titles: jobTitles ? JSON.stringify(jobTitles) : [],
          });
          console.log('end')

          window.open(linkedinUrl?.data?.url,"_blank");
        } catch (e) {
          setIsExtension(false);
          console.log('ERRROR NO EXTENSION', e);
        }
      },
    },
  );

  const handleGetUrl = () => {
    const { enableToApply } = handleInfoPopover(true);
    if (enableToApply && userData?.active_subscription) {
      getUrl();
    }
  };

  const handleToggle = () => {
    needExtension ? setIsExtension(false) : setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='split button'
      >
        <Button
          onClick={needExtension ? () => setIsExtension(false) : handleGetUrl}
          variant={light ? 'white' : 'contained'}
          sx={light && { borderColor: '#bdbdbd !important' }}
        >
          {label}
        </Button>
        <Button
          variant={light && 'white'}
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
          sx={light && { p: 1, bgcolor: '#F5F5F5' }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 9999,
        }}
        placement='bottom-end'
        open={open}
        anchorEl={anchorRef?.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'left bottom',
            }}
          >
            <Paper sx={{ mt: 1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Box onClick={handleClose}>{children}</Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
