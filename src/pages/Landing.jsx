import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Container,
  Typography,
  Button,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Stack } from '@mui/system';
// components
import { Page } from '../components';
// images
import DemoPng from '../assets/landing/DemoPng.png';
// routes
import { PATH_AUTH } from '../routes/paths';
import { VITE_EXTENSION_URL } from '../utils/variablesFromEnv';
import LogoCarousel from '../components/LogoCarousel';

// ----------------------------------------------------------------------

export default function Landing() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <Page title='Login'>
      <Stack
        height={'100%'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={isMobile ? '1rem' : '2rem'}
      >
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'1rem'}
        >
          <Typography
            variant={'h3'}
            align='center'
            fontWeight={800}
            sx={{
              [theme.breakpoints.down('md')]: {
                fontSize: '2.0rem',
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '3rem',
              },
            }}
          >
            The Future of Job Applications is Here
          </Typography>
          <Typography
            component={'p'}
            align='center'
            fontWeight={400}
            sx={{
              [theme.breakpoints.down('md')]: {
                fontSize: '1rem',
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '1.2rem',
              },
            }}
          >
            Employ AI for automating the job application process.
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'2rem'}
        >
          <Link to={PATH_AUTH.register} component={RouterLink}>
            <Button variant='contained' size={isMobile ? 'medium' : 'large'}>
              Get Started
            </Button>
          </Link>

          <a href={VITE_EXTENSION_URL} target='_blank' rel='noreferrer'>
            <Button variant='outlined' size={isMobile ? 'medium' : 'large'}>
              Add to chrome
            </Button>
          </a>
        </Stack>
        <Container
          style={{
            position: 'relative',
            width: isMobile ? "100%" : "50%",
          }}
        >
          <video
            preload='auto'
            playsInline
            muted
            autoPlay
            loop
            style={{
              boxShadow: '1px 12px 50px 5px rgba(133,165,213,0.25)',
              borderRadius: '1rem',
              maxWidth: '100%',
              height: 'auto',
            }}
            alt='AutoSubmit AI Demo'
          >
            <source
              src='https://res.cloudinary.com/drmgdzhje/video/upload/f_auto:video,q_auto/d5bkby1qpon6cgvxmdhx'
              type='video/mp4'
            />
            <img src={DemoPng} alt='AutoSubmit Screenshot' />
          </video>
        </Container>
      </Stack>
      <LogoCarousel />
    </Page>
  );
}
