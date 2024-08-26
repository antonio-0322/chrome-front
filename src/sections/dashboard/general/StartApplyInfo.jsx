// @mui
import {Box, Typography, Card, Avatar, useTheme, Button} from '@mui/material';
// icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import greenhouse_icon from '../../../assets/icons/greenhouse_icon.png';
// sections
import {ApplyButton} from '../@globals';
// images
import LogoSymbol from '../../../assets/icons/logo_symbol_vector.svg';
// dialogs
import {ChoosePlatformDialog} from "./";
import {useState} from "react";

// ----------------------------------------------------------------------

export default function StartApplyInfo() {
  const theme = useTheme();
  const [choosePlatformDialog, setChoosePlatformDialog] = useState(false);

  const choosePlatformDialogHandler = () => {
    setChoosePlatformDialog(!choosePlatformDialog);
  }

  return (
    <>
      <Card
        elevation={0}
        variant='outlined'
        sx={{
          py: 2,
          px: 3,
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
          backgroundImage: `url(${LogoSymbol})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: 'center',
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#fff',
            width: 38,
            height: 38,
            fontWeight: 500,
            borderRadius: 1,
            mr: 1.3,
            color: theme.palette.primary.main,
          }}
        >
          <LinkedInIcon/>
        </Avatar>
        <Avatar
          sx={{
            bgcolor: '#fff',
            width: 38,
            height: 38,
            fontWeight: 500,
            borderRadius: 1,
            color: theme.palette.primary.main,
          }}
        >
          <img alt={"Greenhouse"} src={greenhouse_icon}/>
        </Avatar>

        <Typography pl={2} variant='h5' color={'white'}>
          Start Applying for Your Dream Job
        </Typography>

        <Box sx={{ml: 'auto'}}>
          <ApplyButton light/>
        </Box>
      </Card>

      <ChoosePlatformDialog onClose={choosePlatformDialogHandler} state={choosePlatformDialog}/>
    </>
  );
}
