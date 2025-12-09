import { Paper, Stack, Box, Grid, Typography, Button } from '@mui/material';
import { attendanceApi } from 'src/api/attendance';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { AttendanceListTable } from 'src/sections/dashboard/attendance/attendance-list-table';
import useSWR from 'swr';
import CheckIn from '../checkIn/check-in';
import CheckOut from '../check-out/check-out';

export const AttendancePage = () => {
  const { data, isLoading } = useSWR('attendances', async () => {
    const response = await attendanceApi.getAllAttendance();
    console.log('response is :', response.data);
    return response?.data || [];
  });

  return (
    <Paper sx={{ margin: 3, padding: 4 }}>
      <Box>
        <Grid
          container
          spacing={4}
          sx={{ marginBottom: 3 }}
        >
          <Grid
            item
            xs={3}
          >
            <Typography> {isLoading ? 'Loading...' : 'Attendances'} </Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={6}
        >
          <CheckIn />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <CheckOut />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <AttendanceListTable
            items={data ?? []}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

AttendancePage.getLayout = (attendancePage) => <DashboardLayout>{attendancePage}</DashboardLayout>;
export default AttendancePage;
