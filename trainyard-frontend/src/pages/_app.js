// Remove if simplebar is not used
import 'simplebar-react/dist/simplebar.min.css';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import 'src/global.css';

import { SplashScreen } from 'src/components/splash-screen';
import { Toaster } from 'src/components/toaster';
import { SettingsConsumer, SettingsProvider } from 'src/contexts/settings';
import { useNprogress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import { persistor, store } from 'src/store';
import dayjs from "dayjs";

const clientSideEmotionCache = createEmotionCache();

const CustomApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useNprogress();
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Trainyard Admin Dashboard</title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <SettingsConsumer>
                {(settings) => {
                  // Prevent theme flicker when restoring custom settings from browser storage
                  if (!settings.isInitialized) {
                    // return null;
                  }

                  const theme = createTheme({
                    colorPreset: settings.colorPreset,
                    contrast: settings.contrast,
                    direction: settings.direction,
                    paletteMode: settings.paletteMode,
                    responsiveFontSizes: settings.responsiveFontSizes,
                  });

                  // Prevent guards from redirecting
                  const showSlashScreen = false;

                  return (
                    <ThemeProvider theme={theme}>
                      <Head>
                        <meta
                          name="color-scheme"
                          content={settings.paletteMode}
                        />
                        <meta
                          name="theme-color"
                          content={theme.palette.neutral[900]}
                        />
                      </Head>
                      <CssBaseline />
                      {showSlashScreen ? (
                        <SplashScreen />
                      ) : (
                        <>{getLayout(<Component {...pageProps} />)}</>
                      )}
                      <Toaster />
                    </ThemeProvider>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default CustomApp;
