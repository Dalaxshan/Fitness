import React from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { TransferWithinAStation } from '@mui/icons-material';
import { TYAutocomplete } from 'src/components/ui/ty-autocomplete';
import { memberApi } from 'src/api/members';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { attendanceApi } from 'src/api/attendance';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';

const initialValues = {
  member: '',
  status: '', //In or Out
  checkIn: new Date(),
  checkOut: null,
};

const validationSchema = Yup.object().shape({
  member: Yup.object().required('Member is required'),
});

const CheckIn = () => {
  const { data: memberList, isLoading: isLoadingMembers } = useSWR('all-members', async () => {
    const response = await memberApi.getAllMembers();
    return response?.data || [];
  });

  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const reqBody = {
          member: values.member._id,
          firstName: values.member.firstName,
          lastName: values.member.lastName,
          vehileRegNo: values.member.vehileRegNo,
          checkIn: new Date(values.checkIn).toISOString(),
          checkOut: null,
        };

        await attendanceApi.createAttendanceAPI(reqBody);
        toast.success('CheckIn added !');
        window.location.reload();
        router.push(paths.dashboard.attendance);
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
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="CheckIn" />

        <Divider />
        <CardContent>
          {memberList && (
            <TYAutocomplete
              formik={formik}
              name="member"
              label="Find Member"
              options={memberList}
              loading={isLoadingMembers}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
              onChange={(e, value) => formik.setFieldValue('member', value ?? '')}
            />
          )}
          <Box sx={{ mt: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={formik.isSubmitting}
            >
              {<TransferWithinAStation />}
              Check In
            </LoadingButton>
          </Box>
          <Box sx={{ mt: 5 }}>
            <TextField
              label={'First Name'}
              defaultValue={'First Name'}
              value={formik.values?.member?.firstName}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label={'Last Name'}
              defaultValue={'Last Name'}
              value={formik.values?.member?.lastName}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              sx={{ mt: 1 }}
            />
            <TextField
              label={'Vehicle Number'}
              defaultValue={'Vehicle Number'}
              value={formik.values?.member?.vehileRegNo}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              sx={{ mt: 1 }}
            />

            <DatePicker
              sx={{ mt: 1, width: '100%' }}
              fullWidth
              format="dd/MM/yyyy: hh:mm a"
              onBlur={formik.handleBlur}
              name="checkIn"
              label="CheckIn Time"
              disabled
              onChange={(date) => formik.setFieldValue('checkIn', date)}
              value={formik.values.checkIn}
            />
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default CheckIn;
