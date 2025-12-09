import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';
import TablePagination from '@mui/material/TablePagination';
import { format } from 'date-fns';

export const AttendanceListTable = (props) => {
  const { items, isLoading } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  return (
    <Box sx={{ position: 'relative' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Member Full Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading || items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography
                    variant="body2"
                    align="center"
                  >
                    {isLoading ? 'Loading...' : 'No data available'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((attendance) => {
                  const checkInDate = attendance.checkIn
                    ? format(new Date(attendance.checkIn), ' hh:mm a')
                    : 'N/A';
                  const checkOutDate = attendance.checkOut
                    ? format(new Date(attendance.checkOut), ' hh:mm a')
                    : 'N/A';

                  return (
                    <TableRow
                      key={attendance._id}
                      hover
                    >
                      <TableCell>
                        <Typography variant="subtitle2">
                          {attendance.member.firstName} {attendance.member.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{attendance.status}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{`${checkInDate}`}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{`${checkOutDate}`}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

AttendanceListTable.propTypes = {
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
