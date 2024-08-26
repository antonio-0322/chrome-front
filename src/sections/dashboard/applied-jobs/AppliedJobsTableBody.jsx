import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import {
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
  useTheme,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { formatDate, getStatusChip } from './utils';

// ----------------------------------------------------------------------

AppliedJobsTableBody.propTypes = {
  data: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default function AppliedJobsTableBody({ data }) {
  const theme = useTheme();
  return (
    <TableBody>
      {data?.map((row) => {
        const { id, platform, title, created_at, company, status, job_url } =
          row;

        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell>
              <Link to={job_url} target={'_blank'}>
                <Avatar sx={{ backgroundColor: theme.palette.grey[100] }}>
                  {platform === 'linkedin' ? (
                    <LinkedInIcon sx={{ color: theme.palette.linkedin }} />
                  ) : null}
                </Avatar>
              </Link>
            </TableCell>
            <TableCell>
              <Link to={job_url} target={'_blank'}>
                {title}
              </Link>
            </TableCell>
            <TableCell>{formatDate(created_at)}</TableCell>
            <TableCell>{company}</TableCell>
            <TableCell>
              <Chip
                sx={{ bgcolor: getStatusChip(status, theme)?.chipColor }}
                avatar={
                  <Avatar sx={{ bgcolor: getStatusChip(status, theme)?.avatarColor }}>
                    {getStatusChip(status, theme)?.icon}
                  </Avatar>
                }
                label={getStatusChip(status, theme)?.label}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
