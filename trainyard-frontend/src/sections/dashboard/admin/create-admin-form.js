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
import { LoadingButton } from '@mui/lab';
import { adminApi } from 'src/api/admin';

const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'admin',
};

const validationSchema = Yup.object({
    name: Yup.string().max(255).required(),
    email: Yup.string().email().max(255).required(),
    password: Yup.string().max(255).required(),
    role: Yup.string().max(255).required(),
});

export const CreateAdminForm = (props) => {
    const router = useRouter();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                await adminApi.createAdmin(values);
                toast.success('Admin created !');
                router.push(paths.dashboard.admin.index);
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong!');
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
                            spacing={1}
                        >
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <Typography variant="h6">Admin details</Typography>
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
                                        type='email'
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    <TextField
                                        error={!!(formik.touched.password && formik.errors.password)}
                                        fullWidth
                                        helperText={formik.touched.password && formik.errors.password}
                                        label="Password"
                                        name="password"
                                        type='password'
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
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
