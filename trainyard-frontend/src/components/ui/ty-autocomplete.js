import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const TYAutocomplete = (props) => {
    const {
        formik,
        name,
        label,
        onChange,
        renderOption,
        getOptionLabel,
        ...rest
    } = props;

    return (
        <Autocomplete
            getOptionLabel={getOptionLabel}
            fullWidth
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    label={label}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
            renderOption={renderOption}
            onChange={onChange}
            {...rest}
        />
    );
}