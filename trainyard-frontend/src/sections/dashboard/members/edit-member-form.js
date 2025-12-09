import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid'; // Changed import statement
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab'; // Changed import statement
import { DatePicker } from '@mui/x-date-pickers';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import { paths } from 'src/paths';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TYTextField } from 'src/components/ui/ty-textfield';
import { TYMobileInput } from 'src/components/ui/ty-mobile-input';
import { TYCountrySelect } from 'src/components/ui/ty-country-select';

export const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];
const validationSchema = Yup.object({
  firstName: Yup.string().min(3).max(50).required('First Name is required'),
  lastName: Yup.string().min(3).max(50).required('Last Name is required'),
  email: Yup.string().email().max(255).required('Email is required'),
  contactNumber: Yup.string().required('Local Number is required'),
  otherContactNumber: Yup.string(),
  gender: Yup.string().max(255),
  address: Yup.string().max(255).required('Address is required'),
  nationality: Yup.string().max(255).required('Nationality is required'),
  postalCode: Yup.string().max(255),
  occupation: Yup.string().max(255),
  nicOrPassport: Yup.string().max(255),
  hasHealthIssues: Yup.string().required('Health issues is required'),
  emergencyContactName: Yup.string().max(255).required('Emergency Contact Name is required'),
  emergencyContactNumber: Yup.string().required('Emergency Contact Number is required'),
  country: Yup.string().max(255),
  vehileRegNo: Yup.string().max(255),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
});
export const EditMemberForm = (props) => {
  const { member, onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      firstName: member ? member.firstName : '',
      lastName: member ? member.lastName : '',
      email: member ? member.email : '',
      contactNumber: member ? member.contactNumber : '',
      otherContactNumber: member ? member.otherContactNumber : '',
      gender: member ? member.gender : '',
      address: member ? member.address : '',
      postalCode: member ? member.postalCode : '',
      nicOrPassport: member ? member.nicOrPassport : '',
      nationality: member ? member.nationality : '',
      occupation: member ? member.occupation : '',
      role: 'user',
      hasHealthIssues: '0',
      emergencyContactName: member ? member.emergencyContactName : '',
      emergencyContactNumber: member ? member.emergencyContactNumber : '',
      country: member ? member.country : 'Sri Lanka',
      vehileRegNo: member ? member.vehileRegNo : '',
      dateOfBirth: member ? new Date(member.dateOfBirth) : new Date(),
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        values.hasHealthIssues = values.hasHealthIssues === '1';
        await onSubmit(values);
        toast.success('Member updated successfully!');
      } catch (error) {
        console.error('Error editing member:', error);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
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
                <Typography variant="h6">Edit Member Details</Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={1}>
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYTextField
                      formik={formik}
                      name="firstName"
                      label="First Name"
                      value={formik.values.firstName}
                      required
                    />
                    <TYTextField
                      formik={formik}
                      name="lastName"
                      label="Last Name"
                      value={formik.values.lastName}
                      required
                    />
                  </Stack>
                  <DatePicker
                    format="dd/MM/yyyy"
                    label="Date of Birth"
                    name="dateOfBirth"
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                    required
                  />
                  <TYTextField
                    formik={formik}
                    name="gender"
                    label="Gender"
                    select
                  >
                    {genderOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TYTextField>
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYMobileInput
                      formik={formik}
                      name="contactNumber"
                      label="Local Mobile"
                      value={formik.values.contactNumber}
                      required
                    />
                    <TYMobileInput
                      formik={formik}
                      name="otherContactNumber"
                      value={formik.values.otherContactNumber}
                      label="Other Contact"
                    />
                  </Stack>
                  <TYTextField
                    formik={formik}
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    required
                  />
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYTextField
                      formik={formik}
                      name="nicOrPassport"
                      label="NIC/Passport"
                      value={formik.values.nicOrPassport}
                    />
                    <TYTextField
                      formik={formik}
                      name="nationality"
                      label="Nationality"
                      value={formik.values.nationality}
                      required
                    />
                  </Stack>
                  <TYTextField
                    formik={formik}
                    name="address"
                    label="Address"
                    value={formik.values.address}
                    multiline
                    rows={2}
                  />
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYTextField
                      formik={formik}
                      name="postalCode"
                      value={formik.values.postalCode}
                      label="Postal Code"
                    />
                    <TYTextField
                      formik={formik}
                      name="occupation"
                      value={formik.values.occupation}
                      label="Occupation"
                    />
                  </Stack>
                  <FormControl>
                    <FormLabel sx={{ mt: 2 }}>
                      <Typography variant={'body2'}>
                        Do you have any health issues that may/can affect your participation at any
                        activity conducted at Trainyard ?
                      </Typography>
                      <Typography variant="caption">
                        (If you have any risk factors, you will need to obtain a clearance from a
                        physician to participate in any activity at Trainyard)
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      row
                      name="hasHealthIssues"
                      value={formik.values.hasHealthIssues}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.hasHealthIssues && Boolean(formik.errors.hasHealthIssues)
                      }
                    >
                      <FormControlLabel
                        value={'1'}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={'0'}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
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
                <Typography variant="h6">Other Details</Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={1}>
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYTextField
                      formik={formik}
                      name="emergencyContactName"
                      label="Emergency Contact Name"
                      value={formik.values.emergencyContactName}
                      required
                    />
                    <TYMobileInput
                      formik={formik}
                      name="emergencyContactNumber"
                      label="Emergency Contact Number"
                      value={formik.values.emergencyContactNumber}
                      required
                    />
                  </Stack>
                  <TYCountrySelect
                    formik={formik}
                    name="country"
                    label="Country"
                  />
                  <TYTextField
                    formik={formik}
                    name="vehileRegNo"
                    label="Vehicle Registration No"
                    value={formik.values.vehileRegNo}
                  />
                  <Typography variant="caption">
                    (Entitled for 2 hours free parking at the OGF carpark during Trainyard
                    operational hours | Park at your own risk | Non-reserved parking on availability
                    | T&C Apply)
                  </Typography>
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
          <Button
            color="inherit"
            href={paths.dashboard.members.index}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            Edit
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};
