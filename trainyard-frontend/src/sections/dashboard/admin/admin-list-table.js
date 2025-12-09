import PropTypes from 'prop-types';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/components/router-link';
import { Scrollbar } from 'src/components/scrollbar';
import { paths } from 'src/paths';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import DeleteConfirmation from './deleteConfirmation';

export const AdminListTable = (props) => {
  const { items, isLoading } = props;
  const [adminId, setId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (id) => {
    setDialogOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>Loading...</>
              ) : (
                items.map((admin) => {
                  return (
                    <TableRow
                      hover
                      key={admin._id}
                    >
                      <TableCell>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={1}
                        >
                          {admin.name}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{admin.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{admin.role}</Typography>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          component={RouterLink}
                          href={paths.dashboard.admin.edit.replace(':id', admin._id)}
                        >
                          <SvgIcon>
                            <Edit02Icon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(admin._id)}
                          style={{ color: 'red' }}
                        >
                          <SvgIcon>
                            <Delete />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>

      <DeleteConfirmation
        id={adminId}
        open={isDialogOpen}
        onClose={handleClose}
      />
    </>
  );
};

AdminListTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
};
