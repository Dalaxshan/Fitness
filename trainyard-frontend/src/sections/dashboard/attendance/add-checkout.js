import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { attendanceApi } from 'src/api/attendance';
import { toast } from 'react-hot-toast';

const AddCheckout = ({ open, handleClose, member }) => {
  const [checkOut, setCheckOut] = useState(member?.checkOut || new Date());

  const handleCheckOutChange = (date) => {
    setCheckOut(date);
  };

  const handleEdit = async (id) => {
    try {
      await attendanceApi.updateAttendanceApi(id, {
        member: member.member._id,
        checkIn: member.checkIn,
        checkOut: new Date(checkOut).toISOString(),
      });

      handleClose();
      toast.success('Check-out updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating check-out:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Check-out Details</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={6}
          >
            <Typography variant="body1">First Name:</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography variant="body1">{member?.member?.firstName || 'N/A'}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography variant="body1">Last Name:</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography variant="body1">{member?.member?.lastName || 'N/A'}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography variant="body1">Check-in Time:</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography variant="body1">{member.checkIn}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography variant="body1">Check-out Time:</Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <DateTimePicker
              label="Check-out Time"
              onChange={handleCheckOutChange}
              value={checkOut}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
        >
          Close
        </Button>
        <Button
          onClick={() => handleEdit(member._id)}
          color="primary"
        >
          Check Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCheckout;
