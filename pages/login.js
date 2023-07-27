import * as React from 'react';
import { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { GoogleLoginButton } from "react-social-login-buttons";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { emailLogin } from "../services/auth.services";
import axios from "axios";
import * as cookie from 'cookie';
import { toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const loginWithGoogle = async () => {

  const data = await signIn("google");
  console.log('data', data)

};

export async function getServerSideProps({ req }) {
  const parsedCookies = cookie.parse(req?.headers?.cookie || '');
  const token = parsedCookies?.token
  console.log('token', token)
  if (token) {
    return {
      redirect: {
        destination: '/account/profile',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

const theme = createTheme();

export default function SignInSide() {
  const { push } = useRouter();

  async function checkSession() {
    const response = await axios.get('/api/auth/jwt');
    console.log(response.data)
    if (response.data) {
      push('/account/profile')
      if (typeof window !== "undefined") {
        window.localStorage.setItem('token', JSON.stringify(response.data))
      }
    }
  }

  useEffect(() => {
    checkSession()
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      const response = await emailLogin(data);
      if (response?.data?.flag) {
        push('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Paper elevation={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4, boxShadow: 3, width: "100%", maxWidth: "400px", borderRadius: "10px", overflow: "hidden" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontSize: "1.5rem", mb: 2 }}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ color: "black", textDecorationColor: "black" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" sx={{ color: "black", textDecorationColor: "black" }}>
                    {"Create Account"}
                  </Link>
                </Grid>
              </Grid>
              <Box sx={{ width: "100%", marginTop: "10px", alignItems: "center", textAlign: "center", display: "flex", justifyContent: "center" }}>
                <GoogleLoginButton onClick={() => loginWithGoogle()} style={{ fontSize: "15px", textAlign: "center", backgroundColor: "white" }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}