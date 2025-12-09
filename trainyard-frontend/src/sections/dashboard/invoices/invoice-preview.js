import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Logo } from 'src/components/logo';

export const InvoicePreview = (props) => {
  const { billing, ...other } = props;

  const dueDate = format(new Date(billing?.dueDate), 'dd MMM yyyy')
  const issueDate = format(new Date(billing?.issuedDate), 'dd MMM yyyy')
  const subtotalAmount = billing?.totalAmount;
  const totalAmount = billing?.totalAmount;

  return (
    <Card
      {...other}
      sx={{ p: 6 }}
    >
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <div>
          <Box
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24,
            }}
          >
            <Logo />
          </Box>
        </div>
        <div>
          <Typography
            align="right"
            color="success.main"
            variant="h4"
          >
            {billing.status === 'paid' ? 'PAID' : 'DUE'}
          </Typography>
          <Typography
            align="right"
            variant="subtitle2"
          >
            {billing.invoiceNumber}
          </Typography>
        </div>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid
            xs={12}
            md={4}
          >
            <Typography variant="body2">
              One Galle Face Mall
              <br />
              No 1 Centre Road,
              <br />
              Colombo 00200
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Typography variant="body2">
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Typography
              align="right"
              variant="body2"
            >
              accounts@trainyard.com
              <br />
              011 793 3669
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid
            xs={12}
            md={6}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
            >
              Due date
            </Typography>
            <Typography variant="body2">{dueDate}</Typography>
          </Grid>
          <Grid
            xs={12}
            md={6}
            sx={{ textAlign: 'right' }}
          >
            <Typography
              gutterBottom
              variant="subtitle2"
            >
              Date of issue
            </Typography>
            <Typography variant="body2">{issueDate}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography
          gutterBottom
          variant="subtitle2"
        >
          Billed to
        </Typography>
        <Typography variant="body2">
          {billing?.customerName}
          <br />
          {billing?.customerMobile}
          <br />
          {billing?.customerAddress}
        </Typography>
      </Box>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={"0090"}>
            <TableCell>{1}</TableCell>
            <TableCell>{billing.description}</TableCell>
            <TableCell>{1}</TableCell>
            <TableCell>{totalAmount}</TableCell>
            <TableCell align="right">{totalAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{ borderBottom: 'none' }}
            />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Subtotal</Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{ borderBottom: 'none' }}
            >
              <Typography variant="subtitle2">{subtotalAmount}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{ borderBottom: 'none' }}
            />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{ borderBottom: 'none' }}
            >
              <Typography variant="subtitle2">{totalAmount}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <Box sx={{ mt: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
        >
          Notes
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Please make sure you have the right bank registration number as I had issues before and
          make sure you guys cover transfer expenses.
        </Typography>
      </Box> */}
    </Card>
  );
};

InvoicePreview.propTypes = {
  billing: PropTypes.object.isRequired,
};
