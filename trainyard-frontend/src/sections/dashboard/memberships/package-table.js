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
import { useState } from 'react';
import { RouterLink } from 'src/components/router-link';
import { Scrollbar } from 'src/components/scrollbar';
import { paths } from 'src/paths';
import { getPackageLabelByValue, packageDurationOptions } from './create-package-form';
import { Delete } from '@mui/icons-material';
import DeleteConfirmation from './deleteConfirmation';

export const PackageListTable = (props) => {
  const { items = [], isLoading } = props;
  const [packageId, setId] = useState(null);
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
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => {
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
                          {item.name}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{item.description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{item.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {getPackageLabelByValue(packageDurationOptions, item.duration)}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          component={RouterLink}
                          href={paths.dashboard.membership.editPackage.replace(':id', item._id)}
                        >
                          <SvgIcon>
                            <Edit02Icon />
                          </SvgIcon>
                        </IconButton>

                        <IconButton
                          onClick={() => handleDelete(item._id)}
                          style={{ color: 'red' }}
                        >
                          <SvgIcon>
                            <Delete />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Scrollbar>
      </Box>
      {/* delete confirmation dialog */}
      <DeleteConfirmation
        id={packageId}
        open={isDialogOpen}
        onClose={handleClose}
      />
    </>
  );
};

PackageListTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
};
