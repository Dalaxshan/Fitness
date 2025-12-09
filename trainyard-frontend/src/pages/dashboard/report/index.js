import React from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { MembersReport } from 'src/sections/dashboard/report/members-report';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { SystemHealth } from 'src/sections/dashboard/report/system.health';
import { CustomerCount } from 'src/sections/dashboard/report/customer-count';

const Page = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={8}
      >
        <MembersReport />
      </Grid>
      <Grid
        item
        xs={4}
        lg={4}
      >
        <SystemHealth />
      </Grid>
      <Grid
        item
        xs={12}
        lg={12}
      >
        <CustomerCount />
      </Grid>
    </Grid>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
