import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// @mui
import {
  Box,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Popover,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// icons
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DateRangeIcon from '@mui/icons-material/DateRange';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dateFormat from '../../../utils/dateShortcuts';
import moment from 'moment';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro';
// ----------------------------------------------------------------------

TableToolbar.propTypes = {
  onClick: PropTypes.func,
  setSearchValue: PropTypes.func,
  setPage: PropTypes.func,
  setDateRange: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function TableToolbar({
  setSearchValue,
  setPage,
  setDateRange,
}) {
  const [calendarValue, setCalendarValue] = useState(null);
  const [current, setCurrent] = useState('all');

  const ToolbarSchema = Yup.object().shape({});

  const defaultValues = {
    search: '',
  };

  const methods = useForm({
    resolver: yupResolver(ToolbarSchema),
    defaultValues,
  });

  const { getValues, setValue } = methods;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPicker = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    setSearchValue(getValues().search);
    setPage(0);
  };

  const handleChangeRange = () => {
    if (typeof current === 'string' && current !== 'justify') {
      let range;
      const formattedData = dateFormat(Date.now(), true);
      switch (current) {
        case 'today':
          range = formattedData[0].formattedValue;
          break;
        case 'week':
          range = formattedData[1].formattedValue;
          break;
        case 'month':
          range = formattedData[2].formattedValue;
          break;
        default:
          range = '';
      }
      setDateRange({
        created_at__gte: `${range[0]} 00:00:00`,
        created_at__lte: `${range[1]} 23:59:59`,
      });
      setPage(0);
    }
  };

  useEffect(() => {
    if (current !== 'all') {
      handleChangeRange();
    } else {
      setDateRange({
        created_at__gte: '',
        created_at__lte: '',
      });
    }
  }, [current]);

  return (
    <FormProvider methods={methods}>
      <Box
        elevation={0}
        variant='outlined'
        sx={{
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <RHFTextField
          sx={{ maxWidth: 'calc(100% - 460px)' }}
          name='search'
          size='small'
          variant='outlined'
          label='Search by Job Title'
          value={getValues().search}
          onChange={(e) => {
            setValue('search', e.target.value);
            handleSearch();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <ToggleButtonGroup
          value={current}
          exclusive
          color='primary'
          aria-label='text alignment'
          size='medium'
          onChange={(e) => {
            setCurrent(e.target.value);
            e.target.value && setCalendarValue(null);
          }}
        >
          <ToggleButton value='all' aria-label='left aligned'>
            All
          </ToggleButton>
          <ToggleButton value='today' aria-label='centered'>
            Today
          </ToggleButton>
          <ToggleButton value='week' aria-label='right aligned'>
            This Week
          </ToggleButton>
          <ToggleButton value='month' aria-label='justified'>
            This Month
          </ToggleButton>
          <ToggleButton
            value='justify'
            aria-label='justified'
            onClick={handleOpenPicker}
          >
            <DateRangeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClosePicker}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <DateCalendar
              value={calendarValue}
              onChange={(value) => {
                setCalendarValue(value);
                setPage(0);
                setDateRange({
                  created_at__gte: `${moment(value.$d).format(
                    'YYYY-MM-DD',
                  )} 00:00:00`,
                  created_at__lte: `${moment(value.$d).format(
                    'YYYY-MM-DD',
                  )} 23:59:59`,
                });
              }}
            />
          </Popover>
        </LocalizationProvider>
      </Box>
    </FormProvider>
  );
}
