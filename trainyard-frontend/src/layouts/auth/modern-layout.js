import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { Logo } from 'src/components/logo';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        },
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'neutral.800',
          backgroundImage: 'url("/assets/gradient-bg.svg")',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          color: 'common.white',
          display: 'flex',
          flex: {
            xs: '0 0 auto',
            md: '1 1 auto',
          },
          justifyContent: 'center',
          p: {
            xs: 4,
            md: 8,
          },
        }}
      >
        <Box maxWidth="md">
          <Typography
            sx={{ mb: 1 }}
            variant="h4"
          >
            Welcome to Trainyard
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Unleash your inner beast in the ultimate fitness playground!
            Welcome to Trainyard, where sweat meets determination, and every rep takes you one step closer to conquering your fitness goals.
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2 }}
          >
            Powered by Dawn 360 Co.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flex: {
            xs: '1 1 auto',
            md: '0 0 auto',
          },
          flexDirection: 'column',
          justifyContent: {
            md: 'center',
          },
          maxWidth: '100%',
          p: {
            xs: 4,
            md: 8,
          },
          width: {
            md: 600,
          },
        }}
      >
        <div>
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems="center"
              component={RouterLink}
              direction="row"
              display="inline-flex"
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Logo />
            </Stack>
          </Box>
          {children}
        </div>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
