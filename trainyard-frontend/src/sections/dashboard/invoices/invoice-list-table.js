import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { SeverityPill } from 'src/components/severity-pill';
import { paths } from 'src/paths';
import { getInitials } from 'src/utils/get-initials';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function formatDate(input) {
  const date = new Date(input);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleString('en-US', options);
}

const statusColorsMap = {
  canceled: 'error',
  paid: 'success',
  pending: 'warning',
};

const columns = [
  {
    field: 'invoiceNumber',
    headerName: 'Invoice Number',
    width: 250,
    renderCell: ({ row }) => (
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        component={RouterLink}
        href={paths.dashboard.invoices.details.replace(':id', row._id)}
        sx={{
          display: 'inline-flex',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <Avatar
          sx={{
            height: 42,
            width: 42,
          }}
        >
          {getInitials(row.customerName)}
        </Avatar>
        <div>
          <Typography
            color="text.primary"
            variant="subtitle2"
          >
            {row.invoiceNumber}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {row.customerName}
          </Typography>
        </div>
      </Stack>
    )
  },
  {
    field: 'totalAmount',
    headerName: 'Total Amount',
    width: 150,
  },
  {
    field: 'issuedDate',
    headerName: 'Issued Date',
    width: 150,
    renderCell: (params) => (
      <Typography variant="subtitle2">
        {formatDate(params.value)}
      </Typography>
    ),
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 150,
    renderCell: (params) => (
      <Typography variant="subtitle2">
        {formatDate(params.value)}
      </Typography>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Created Date',
    width: 150,
    renderCell: (params) => (
      <Typography variant="subtitle2">
        {formatDate(params.value)}
      </Typography>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => (
      <SeverityPill color={statusColorsMap[params.value]}>{params.value}</SeverityPill>
    ),
  },
  {
    field: '_id',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <IconButton
        component={RouterLink}
        href={paths.dashboard.invoices.details.replace(':id', params.value)}
      >
        <SvgIcon>
          <ArrowRightIcon />
        </SvgIcon>
      </IconButton>
    ),
  },
];

export const InvoiceListTable = (props) => {
  const {
    items = [],
    isLoading,
  } = props;

  return (
    <Stack spacing={4}>
      <Card>
        <DataGrid
          rowHeight={75}
          rows={items}
          columns={columns}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Card>
    </Stack>
  );
};

InvoiceListTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
};
