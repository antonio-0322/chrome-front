import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  FormControl,
  useTheme,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
// components
import {
  FormProvider
} from '../../../components/hook-form';
// assets
import LinkedinLogo from '../../../assets/dashboard/general/linkedin-logo.png';
import GreenHouseLogo from '../../../assets/dashboard/general/greenhouse-logo.svg';
// icons
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';

// ----------------------------------------------------------------------

ChoosePlatformDialog.propTypes = {
  state: PropTypes.bool,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ChoosePlatformDialog({ state, onClose }) {
  const theme = useTheme();

  const ChoosePlatformDialogSchema = Yup.object().shape({});

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(ChoosePlatformDialogSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = () => {
    console.log(123)
  };

  return (
    <Dialog open={state} onClose={onClose} maxWidth='sm' fullWidth>
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
          Choose Platform to Apply
        </Typography>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ bgcolor: '#F4F7FA', pt: 1, pb: 2, px: 4 }}>
          <Grid container spacing={1.5} mt={1}>
            <Grid item xs={6}>
              <Card elevation={0} sx={{border: `1px solid ${theme.palette.grey[200]}`}}>
                <Box
                  px={3}
                  py={2}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                  borderBottom={`1px solid ${theme.palette.grey[200]}`}
                >
                  <Typography variant='h6'>
                    Easy Apply
                  </Typography>
                  <img src={LinkedinLogo} alt="Linkedin logo"/>
                </Box>
                <CardContent>
                  <Box height={'40px'}/>
                </CardContent>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  fullWidth
                  size={'large'}
                  sx={{textTransform: 'none', justifyContent: 'space-between', borderTopLeftRadius: 0, borderTopRightRadius: 0}}
                >
                  <Typography>
                    Apply with Linkedin
                  </Typography>
                  <ArrowForwardSharpIcon/>
                </Button>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card elevation={0} sx={{border: `1px solid ${theme.palette.grey[200]}`}}>
                <Box
                  px={3}
                  py={2}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                  borderBottom={`1px solid ${theme.palette.grey[200]}`}
                >
                  <Typography variant='h6'>
                    Greenhouse
                  </Typography>
                  <img src={GreenHouseLogo} alt="GreenHouse logo"/>
                </Box>
                <CardContent>
                  <FormControl fullWidth size="small">
                    <InputLabel id="attempting-apply">Attempting to apply</InputLabel>
                    <Select
                      labelId="attempting-apply"
                      id="attempting-apply-field"
                      label="Attempting to apply"
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  fullWidth
                  size={'large'}
                  sx={{textTransform: 'none', justifyContent: 'space-between', borderTopLeftRadius: 0, borderTopRightRadius: 0}}
                >
                  <Typography>
                    Apply with Greenhouse
                  </Typography>
                  <ArrowForwardSharpIcon/>
                </Button>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
