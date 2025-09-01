import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid2 } from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { APP_DASHBOARD } from '@/constants';
import LoginForm from '@/components/LoginFormComponent';
import Image from 'next/image';

export default async function LoginPage() {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  
  if (accessToken) {
    redirect(APP_DASHBOARD);
  }

  return (
    <Container component='main' maxWidth={false} disableGutters={true}
      sx={{
        height:'100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Grid2
        container
        spacing={0}
        sx={{
          maxWidth: '1500px',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          p: 3,
        }}
      >
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{
            alignItems: 'center',
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
            p: 6,
            position: 'relative',
          }}>
          <Box sx={{
            position: 'absolute',
            top: 5,
            left: 32,
          }}>
            <Image src='/assets/mediverse_left.png' alt='mediverse' width={140} height={50} />
          </Box>
          <LoginForm/>
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{
            background: 'linear-gradient(180deg, #4B0082 0%, #800080 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 6,
            textAlign: 'center',
            borderRadius: 5,
            gap:15,
          }}>
          <Image src='/assets/mediverse_right.png' alt='mediverse' width={210} height={120} style={{ marginTop: '-130px'}} />
          <Box sx={{
            position: 'relative',
            width: 500,
            height: 250,
            bottom: 30,
            left: 65,
          }}>
            <Image
              src='/assets/logo.png'
              alt='logo medis'
              width={300}
              height={150}
              style={{ position: 'absolute', zIndex: 1, top:0, left: 25}}/>
            <Image
              src='/assets/person.png'
              alt='person'
              width={300}
              height={150}
              style={{ position: 'absolute', top: 10, left: 20, zIndex: 2 }} />
          </Box>
          <Typography variant='h3' fontWeight='400'>
            Your Personal <br/>
            Healthcare Assistant
          </Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}
