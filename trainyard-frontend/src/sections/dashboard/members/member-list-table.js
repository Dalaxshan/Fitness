import React from 'react';
import PropTypes from 'prop-types';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { SeverityPill } from 'src/components/severity-pill';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card, Stack } from '@mui/material';

const columns = [
  {
    field: 'firstName',
    headerName: 'Name',
    width: 200,
    renderCell: ({ row }) => (
      <Typography variant="subtitle2">{row?.firstName + ' ' + row?.lastName}</Typography>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'contactNumber',
    headerName: 'Contact No.',
    width: 150,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 125,
  },
  {
    field: 'vehileRegNo',
    headerName: 'Vehicle No.',
    width: 125,
  },
  {
    field: 'hasHealthIssues',
    headerName: 'Health',
    width: 75,
    renderCell: (params) => (
      <SeverityPill color={params.value ? 'success' : 'error'}>
        {params.value ? 'Good' : 'Bad'}
      </SeverityPill>
    ),
  },
  {
    field: '_id',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <IconButton
        component={RouterLink}
        href={paths.dashboard.members.edit.replace(':memberId', params.value)}
      >
        <SvgIcon>
          <Edit02Icon />
        </SvgIcon>
      </IconButton>
    ),
  },
];

export const MemberListTable = (props) => {
  const { items = [], isLoading } = props;

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
              frepla,
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

MemberListTable.propTypes = {
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
