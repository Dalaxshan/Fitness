import { Paper, Stack, Box, Grid, Typography, Button } from '@mui/material';
import { trainerApi } from 'src/api/trainer';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { TrainerListTable } from 'src/sections/dashboard/trainers/trainer-list-table';
import useSWR from 'swr';

export const TrainerPage = () => {
  const { data, isLoading } = useSWR('all-trainers', async () => {
    const response = await trainerApi.getAllTrainer();
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
            <Typography> {isLoading ? 'Loading...' : 'Trainers'} </Typography>
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
                href={paths.dashboard.trainer.create}
              >
                Add New
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <TrainerListTable
        items={data}
        isLoading={isLoading}
      />
    </Paper>
  );
};

TrainerPage.getLayout = (trainerPage) => <DashboardLayout>{trainerPage}</DashboardLayout>;
export default TrainerPage;
