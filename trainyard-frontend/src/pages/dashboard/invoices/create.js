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
import { CreateInvoiceForm } from '../../../sections/dashboard/invoices/create-invoice-form';
import useSWR from 'swr';
import { memberApi } from 'src/api/members';

const CreateInvoice = () => {
    const { data: memberList, isLoading: isLoadingMembers } = useSWR('all-members', async () => {
        const response = await memberApi.getAllMembers();
        return response?.data || [];
    })

    return (
        <>
            <Seo title="Dashboard: Create Invoice" />
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
                                    href={paths.dashboard.invoices.index}
                                    variant="subtitle2"
                                >
                                    All Invoices
                                </Link>
                                <Typography
                                    color="text.secondary"
                                    variant="subtitle2"
                                >
                                    Create Invoice
                                </Typography>
                            </Breadcrumbs>
                        </Stack>
                        <CreateInvoiceForm
                            memberList={memberList}
                            isLoadingMembers={isLoadingMembers}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

CreateInvoice.getLayout = (createInvoice) => <DashboardLayout>{createInvoice}</DashboardLayout>;
export default CreateInvoice;
