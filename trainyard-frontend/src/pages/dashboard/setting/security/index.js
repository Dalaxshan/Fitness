import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const SecuritySettings = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  return (
    <Stack spacing={4}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={4}
            >
              <Typography variant="h6">New password</Typography>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={8}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <TextField
                  disabled={!isEditing}
                  label="Password"
                  type="password"
                  defaultValue="Thebestpasswordever123#"
                  sx={{
                    flexGrow: 1,
                    ...(!isEditing && {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderStyle: 'dotted',
                      },
                    }),
                  }}
                />
              </Stack>
            </Grid>

            {/* New password */}

            <Grid
              xs={12}
              md={4}
            >
              <Typography variant="h6">Current password</Typography>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={8}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <TextField
                  disabled={!isEditing}
                  label="Password"
                  type="password"
                  defaultValue="Thebestpasswordever123#"
                  sx={{
                    flexGrow: 1,
                    ...(!isEditing && {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderStyle: 'dotted',
                      },
                    }),
                  }}
                />
              </Stack>
            </Grid>

            {/* Button */}
            <Grid
              xs={12}
              sm={12}
              md={12}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  color: 'white',
                }}
                background="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={handleEdit}
              >
                {isEditing ? 'Save Password' : 'Edit Password'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

SecuritySettings.propTypes = {
  loginEvents: PropTypes.array.isRequired,
};

export default SecuritySettings;