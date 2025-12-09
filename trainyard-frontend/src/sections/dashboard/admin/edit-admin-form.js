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
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';

const validationSchema = Yup.object({
  name: Yup.string().max(255).required(),
  email: Yup.string().email().max(255).required(),
});

export const EditAdminForm = (props) => {
  const { admin, onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      name: admin ? admin.name : '',
      email: admin ? admin.email : '',
      role: admin ? admin.role : '',
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await onSubmit(values);
        toast.success('Admin updated successfully!');
      } catch (error) {
        console.error('Error editing admin:', error);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
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
                  <Typography variant="h6">Edit details</Typography>
                </Grid>
                <Grid
                  xs={12}
                  md={8}
                >
                  <Stack spacing={1}>
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label="Admin Name"
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <TextField
                      error={!!(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      label="Admin Email"
                      name="email"
                      type="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    <TextField
                      fullWidth
                      hidden
                      label="Role"
                      name="role"
                      disabled
                      onChange={formik.handleChange}
                      value={formik.values.role}
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
              Edit
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

EditAdminForm.propTypes = {
  admin: PropTypes.object,
  onSubmit: PropTypes.func,
};
