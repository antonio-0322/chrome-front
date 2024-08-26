import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Button, Stack, useTheme, Typography } from '@mui/material';
// components
import { FileChip } from './';
// icons
import CancelIcon from '@mui/icons-material/Cancel';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useMutation, useQuery } from 'react-query';
import { SetupApi } from '../api/Setup/setup.services';
import { AuthApi } from '../api/Auth/auth.services';
import { useAuthStore } from '../zustand/auth.store';
import { useOutletContext } from 'react-router-dom';
import { useExtensionInfoStore } from '../zustand/extensionInfo';
import { EXTENSION_ID } from '../utils/variablesFromEnv';

// ---------------------------------------------------------------------

export function UploadButtons({ setFile }) {
  const theme = useTheme();
  const [fileName, setFileName] = useState(null);

  const handleFileUpload = (event) => {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setFileName(file.name);
        setFile(file.name, reader.result, true);
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const deleteFileHandler = () => {
    setFileName(null);
    setFile('', '', false);
  };

  return (
    <Stack mt={3} display={'block'}>
      {!fileName ? (
        <label htmlFor='upload-image'>
          <Button
            variant='outlined'
            color='primary'
            component='span'
            sx={{ borderStyle: 'dashed' }}
          >
            Upload resume
            <FileUploadOutlinedIcon sx={{ ml: 1 }} />
          </Button>
          <input
            id='upload-image'
            hidden
            accept='.doc, .docx, .pdf'
            type='file'
            onChange={handleFileUpload}
          />
        </label>
      ) : (
        <Button
          variant='outlined'
          component='div'
          sx={{
            borderRadius: 1,
            color: '#000',
            borderColor: theme.palette.grey[100],
          }}
        >
          <Typography
            sx={{
              overflow: 'hidden',
              maxWidth: '300px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              textTransform: 'none',
            }}
          >
            {fileName}
          </Typography>

          <CancelIcon
            onClick={deleteFileHandler}
            color='#000'
            sx={{ fontSize: '18px', ml: 1 }}
          />
        </Button>
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

FileUploadMultiple.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func,
  disablePreview: PropTypes.bool,
};

FileUploadMultiple.defaultProps = {
  disablePreview: false,
};

// ----------------------------------------------------------------------

export function FileUploadMultiple({
  sendingData,
  files,
  setFiles,
  disablePreview,
}) {
  const handleInfoPopover = useOutletContext();
  const { setUserData, setUserState, userData } = useAuthStore();
  const { setIsExtension } = useExtensionInfoStore();

  const { refetch } = useQuery('get-user-data', AuthApi.retrieveUserData, {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (succeedData) => {
      setUserState('auth');
      setUserData(succeedData.data);
      if (
        !succeedData.data.active_subscription &&
        !succeedData.data.has_used_free_subscription
      ) {
        mutateAsync();
      }
    },
    onError: () => {
      setUserState('not-auth');
    },
  });

  const { mutateAsync } = useMutation(
    'upload-new-resume',
    SetupApi.setupUserResume,
    { onSuccess: () => refetch() },
  );

  const sendResume = (file, result) => {
    const changingData = sendingData;
    const resume = { display_name: file.name, file: result };
    changingData.resumes = [resume];
    mutateAsync(changingData);
  };

  const handleFileUpload = (event) => {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        sendResume(file, reader.result);
        document.getElementById('edit-resume').value = null;
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const deleteFileHandler = (fileName) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
  };

  const checkExt = async () => {
    try {
      // eslint-disable-next-line no-undef
      await chrome.runtime.sendMessage(
        EXTENSION_ID,
        'checkExtension',
        (response) => {
          if (response === 'extension_available') {
            if (!userData?.active_subscription) {
              handleInfoPopover();
            } else {
              document.getElementById('edit-resume').disabled = false;
              document.getElementById('edit-resume').click();
              document.getElementById('edit-resume').disabled = true;
            }
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

  return (
    <Stack display={'block'}>
      <label htmlFor='edit-resume'>
        <Button
          variant='outlined'
          color='primary'
          component='span'
          sx={{ borderStyle: 'dashed' }}
          onClick={() => checkExt()}
        >
          Upload resume
          <FileUploadOutlinedIcon sx={{ ml: 1 }} />
        </Button>
        <input
          id='edit-resume'
          hidden
          disabled
          accept='.doc, .docx, .pdf'
          type='file'
          onChange={handleFileUpload}
        />
      </label>
      {!disablePreview &&
        files.map((file, index) => (
          <FileChip
            fileName={file.name}
            key={index}
            defaultFile={files.length === 1}
            onDelete={() => deleteFileHandler(file.name)}
          />
        ))}
    </Stack>
  );
}
