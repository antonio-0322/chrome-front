import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = ({ children, title = '', ref, ...other }) => (
  <>
    <title>{`${title} | AutoSubmit AI`}</title>
    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
  ref: PropTypes.node,
};

export default Page;
