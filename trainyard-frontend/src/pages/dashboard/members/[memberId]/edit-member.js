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
import { EditMemberForm } from 'src/sections/dashboard/members/edit-member-form';
import useSWR from 'swr';
import { memberApi } from 'src/api/members';

const EditMember = () => {
  const router = useRouter();
  const { memberId } = router.query;

  const handleEditMember = async (values) => {
    try {
      await memberApi.editMember(memberId, values);
      router.push(paths.dashboard.members.index);
    } catch (error) {
      console.error('Error editing member:', error);
      throw error;
    }
  };
  const {
    data,
    error: memberError,
    isValidating: isLoading,
  } = useSWR(memberId ? `${memberId}` : null, async (key) => {
    try {
      const response = await memberApi.getMemberById(key);
      return response?.data ?? 'not valid';
    } catch (error) {
      throw new Error('Failed to fetch member data');
    }
  });
  if (memberError) {
    // Handle error state
    return <div>Error: {memberError.message}</div>;
  }

  return (
    <>
      <Seo title="Dashboard: Edit Member" />
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
                  href={paths.dashboard.members.index}
                  variant="subtitle2"
                >
                  All Members
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Edit Member
                </Typography>
              </Breadcrumbs>
            </Stack>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <EditMemberForm
                member={data}
                onSubmit={handleEditMember}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
EditMember.getLayout = (EditMember) => <DashboardLayout>{EditMember}</DashboardLayout>;
export default EditMember;
