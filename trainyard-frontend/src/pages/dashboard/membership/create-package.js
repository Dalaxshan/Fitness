import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { PackageCreateForm } from 'src/sections/dashboard/memberships/create-package-form';

const CreatePackage = () => {
  return (
    <>
      <Seo title="Dashboard: Product Create" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
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
                  href={paths.dashboard.membership.allPackages}
                  variant="subtitle2"
                >
                  All Packages
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Create Package
                </Typography>
              </Breadcrumbs>
            </Stack>
            <PackageCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

CreatePackage.getLayout = (createPackage) => <DashboardLayout>{createPackage}</DashboardLayout>;
export default CreatePackage;
