import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { invoicesApi } from 'src/api/invoices';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { InvoiceListContainer } from 'src/sections/dashboard/invoices/invoice-list-container';
import { InvoiceListTable } from 'src/sections/dashboard/invoices/invoice-list-table';
import useSWR from 'swr';
import { paths } from 'src/paths';

const Page = () => {
  const { data, isLoading } = useSWR('invoices', async () => {
    const response = await invoicesApi.getAllInvoices();
    return response?.data || [];
  })

  return (
    <>
      <Seo title="Dashboard: Invoice List" />
      <Divider />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <InvoiceListContainer open={true}>
            <Stack spacing={4}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <div>
                  <Typography variant="h4">All Invoices</Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    href={paths.dashboard.invoices.create}
                  >
                    New
                  </Button>
                </Stack>
              </Stack>
              {/* <InvoiceListSummary /> */}
              <InvoiceListTable
                items={data}
                isLoading={isLoading}
              />
            </Stack>
          </InvoiceListContainer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
