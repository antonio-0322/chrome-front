import { Dialog, DialogContent, MenuItem, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { pxToRem } from '../utils/getFontValue';
import { PlayCircleRounded } from '@mui/icons-material';
import { Stack } from '@mui/system';

const VideoDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: '24px',
  },
});

function FullDemo() {
  const [videoModal, setVideoModal] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <MenuItem
        onClick={() => setVideoModal(true)}
        sx={{
          ml: 1,
          mr: 1,
          fontSize: pxToRem(16),
          color: 'primary.main',
        }}
      >
        <Stack direction={isMobile ? "row-reverse" : "row"} gap="0.5rem">
          <PlayCircleRounded />
          Watch demo
        </Stack>
      </MenuItem >
      <VideoDialog
        open={videoModal}
        onClose={() => setVideoModal(false)}
        maxWidth={false}
      >
        <DialogContent
          sx={{
            overflowY: 'hidden',
            width: '1000px',
            height: '650px',
            padding: 0,
            borderRadius: '24px',
            border: 'none',
          }}
        >
          <iframe
            width='100%'
            height='100%'
            frameBorder='0'
            src='https://www.youtube.com/embed/YuZxfWGawx8'
            allowFullScreen
          />
        </DialogContent>
      </VideoDialog>
    </>
  )
}

export { FullDemo }
