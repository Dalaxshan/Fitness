import { TextField } from '@mui/material';

export const TYTextField = (props) => {
    const { formik, name, label, ...rest } = props;
    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[name]}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            {...rest}
        />
    );
}