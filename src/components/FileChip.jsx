import PropTypes from 'prop-types';
// icons
import CancelIcon from '@mui/icons-material/Cancel';
// @mui
import {
  Typography,
  Button,
  Tooltip,
  Radio,
  styled,
  useTheme,
} from '@mui/material';

// ----------------------------------------------------------------------

FileChip.propTypes = {
  fileName: PropTypes.string,
  onDelete: PropTypes.func,
  withradio: PropTypes.bool,
  defaultFile: PropTypes.bool,
  selected: PropTypes.bool,
  defaultChecked: PropTypes.any,
  onSelect: PropTypes.any,
};


FileChip.defaultProps = {
  withradio: false,
};

// ----------------------------------------------------------------------

const FileChipElement = styled(Button)(({ theme, withradio, selected }) => ({
  color: '#000',
  padding: theme.spacing(
    withradio ? 0.1 : 0.7,
    1,
    withradio ? 0.1 : 0.7,
    withradio ? 0 : 1,
    ),
  borderColor: selected
  ? theme.palette.primary.lighter
  : theme.palette.grey[100],
  backgroundColor: selected ? theme.palette.primary.lighter : null,
}));

// ----------------------------------------------------------------------

export default function FileChip({
  fileName,
  onDelete,
  withradio,
  defaultFile,
  defaultChecked,
  onSelect,
  selected,
  ...other
}) {
  const theme = useTheme();
  return (
    <Tooltip
      title={
        defaultFile
          ? 'The default resume cannot be deleted. It is required for  job applying process'
          : ''
      }
      placement='right'
    >
      <FileChipElement
        {...other}
        variant={'outlined'}
        disableElevation
        component='div'
        size='small'
        selected={selected}
        withradio={withradio ? 'yes' : ''}
      >
        {withradio && (
          <Radio
            size='small'
            sx={{ p: '6px' }}
            checked={defaultChecked}
            onClick={onSelect}
          />
        )}

        <Typography
          variant='body2'
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
          onClick={onDelete}
          sx={{
            fontSize: '18px',
            ml: 1,
            color: defaultFile ? theme.palette.grey[400] : '#000',
          }}
        />
      </FileChipElement>
    </Tooltip>
  );
}
