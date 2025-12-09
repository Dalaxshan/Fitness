import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';

import { format } from 'date-fns';
import dayjs from 'dayjs';

export const MembershipsTable = (props) => {
  const { items, isLoading } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <Scrollbar>
        {isLoading ? (
          <>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              Loading...
            </Stack>
          </>
        ) : (
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Member Name</TableCell>
                <TableCell>Package Name</TableCell>
                <TableCell>Membership Price</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Expiry</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const packageName = item.packageId?.name || 'Package Not Found';

                const startDate = item.startDate
                  ? format(new Date(item.startDate), 'dd MMM yy')
                  : 'N/A';
                const endDate = item.endDate ? format(new Date(item.endDate), 'dd MMM yy') : 'N/A';

                return (
                  <TableRow
                    hover
                    key={item._id}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                      >
                        {`${item.memberId?.firstName} ${item.memberId?.lastName}` || 'N/A'}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{packageName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{item.totalAmount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{`${startDate} - ${endDate}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{`${dayjs(new Date(endDate)).toNow()}`}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Scrollbar>
    </Box>
  );
};

MembershipsTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
};
