import { PDFDownloadLink } from '@react-pdf/renderer';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { InvoicePreview } from 'src/sections/dashboard/invoices/invoice-preview';
import { InvoicePdfDocument } from 'src/sections/dashboard/invoices/invoice-pdf-document';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { invoicesApi } from 'src/api/invoices';
import { Backdrop, CircularProgress } from '@mui/material';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: invoice, isLoading: isLoadingInvoice } = useSWR(['invoice', id], async () => {
    const response = await invoicesApi.getOneInvoice(id);
    return response?.data || {};
  })

  return (
    <>
      <Seo title="Dashboard: Invoice Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {isLoadingInvoice ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoadingInvoice}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Container maxWidth="lg">
            <Stack
              divider={<Divider />}
              spacing={4}
            >
              <Stack spacing={4}>
                <div>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.dashboard.invoices.index}
                    sx={{
                      alignItems: 'center',
                      display: 'inline-flex',
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">Invoices</Typography>
                  </Link>
                </div>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <Avatar
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    >
                      {invoice?.customerName?.charAt(0)}
                    </Avatar>
                    <div>
                      <Typography variant="h4">{invoice?.invoiceNumber}</Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {invoice?.customerName}
                      </Typography>
                    </div>
                  </Stack>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <PDFDownloadLink
                      document={<InvoicePdfDocument invoice={invoice} />}
                      fileName={`invoice-${invoice?.invoiceNumber}.pdf`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                      >
                        Download
                      </Button>
                    </PDFDownloadLink>
                  </Stack>
                </Stack>
              </Stack>
              <InvoicePreview billing={invoice} />
            </Stack>
          </Container>
        )}

      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
