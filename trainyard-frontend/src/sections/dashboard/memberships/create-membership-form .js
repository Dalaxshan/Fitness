import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { membershipApi } from 'src/api/membership';
import { LoadingButton } from '@mui/lab';
import { getPackageLabelByValue, packageDurationOptions } from './create-package-form';
import { TYAutocomplete } from 'src/components/ui/ty-autocomplete';
import { TYCurrencyInput } from 'src/components/ui/ty-currency-input';
import { DatePicker } from '@mui/x-date-pickers';

const initialValues = {
  member: '',
  package: '',
  totalAmount: '',
  startDate: new Date(),
  endDate: new Date(),
};

const validationSchema = Yup.object({
  member: Yup.object().required('Member is required'),
  package: Yup.object().required('Package is required'),
  totalAmount: Yup.string().required('Total amount is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
});

export const CreateMembershipForm = (props) => {
  const { memberList, packageList, isLoadingMembers, isLoadingPackages } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const reqBody = {
          memberId: values.member._id,
          packageId: values.package._id,
          totalAmount: values.totalAmount,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
        };

        await membershipApi.createMembership(reqBody);
        toast.success('Membership added !');
        router.push(paths.dashboard.membership.allMembership);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...props}
    >
      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant="h6">Member Details</Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={1}>
                  <TYAutocomplete
                    formik={formik}
                    name="member"
                    label="Find Member"
                    options={memberList}
                    loading={isLoadingMembers}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    onChange={(event, newInputValue) => {
                      formik.setFieldValue('member', newInputValue ?? '');
                    }}
                  />
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TextField
                      label={'Email'}
                      defaultValue={'Member Email'}
                      value={formik.values?.member?.email}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                    <TextField
                      label={'Contact'}
                      defaultValue={'Member Contact'}
                      value={formik.values?.member?.contactNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant="h6">Package Details</Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={1}>
                  <TYAutocomplete
                    formik={formik}
                    name="package"
                    label="Select Package"
                    options={packageList}
                    loading={isLoadingPackages}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newInputValue) => {
                      formik.setFieldValue('package', newInputValue ?? '');
                    }}
                  />
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TextField
                      label={'Description'}
                      defaultValue={'Package Detail'}
                      value={formik.values?.package?.description}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                    <TextField
                      label={'Duration'}
                      defaultValue={'Package Duration'}
                      value={getPackageLabelByValue(
                        packageDurationOptions,
                        formik.values?.package?.duration
                      )}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={1}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant="h6">Membership Pricing & Period</Typography>
                {/* <Typography sx={{ mt: 1 }} variant="body2">{`Membership will start on the ${format(new Date(formik.values.startDate), 'dd MMM yyyy')} and expire on the `}</Typography> */}
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={1}>
                  <DatePicker
                    fullWidth
                    format="dd/MM/yyyy:HH:mm"
                    label="Start Date"
                    name="startDate"
                    onBlur={formik.handleBlur}
                    onChange={(date) => formik.setFieldValue('startDate', date)}
                    value={formik.values.startDate}
                    required
                  />
                  <DatePicker
                    fullWidth
                    format="dd/MM/yyyy"
                    label="End Date"
                    name="endDate"
                    onBlur={formik.handleBlur}
                    onChange={(date) => formik.setFieldValue('endDate', date)}
                    value={formik.values.endDate}
                    required
                  />
                  <TYCurrencyInput
                    formik={formik}
                    name="totalAmount"
                    label="Total Amount"
                    value={formik.values?.package?.price}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button color="inherit">Cancel</Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            Create
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};
