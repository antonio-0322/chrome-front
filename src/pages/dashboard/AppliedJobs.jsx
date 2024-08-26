import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Box,
  Divider,
  TableContainer,
  Table,
  Card,
  TablePagination,
} from '@mui/material';
// components
import { Page } from '../../components';
// sections
import {
  TableToolbar,
  AppliedJobsTableHead,
  AppliedJobsTableBody,
} from '../../sections/dashboard/applied-jobs';
import { ApplyButton } from '../../sections/dashboard/@globals';
import { JobApplyingApi } from '../../api/JobApplying/job_applying.services';
import { useAuthStore } from '../../zustand/auth.store';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'platform', label: 'Source', alignRight: false, hasSort: false },
  { id: 'title', label: 'Job Title', alignRight: false, hasSort: true },
  { id: 'created_at', label: 'Date', alignRight: false, hasSort: true },
  { id: 'company', label: 'Company', alignRight: false, hasSort: true },
  { id: 'status', label: 'Status', alignRight: false, hasSort: true },
];

// ----------------------------------------------------------------------

export default function AppliedJobs() {
  const { userData } = useAuthStore();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(null);
  const [order, setOrder] = useState('asc');
  const [page_size, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState({
    created_at__gte: '',
    created_at__lte: '',
  });
  const [tableData, setTableData] = useState([]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const { data, refetch, remove } = useQuery(
    ['get_applied_jobs'],
    ({ signal }) => {
      return JobApplyingApi.getAppliedJobs({
        page: page + 1,
        page_size,
        orderBy: order === 'asc' ? orderBy : `-${orderBy}`,
        searchValue,
        dateRange,
        signal,
      });
    },
    { refetchOnWindowFocus: false, enabled: false },
  );

  useEffect(() => {
    remove();
    refetch();
  }, [page, page_size, order, orderBy, dateRange.created_at__gte]);

  useEffect(() => {
    if (data?.data.results) {
      setTableData(data?.data.results);
    }
  }, [data]);

  let timeoutId;

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      refetch();
    }, 1000);
  }, [searchValue]);

  useEffect(() => {
    if (data?.data.count) setPageCount(data.data.count);
  }, [data?.data.count]);

  return (
    <Page title='Applied Jobs'>
      <Container>
        <ContentStyle>
          <Box
            display='flex'
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={2}
          >
            <Typography variant='h5'>Applied Jobs</Typography>
            {!!userData?.job_search_filters?.length && <ApplyButton />}
          </Box>
          <Divider />
          <TableToolbar
            setSearchValue={setSearchValue}
            setPage={setPage}
            setDateRange={setDateRange}
          />

          <Card>
            <TableContainer>
              <Table>
                <AppliedJobsTableHead
                  order={order}
                  setOrder={setOrder}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={setOrderBy}
                  setPage={setPage}
                  rowCount={page_size}
                />

                <AppliedJobsTableBody data={tableData} />
              </Table>
            </TableContainer>

            {!tableData?.length ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 3,
                }}
              >
                <Typography>No data to show</Typography>
              </Box>
            ) : (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={pageCount}
                rowsPerPage={page_size}
                page={page}
                onPageChange={(event, value) => {
                  setPage(value);
                }}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Card>
        </ContentStyle>
      </Container>
    </Page>
  );
}
