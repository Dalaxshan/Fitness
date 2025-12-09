import * as Yup from 'yup';
import { useFormik } from 'formik';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Seo } from 'src/components/seo';
import { GuestGuard } from 'src/guards/guest-guard';
import { useMounted } from 'src/hooks/use-mounted';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Layout as AuthLayout } from 'src/layouts/auth/modern-layout';
import { paths } from 'src/paths';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { authApi } from 'src/api/auth';
import { authSlice } from 'src/store/slices/auth';

const initialValues = {
  email: '',
  password: '',
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await authApi.signIn({ email: values.email, password: values.password });
        dispatch(authSlice.actions.login({
          user: {
            id: response.id,
            email: response.email,
            name: response.name,
          },
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }));

        toast.success('You have successfully logged in!');
        if (isMounted()) {
          router.push(returnTo || paths.dashboard.index);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Seo title="Login" />
      <div>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={3}>
            <TextField
              autoFocus
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
            />
          </Stack>
          <LoadingButton
            fullWidth
            sx={{ mt: 3 }}
            size="large"
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            Log In
          </LoadingButton>
        </form>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <GuestGuard>
    <AuthLayout>{page}</AuthLayout>
  </GuestGuard>
);

export default Page;
