import React from 'react';
import { Paper, Stack, Box, Grid, Typography, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { AdminListTable } from 'src/sections/dashboard/admin/admin-list-table';
import { adminApi } from 'src/api/admin';
import useSWR from 'swr';

export const AdminPage = () => {
  const { data, isLoading } = useSWR('admins', async () => {
    const response = await adminApi.getAllAdmin();
    return response?.data ?? [];
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
            <Typography> {isLoading ? 'Loading...' : 'Admin Users'} </Typography>
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
                href={paths.dashboard.admin.create}
              >
                Add New
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <AdminListTable
        items={data ?? []}
        isLoading={isLoading}
      />
    </Paper>
  );
};

AdminPage.getLayout = (adminPage) => <DashboardLayout>{adminPage}</DashboardLayout>;
export default AdminPage;
