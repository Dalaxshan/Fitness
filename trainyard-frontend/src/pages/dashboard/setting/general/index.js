import PropTypes from 'prop-types';
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01';
import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import { alpha } from '@mui/system/colorManipulator';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const GeneralSettings = (props) => {
  const { avatar, email, name } = props;

  return (
    <Stack
      spacing={4}
      {...props}
    >
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              mb={4}
            >
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid
              xs={12}
              md={8}
            >
              <Stack
                sx={{ justifyContent: 'flex-end' }}
                spacing={3}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <TextField
                    defaultValue={name}
                    label="Full Name"
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    color="inherit"
                    size="small"
                  >
                    Save
                  </Button>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <TextField
                    defaultValue={email}
                    label="Email Address"
                    required
                    sx={{
                      flexGrow: 1,
                    }}
                  />
                  <Button
                    color="inherit"
                    size="small"
                  >
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

GeneralSettings.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default GeneralSettings;
