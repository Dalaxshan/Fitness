import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import SvgIcon from '@mui/material/SvgIcon';
import { useRouter } from 'src/hooks/use-router';
import LogOut01 from 'src/icons/untitled-ui/duocolor/log-out-01';
import { paths } from 'src/paths';
import toast from 'react-hot-toast';

export const AccountButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // await signOut();
      // TODO Sign out
      toast.success('You have successfully signed out!');
      router.push(paths.index);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Box
        onClick={handleSignOut}
        component={ButtonBase}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%',
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
        >
          <SvgIcon>
            <LogOut01 />
          </SvgIcon>
        </Avatar>
      </Box>
    </>
  );
};
