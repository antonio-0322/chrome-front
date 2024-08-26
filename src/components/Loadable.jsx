import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

const Loader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1202,
        width: '100%',
      }}
    >
      <LinearProgress />
    </Box>
  );
};

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  // Assign a displayName to the returned component
  const componentName = Component.displayName || Component.name || 'Component';
  LoadableComponent.displayName = `Loadable(${componentName})`;

  return LoadableComponent;
};

export default Loadable;
