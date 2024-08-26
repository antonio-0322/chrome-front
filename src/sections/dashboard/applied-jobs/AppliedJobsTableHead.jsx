import PropTypes from 'prop-types';
// @mui
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

AppliedJobsTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function AppliedJobsTableHead({
  order,
  orderBy,
  setOrder,
  headLabel,
  setPage,
  onRequestSort,
}) {
  const createSortHandler = (property) => {
    setPage(0);
    onRequestSort(property);
    orderBy === property
      ? order === 'asc'
        ? setOrder('desc')
        : setOrder('asc')
      : setOrder('asc');
  };

  return (
    <TableHead sx={{ mt: 1 }}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.hasSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={order}
                onClick={() => createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
