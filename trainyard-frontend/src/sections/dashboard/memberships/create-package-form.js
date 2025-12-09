import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import { NumericFormat } from 'react-number-format';
import { membershipApi } from 'src/api/membership';
import { LoadingButton } from '@mui/lab';

export const packageDurationOptions = [
    {
        label: 'Day Pass',
        value: '1d',
    },
    {
        label: '1 Week',
        value: '1w',
    },
    {
        label: '2 Weeks',
        value: '2w',
    },
    {
        label: '3 Weeks',
        value: '3w',
    },
    {
        label: '6 Weeks',
        value: '6w',
    },
    {
        label: '9 Weeks',
        value: '9w',
    },
    {
        label: '1 Month',
        value: '1m',
    },
    {
        label: '2 Months',
        value: '2m',
    },
    {
        label: '3 Months',
        value: '3m',
    },
    {
        label: '6 Months',
        value: '6m',
    },
    {
        label: '1 Year',
        value: '1y',
    },
    {
        label: '2 Years',
        value: '2y',
    },
    {
        label: '5 Years',
        value: '5y',
    },
    {
        label: '10 Years',
        value: '10y',
    },
    {
        label: 'Lifetime',
        value: 'lifetime',
    },
];

export function getPackageLabelByValue(optionsArray, targetValue) {
    const foundOption = optionsArray.find(option => option.value === targetValue);
    return foundOption ? foundOption.label : "N/A";
}

const initialValues = {
    name: '',
    description: '',
    price: 0,
    duration: '',
    code: 'IYV-8745',
};

const validationSchema = Yup.object({
    name: Yup.string().max(255).required(),
    description: Yup.string().max(5000),
    price: Yup.string().required(),
    duration: Yup.string().required(),
    code: Yup.string().max(255),
});

export const PackageCreateForm = (props) => {
    const router = useRouter();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const response = await membershipApi.createPackage(values);
                toast.success('Package created');
                router.push(paths.dashboard.membership.allPackages);
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
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={4}
                            >
                                <Typography variant="h6">Package details</Typography>
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
                                        label="Package Name"
                                        name="name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                    <TextField
                                        error={!!(formik.touched.description && formik.errors.description)}
                                        fullWidth
                                        helperText={formik.touched.description && formik.errors.description}
                                        label="Package Description"
                                        multiline
                                        rows={4}
                                        name="description"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                    />
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
                                <Typography variant="h6">Pricing</Typography>
                            </Grid>
                            <Grid
                                xs={12}
                                md={8}
                            >
                                <Stack spacing={3}>
                                    <NumericFormat error={!!(formik.touched.price && formik.errors.price)}
                                        fullWidth
                                        label="Package price"
                                        name="price"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        prefix='LKR '
                                        customInput={TextField}
                                        decimalScale={2}
                                        fixedDecimalScale
                                        thousandSeparator=","
                                    />
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
                                    <TextField
                                        error={!!(formik.touched.duration && formik.errors.duration)}
                                        fullWidth
                                        label="Duration"
                                        name="duration"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        select
                                        value={formik.values.duration}
                                    >
                                        {packageDurationOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        disabled
                                        error={!!(formik.touched.code && formik.errors.code)}
                                        fullWidth
                                        label="Package Code"
                                        name="code"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.code}
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
