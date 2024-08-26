import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const getStatusChip = (status, theme) => {
  switch (status) {
    case 'created':
      return {
        label: 'In Progress',
        icon: <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />,
        avatarColor: theme.palette.primary.light,
        chipColor: theme.palette.primary.lighter,
      };
    case 'canceled':
      return {
        label: 'Cancelled',
        icon: <CancelIcon sx={{ color: theme.palette.common.black }} />,
        avatarColor: theme.palette.darkgrey,
        chipColor: theme.palette.lightgrey,
      };
    case 'failed':
      return {
        label: 'Failed',
        icon: <ErrorIcon sx={{ color: theme.palette.error.main }} />,
        avatarColor: theme.palette.error.light,
        chipColor: theme.palette.error.lighter,
      };
    case 'success':
    case 'applied':
      return {
        label: 'Applied',
        icon: <CheckCircleIcon sx={{ color: theme.palette.success.main }} />,
        avatarColor: theme.palette.success.light,
        chipColor: theme.palette.success.lighter,
      };
    default:
      return {};
  }
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const timeString = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes
    .toString()
    .padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

  return `${day} ${month} ${year} / ${timeString}`;
};
