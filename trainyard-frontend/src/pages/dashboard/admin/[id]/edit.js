import React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { Seo } from 'src/components/seo';
import { useRouter } from 'next/router';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { EditAdminForm } from 'src/sections/dashboard/admin/edit-admin-form';
import { adminApi } from 'src/api/admin';
import useSWR from 'swr';

const EditAdmin = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleEditAdmin = async (values) => {
    try {
      await adminApi.editAdmin(id, values);
      router.push(paths.dashboard.admin.index);
    } catch (error) {
      console.error('Error editing admin:', error);
      throw error;
    }
  };

  const {
    data,
    error: adminError,
    isValidating: isLoading,
  } = useSWR(id ? `${id}` : null, async (key) => {
    try {
      const response = await adminApi.getAdminById(key);
      return response?.data ?? 'not valid';
    } catch (error) {
      throw new Error('Failed to fetch admin data');
    }
  });

  if (adminError) {
    // Handle error state
    return <div>Error: {adminError.message}</div>;
  }

  return (
    <>
      <Seo title="Dashboard: Edit Admin" />
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
                  href={paths.dashboard.admin.index}
                  variant="subtitle2"
                >
                  All Admins
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Edit Admin
                </Typography>
              </Breadcrumbs>
            </Stack>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <EditAdminForm
                admin={data}
                onSubmit={handleEditAdmin}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

EditAdmin.getLayout = (EditAdmin) => <DashboardLayout>{EditAdmin}</DashboardLayout>;
export default EditAdmin;
