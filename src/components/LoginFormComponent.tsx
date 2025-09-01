'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, TextField, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import { loginAction } from '@/app/auth/login/actions';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ width:'100%', maxWidth:400 }} component='form' action={loginAction}>
      <Typography variant='h3' fontWeight='700' mb={1} sx={{letterSpacing: '-1px'}}>
        Selamat Datang
      </Typography>
      <Typography mb={4} sx={{fontSize: '1.2rem', lineHeight: '25px'}}>
        Masuk dan kelola dashboard Mediverse Anda sekarang
      </Typography>

      <Typography variant='body1' fontWeight='700' sx={{fontSize: '1.1rem'}}>Email</Typography>
      <TextField name='email' fullWidth margin='dense' placeholder='Masukkan email'
        slotProps={{
          input: {
            startAdornment: <InputAdornment position='start'><MailOutlineRoundedIcon/></InputAdornment>,
          },
        }}
      />

      <Typography variant='body1' mt={2} fontWeight='700' sx={{fontSize: '1.1rem'}}>Kata Sandi</Typography>
      <TextField
        name='password'
        fullWidth
        margin='dense'
        placeholder='Masukkan kata sandi'
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position='start'><KeyRoundedIcon/></InputAdornment>,
            endAdornment: <InputAdornment position='end'>
              <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                {showPassword ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>,
          },
        }}
      />

      <Box textAlign='right' mt={0.5}>
        <Link href='#' underline='hover'>
          <Typography variant='body1' fontWeight={500} sx={{color:'black'}}>Lupa Kata Sandi?</Typography>
        </Link>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 5,
        }}
      >
        <Button
          endIcon={<LoginIcon/>}
          variant='contained'
          type='submit'
          sx={{
            py: 1.5,
            backgroundColor: '#610de9ff',
            borderRadius: 10,
            fontWeight: '500',
            width: '300px',
            fontSize: '1.1rem',
            letterSpacing: '1.2px',
          }}
        >
          MASUK SEKARANG
        </Button>
      </Box>
    </Box>
  );
}
