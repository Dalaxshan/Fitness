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
import { PackageEditForm } from 'src/sections/dashboard/memberships/edit-package-form';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { membershipApi } from 'src/api/membership';

const EditPackage = () => {
  const router = useRouter();
  const { id } = router.query;

  //edit package function
  const handleEditPackage = async (values) => {
    try {
      await membershipApi.editPackage(id, values);
      toast.success('Package updated successfully!');
      router.push(paths.dashboard.membership.allPackages);
    } catch (error) {
      console.error('Error editing package:', error);
      throw error;
    }
  };

  const {
    data,
    error: packageError,
    isValidating: isLoading,
  } = useSWR(id ? `${id}` : null, async (key) => {
    try {
      const response = await membershipApi.getPackageDetail(key);
      return response?.data ?? 'not valid';
    } catch (error) {
      throw new Error('Failed to fetch package data');
    }
  });

  if (packageError) {
    // Handle error state
    return <div>Error: {packageError.message}</div>;
  }

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
                  Edit Package
                </Typography>
              </Breadcrumbs>
            </Stack>

            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <PackageEditForm
                package={data}
                onSubmit={handleEditPackage}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

EditPackage.getLayout = (editPackage) => <DashboardLayout>{editPackage}</DashboardLayout>;
export default EditPackage;
