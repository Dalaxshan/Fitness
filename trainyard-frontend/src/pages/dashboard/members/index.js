import { Paper, Stack, Box, Grid, Typography, Button } from '@mui/material';
import { memberApi } from 'src/api/members';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { MemberListTable } from 'src/sections/dashboard/members/member-list-table';
import useSWR from 'swr';

export const MemberPage = () => {
  const { data, isLoading } = useSWR('all-members', async () => {
    const response = await memberApi.getAllMembers();
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
            <Typography>{'All Members'} </Typography>
          </Grid>

          <Grid
            item
            xs={9}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent={'flex-end'}
            >
              <Grid
                item
                xs={3}
              />

              <Button
                variant="contained"
                href={paths.dashboard.members.create}
              >
                Add New
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <MemberListTable
        items={data}
        isLoading={isLoading}
      />
    </Paper>
  );
};

MemberPage.getLayout = (memberPage) => <DashboardLayout>{memberPage}</DashboardLayout>;
export default MemberPage;
