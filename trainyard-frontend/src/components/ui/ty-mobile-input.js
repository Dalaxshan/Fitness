import { PatternFormat } from 'react-number-format';
import { TextField } from '@mui/material';

export const TYMobileInput = (props) => {
    const { formik, name, label, ...rest } = props;
    return (
        <PatternFormat
            customInput={TextField}
            fullWidth
            label={label}
            name={name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[name]}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            format={'+94 (##) ### ####'}
            {...rest}
        />
    );

}