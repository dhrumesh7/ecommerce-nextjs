import { createTheme, ThemeProvider } from "@mui/material";
import "../styles/globals.scss";
import Layout from '../components/Layout';
import React, { Suspense } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { Circles } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Spinner = () => {
  return (
    <div style={{ display: "flex", position: "fixed", opacity: "100%", top: 0, bottom: 0, left: 0, right: 0, justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
      <Circles
        height="70"
        width="70"
        color="darkgoldenrod"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

export default function App({ Component, pageProps }) {
  const { promiseInProgress } = usePromiseTracker();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#daa520',
      },
    },
    typography: {
      "fontFamily": `"Poppins", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Spinner />}>
        {promiseInProgress && <Spinner />}

        <Layout>
          <ToastContainer position="top-right" toastOptions={{ duration: 7000 }} />
          <Component {...pageProps} />
        </Layout>
      </Suspense>

    </ThemeProvider>
  );
}
