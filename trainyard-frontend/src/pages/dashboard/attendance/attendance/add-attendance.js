import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

const health = [
  { text: 'Good', value: 'good' },
  { text: 'Excellent', value: 'excellent' },
  { text: 'Bad', value: 'bad' },
];

const status = [
  { text: 'Present', value: 'present' },
  { text: 'Absent', value: 'absent' },
];

export default function AddAttendance(props) {
  const { open, onClose } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //close dialog for checking purpose need to change
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{ p: 4 }}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Box sx={{ p: 3, width: '400px' }}>
        <Typography variant="h5">Add Attendance</Typography>
        <Divider sx={{ my: 3 }} />
        <form onSubmit={(event) => event.preventDefault()}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
            />
            <Autocomplete
              getOptionLabel={(health) => health.text}
              options={health}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Health Condition"
                  name="health"
                />
              )}
            />
            <Autocomplete
              getOptionLabel={(status) => status.text}
              options={status}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Status"
                  name="status"
                />
              )}
            />

            <DateTimePicker
              onChange={(newDate) => setStartDate(newDate)}
              label="Start date"
              value={startDate}
              showCalendar={false}
            />
            <DateTimePicker
              onChange={(newDate) => setEndDate(newDate)}
              label="End date"
              value={endDate}
            />
          </Stack>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="inherit"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ ml: 1 }}
              type="submit"
              variant="contained"
              onClick={handleClose}
            >
              Confirm
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
}
