import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { GoogleLoginButton } from "react-social-login-buttons";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { emailSingUp } from "../services/auth.services";
import * as cookie from 'cookie'
import { toast } from 'react-toastify';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const loginWithGoogle = async () => {
  const data = await signIn("google");
};
const theme = createTheme();

export async function getServerSideProps({ req }) {
  const parsedCookies = cookie.parse(req?.headers?.cookie || '');
  const token = parsedCookies?.token
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

export default function SignUp() {
  const { push } = useRouter();

  async function checkSession() {
    const response = await axios.get('/api/auth/jwt');
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
      const data = new FormData(event.currentTarget)

      const res = await emailSingUp(data);
      if (res?.data?.flag) {
        push('/')
      }
    } catch (error) {
      console.log(error);
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
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
              >
                Sign Up
              </Button>
              <GoogleLoginButton onClick={() => loginWithGoogle()} style={{ fontSize: "15px", textAlign: "center", backgroundColor: "white" }} />

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" style={{ color: "black", textDecoration: "none" }}>
                    Already have an account? <span style={{ textDecoration: "underline" }}>Sign in</span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
