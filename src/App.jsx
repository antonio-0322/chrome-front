import { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import Router from './routes';
import ThemeProvider from './theme';
import { Box, CircularProgress } from '@mui/material';

function App() {

  return (
    <>
      <Helmet>
        {
          import.meta.env.VITE_APP_ENVIRONMENT === "production"
          ? <meta name="google-site-verification" content="BJsTzpifgWuJL12CxEy-bkBnSkr6fiSc7BCTpqXVK7g" />
          : <meta name="robots" content="noindex, nofollow" />
        }
      </Helmet>
      <ThemeProvider>
        <Suspense
          fallback={
            <Box
              sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Router />
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
