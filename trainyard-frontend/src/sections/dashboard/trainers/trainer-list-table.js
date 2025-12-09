import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';
import { Delete } from '@mui/icons-material';
import DeleteConfirmation from './deleteConfirmation';
import { useState } from 'react';

export const TrainerListTable = (props) => {
  const { items, isLoading } = props;
  const [trainerId, setId] = useState(null);
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
                <TableCell>NIC No</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Emergency ContactNo</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>Loading...</>
              ) : (
                items.map((trainer) => {
                  return (
                    <TableRow
                      key={trainer._id}
                      underline="none"
                      style={{ textDecoration: 'none' }}
                    >
                      <TableCell>
                        <Typography variant="subtitle2">{trainer.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{trainer.nicNo}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{trainer.contactNo}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{trainer.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{trainer.emergencyContactNo}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDelete(trainer._id)}
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

      {/* delete confirmation dialog */}
      <DeleteConfirmation
        id={trainerId}
        open={isDialogOpen}
        onClose={handleClose}
      />
    </>
  );
};

TrainerListTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
};
