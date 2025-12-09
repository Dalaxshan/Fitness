import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { memberApi } from 'src/api/members';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { MemberActivity } from 'src/sections/dashboard/members/member-activity';
import { MemberDetails } from 'src/sections/dashboard/members/member-details';
import { MemberPackage } from 'src/sections/dashboard/members/member-package';
import useSWR from 'swr';

const ViewMember = () => {
  const router = useRouter();
  const { memberId } = router.query;

  const { data, error: memberError } = useSWR(memberId ? `${memberId}` : null, async (key) => {
    try {
      const response = await memberApi.getMemberById(key);
      return response?.data ?? 'not valid';
    } catch (error) {
      throw new Error('Failed to fetch admin data');
    }
  });

  if (memberError) {
    return (
      <div>
        <p>Error:{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Seo title="Dashboard: View Member" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 11,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.index}
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.members.index}
                  variant="subtitle2"
                >
                  All Members
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  View Member
                </Typography>
              </Breadcrumbs>
            </Stack>
          </Stack>
        </Container>
        <Stack
          spacing={4}
          sx={{
            flexGrow: 1,
            py: 3,
            px: 3,
          }}
        >
          <Grid container>
            <Grid
              xs={12}
              lg={12}
            >
              <MemberDetails member={data} />
            </Grid>

            {/* <Grid
              xs={12}
              lg={6}
            >
              <MemberActivity />
            </Grid>
            <Grid
              xs={12}
              lg={6}
            >
              <MemberPackage />
            </Grid> */}
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

ViewMember.getLayout = (viewMember) => <DashboardLayout>{viewMember}</DashboardLayout>;
export default ViewMember;
