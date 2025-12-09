import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { trainerApi } from 'src/api/trainer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TYTextField } from 'src/components/ui/ty-textfield';
import { TYMobileInput } from 'src/components/ui/ty-mobile-input';

const initialValues = {
  name: '',
  address: '',
  contactNo: '',
  emergencyContactNo: '',
  nicNo: '',
  email: '',
  memberName: '',
  amount: '',
  startDate: new Date(),
  endDate: new Date(),
};

const validationSchema = Yup.object({
  name: Yup.string().max(255).required('Name is required'),
  address: Yup.string().max(255).required('Address is required'),
  contactNo: Yup.string().max(255).required('Contact Number is required'),
  emergencyContactNo: Yup.string().max(255),
  nicNo: Yup.string().max(255),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  memberName: Yup.string().max(255).required('Member Name is required'),
  amount: Yup.string().max(255).required('Amount is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date().required('End Date is required'),
});

export const CreateTrainerForm = (props) => {
  const [checked, setChecked] = React.useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const startedDate = new Date(values.startDate).toISOString();
        const endedDate = new Date(values.endDate).toISOString();
        const formvalues = {
          ...values,
          startDate: startedDate,
          endDate: endedDate,
        };

        const response = await trainerApi.createTrainer(formvalues);

        toast.success('Trainer registered!');
        router.push(paths.dashboard.trainer.index);
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
                <Typography variant="h6">External Personal Trainer Details</Typography>
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
                      name="name"
                      label="Name"
                      required
                    />
                  </Stack>
                  <Stack>
                    <TYTextField
                      formik={formik}
                      name="address"
                      label="Address"
                      required
                    />
                  </Stack>
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYTextField
                      formik={formik}
                      name="nicNo"
                      label="NIC"
                    />
                    <TYTextField
                      formik={formik}
                      name="email"
                      label="Email"
                      required
                    />
                  </Stack>
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYMobileInput
                      formik={formik}
                      name="contactNo"
                      label="Local Mobile"
                      required
                    />
                    <TYMobileInput
                      formik={formik}
                      name="emergencyContactNo"
                      label="Emergency Contact"
                    />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container>
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant="h6">
                  Breakdown of charges to be paid to Trainyard Per session per person by the EPT
                </Typography>
                <Typography variant="caption">
                  New member introduced by the EPT * (6 months membership validity only)
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={1}>
                  <TYTextField
                    formik={formik}
                    name="memberName"
                    label="Name of the member"
                    required
                  />
                  <Stack
                    spacing={1}
                    direction={'row'}
                  >
                    <TYTextField
                      formik={formik}
                      name="amount"
                      label="Amount"
                      required
                    />

                    <DatePicker
                      label="Start Date"
                      value={formik.values.startDate}
                      onChange={(date) => formik.setFieldValue('startDate', date)}
                      required
                    />
                    <DatePicker
                      label="End Date"
                      value={formik.values.endDate}
                      onChange={(date) => formik.setFieldValue('endDate', date)}
                      required
                    />
                  </Stack>
                  <Typography variant="caption">
                    Above charges may change from time to time and are subject to Trainyard Studio
                    management discretion.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">
              ALL EXTERNAL PERSONAL TRAINER WILL BE RESPONSIBLE FOR AND AGREE TO THE BELOW
            </Typography>
            <Typography variant="caption">
              {`1. Having all the necessary clearances, certifications, and training to conduct
              sessions as a personal trainer.`}
              <br />
              {`2. Informing all his/her clients that he/she is not an employee of "TRAINYARD STUDIO".`}
              <br />
              {`3. Assuming irrevocable and unconditional legal responsibility for all claims actions
              and proceedings of every kind and nature for any loss, injuries, illness, death or
              damage sustained by a client/member as a result of participating in his/her PT
              sessions.`}
              <br />
              {`4. Working with the highest integrity and following all the rules and regulations of
              TRAINYARD,`}
              <br />
              {`5. Ensuring the equipment is always restored and restacked after each exercise
              including PT sessions with Clients.`}
              <br />
              {`6. Pre-paying the relevant charge to TRAINYARD STUDIO before starting any PT session.
              No Refunds applicable for such payments and credit given.`}
              <br />
              {`7. Not poaching or solicitating clients from other trainers and not discussing Trainer
              abilities or training methods with any client(s).`}
              <br />
              {`8. Not conducting PT sessions to non-members or unauthorized users.`}
              <br />
              {`9. Trainers will be allowed to train only if member has taken minimum 6 months
              membership and the membership is still valid.`}
              <br />
              {`10. No personal workout can be done by the external trainer unless he/she has taken
              Trainyard Studio membership. Payment needs to be made in advance by the trainer either
              by cash or card.`}
              <br />
              {`11. External PT’s must follow the “Code of conduct” applied to the Trainers of
              TRAINYARD STUDIO and standard operating procedure [SOP] guidelines applicable. Failure
              to comply may result in the termination with immediate effect as per the sole
              discretion of the trainyard management.`}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container>
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
            href={paths.dashboard.trainer.index}
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
