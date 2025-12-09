import { NumericFormat } from "react-number-format"
import TextField from '@mui/material/TextField';

export const TYCurrencyInput = (props) => {
    const { formik, name, label, ...rest } = props;

    return (
        <NumericFormat error={!!(formik.touched[name] && formik.errors[name])}
            fullWidth
            label={label}
            name={name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[name]}
            prefix='LKR '
            customInput={TextField}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator=","
            {...rest}
        />
    )
}