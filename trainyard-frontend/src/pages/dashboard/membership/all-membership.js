import React from 'react';
import { Seo } from 'src/components/seo';
import { Paper, Stack, Box, Grid, Typography, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import useSWR from 'swr';
import { MembershipsTable } from 'src/sections/dashboard/memberships/memberships-table';
import { membershipApi } from 'src/api/membership';

const AllMembership = () => {

  const { data, isLoading } = useSWR('membership-list', async () => {
    const response = await membershipApi.getAllMemberships();
    return response?.data || [];
  })

  return (
    <>
      <Seo title="All membership" />
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
              <Typography> {isLoading ? 'Loading...' : 'Memberships List'} </Typography>
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
                  href={paths.dashboard.membership.creatMembership}
                >
                  Add New
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <MembershipsTable
          items={data}
          isLoading={isLoading}
        />
      </Paper>
    </>
  );
};

AllMembership.getLayout = (allMembership) => <DashboardLayout>{allMembership}</DashboardLayout>;
export default AllMembership;
