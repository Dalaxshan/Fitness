import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Divider from '@mui/material/Divider';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function MemberProfile() {
  const applicant = {
    id: '5e887a62195cc5aef7e8ca5d',
    avatar: '/assets/avatars/avatar-marcus-finn.png',
    commonContacts: 12,
    cover: '/assets/covers/gym_dp.jpg',
    name: 'Marcus Finn',
    socialMedia: [
      { s_icon: '/assets/icons/insta.png', s_link: 'http://localhost:3000/dashboard/' },
      { s_icon: '/assets/icons/tiktok.png', s_link: 'http://localhost:3000/dashboard/' },
      { s_icon: '/assets/icons/snap.png', s_link: 'http://localhost:3000/dashboard/' },
      { s_icon: '/assets/icons/facebook.png', s_link: 'http://localhost:3000/dashboard/' },
    ],
  };

  return (
    <div>
      <Card sx={{ height: '100%', mr: 2, mb: 2 }}>
        <CardMedia
          image={applicant.cover}
          sx={{ height: 200 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              mt: '-50px',
            }}
          >
            <Avatar
              alt="Applicant"
              src={applicant.avatar}
              sx={{
                border: '3px solid #FFFFFF',
                height: 120,
                width: 120,
              }}
            />
          </Box>
          <Link
            align="center"
            color="text.primary"
            sx={{ display: 'block' }}
            underline="none"
            variant="h6"
          >
            {applicant.name}
          </Link>
          <Typography
            align="center"
            variant="body2"
            color="text.secondary"
          >
            ID:{applicant.id}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.1}
          >
            {applicant.socialMedia.map((socialMediaIcon, index) => (
              <a
                href={socialMediaIcon.s_link}
                key={index}
              >
                <Stack spacing={1}>
                  <img
                    src={socialMediaIcon.s_icon}
                    style={{ height: 45, width: 45 }}
                  />
                </Stack>
              </a>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
