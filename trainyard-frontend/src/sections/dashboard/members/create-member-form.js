import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import MenuItem from '@mui/material/MenuItem';
import { memberApi } from 'src/api/members';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox } from '@mui/material';
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

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  otherContactNumber: '',
  gender: 'Male',
  address: '',
  nationality: '',
  postalCode: '',
  occupation: '',
  nicOrPassport: '',
  hasHealthIssues: '0',
  emergencyContactName: '',
  emergencyContactNumber: '',
  country: '',
  vehileRegNo: '',
  dateOfBirth: Date.now(),
};

const validationSchema = Yup.object({
  firstName: Yup.string().miTyMoBIn(3).max(50).required('First Name is required'),
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
  dateOfBirth: Yup.string().max(255).required('Date of Birth is required'),
});

export const CreateMemberForm = (props) => {
  const [checked, setChecked] = React.useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const hasHealthIssues = values.hasHealthIssues === '1' ? true : false;
        const convertedDate = new Date(values.dateOfBirth).toISOString();
        const formvalues = {
          ...values,
          hasHealthIssues,
          dateOfBirth: convertedDate,
        };

        await memberApi.createMember(formvalues);
        toast.success('Member registered !');
        router.push(paths.dashboard.members.index);
      } catch (err) {
        toast.error(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleAgreeToTermsAndConditions = (event) => {
    setChecked(event.target.checked);
  };

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
              spacing={1}
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
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYTextField
                      formik={formik}
                      name="firstName"
                      label="First Name"
                      required
                    />
                    <TYTextField
                      formik={formik}
                      name="lastName"
                      label="Last Name"
                      required
                    />
                  </Stack>
                  <DatePicker
                    format="dd/MM/yyyy"
                    label="Date of Birth"
                    name="dateOfBirth"
                    onBlur={formik.handleBlur}
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                    value={formik.values.dateOfBirth}
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
                      required
                    />
                    <TYMobileInput
                      formik={formik}
                      name="otherContactNumber"
                      label="Other Contact"
                    />
                  </Stack>

                  <TYTextField
                    formik={formik}
                    name="email"
                    label="Email"
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
                    />
                    <TYTextField
                      formik={formik}
                      name="nationality"
                      label="Nationality"
                      required
                    />
                  </Stack>

                  <TYTextField
                    formik={formik}
                    name="address"
                    label="Address"
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
                      label="Postal Code"
                    />
                    <TYTextField
                      formik={formik}
                      name="occupation"
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
                      required
                    />
                    <TYMobileInput
                      formik={formik}
                      name="emergencyContactNumber"
                      label="Emergency Contact Number"
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

        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <Typography variant="h6">INFORMED CONSENT:</Typography>
                <Typography variant="caption">
                  I understand that I may require a medical screening and that TRAINYARD has not
                  concluded that the use of any equipment, exercise program, Group/Individual class,
                  Personal Training session at TRAINYARD is medically appropriate for me. I
                  understand that it is my responsibility to consult a physician regarding the use
                  of any equipment or participation at any class and/or session conducted at TRAIN-
                  YARD. I agree to inform the staff of TRAINYARD if there are any changes in my
                  health/medical status. If I become ill or injured & require emergency assistance,
                  I authorize the disclosure of the health/medical information and the emergency
                  con- tact details obtained by TRAINYARD to the emergency personnel or medical
                  staff.
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <Typography variant="h6">RELEASE OF LIABILITY:</Typography>
                <Typography variant="caption">
                  In consideration of being allowed to use any facility of Trainyard and/or its
                  equipment and/or being allowed to participate in any program/class, I/We hereby
                  release, defend, indemnify and hold harmless TRAINYARD, SHANGRI-LA HOTELS LANKA
                  (PVT) LTD, their directors, partners, officers, employees, agents, successors and
                  assigns from any and all claims, demands, actions, or causes of action whatsoever,
                  and from any and all liability for any loss or property damage or personal injury
                  of any kind, nature, or description, including death, that may arise or be
                  sustained by me or my family members or the applicant during or related to my/our
                  participation in any activity offered by TRAINYARD and/or by the use or intend to
                  use of TRAINYARD facilities, equipments or services.
                </Typography>
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
                md={6}
              >
                <Typography variant="h6">TERMS AND CONDITIONS (T&C)</Typography>
                <Typography variant="caption">
                  I hereby confirm that I have read and agreed to the T&C listed on the reverse side
                  of this document. I am aware that the T&C can change without prior notice and such
                  changes can be viewed at the above webpage and the updated list of T&C can be
                  obtained from the reception at anytime. I also understand that it is my
                  responsibility keep myself updated on any changes to the T&C.
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <Typography variant="h6">SPECIAL NOTES:</Typography>
                <Typography
                  variant="caption"
                  align={'right'}
                >
                  If any part of this document is filled by someone else, it is his/her
                  responsibility to obtain the signature of the applicant named above. The
                  aforementioned applicant should sign and agree to all the T&C of TRAINYARD to be
                  admitted as a member. Until such agreement, no applicant would be admitted as a
                  member, user or par- ticipant of any facility or service provided by/at TRAINYARD.
                </Typography>
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
                md={12}
              >
                <Typography variant="h6">AGREEMENT</Typography>
                <Typography variant="caption">
                  By submitting this form, I/we indicate that I/we have read, understood and agreed
                  to all the clauses noted in the aforementioned Informed Consent, Release of
                  Liability, Terms and Conditions (T&C) and the Special Notes sections. I assure you
                  that all the details given are true and I voluntarily agreed to all the above
                  conditions.
                </Typography>
                <FormControlLabel
                  label={
                    <Typography variant={'body2'}>Agree to the terms and conditions</Typography>
                  }
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleAgreeToTermsAndConditions}
                    />
                  }
                />
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
            disabled={!checked}
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
