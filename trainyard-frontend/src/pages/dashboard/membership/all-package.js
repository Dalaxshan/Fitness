import React from 'react';
import { Paper, Stack, Box, Grid, Typography, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import useSWR from 'swr';
import { membershipApi } from 'src/api/membership';
import { PackageListTable } from 'src/sections/dashboard/memberships/package-table';

const AllPackage = () => {
  const { data, isLoading } = useSWR('package-list', async () => {
    const response = await membershipApi.getAllPackages();
    return response?.data || [];
  })

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
            <Typography> {isLoading ? 'Loading...' : 'Package List'} </Typography>
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
                href={paths.dashboard.membership.createPackage}
              >
                Add New
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <PackageListTable
        items={data}
        isLoading={isLoading}
      />
    </Paper>
  );
};

AllPackage.getLayout = (allPackages) => <DashboardLayout>{allPackages}</DashboardLayout>;
export default AllPackage;