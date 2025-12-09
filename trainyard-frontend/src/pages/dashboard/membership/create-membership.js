import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { memberApi } from 'src/api/members';
import { membershipApi } from 'src/api/membership';

import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { CreateMembershipForm } from 'src/sections/dashboard/memberships/create-membership-form ';
import useSWR from 'swr';

const CreateMembership = () => {

    const { data: memberList, isLoading: isLoadingMembers } = useSWR('all-members', async () => {
        const response = await memberApi.getAllMembers();
        return response?.data || [];
    })

    const { data: packageList, isLoading: isLoadingPackages } = useSWR('package-list', async () => {
        const response = await membershipApi.getAllPackages();
        return response?.data || [];
    })

    return (
        <>
            <Seo title="Dashboard: Create Memberships" />
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
                                    href={paths.dashboard.membership.allMembership}
                                    variant="subtitle2"
                                >
                                    All Memberships
                                </Link>
                                <Typography
                                    color="text.secondary"
                                    variant="subtitle2"
                                >
                                    Create Membership
                                </Typography>
                            </Breadcrumbs>
                        </Stack>
                        <CreateMembershipForm
                            memberList={memberList}
                            packageList={packageList}
                            isLoadingMembers={isLoadingMembers}
                            isLoadingPackages={isLoadingPackages}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

CreateMembership.getLayout = (createMembership) => <DashboardLayout>{createMembership}</DashboardLayout>;
export default CreateMembership;
