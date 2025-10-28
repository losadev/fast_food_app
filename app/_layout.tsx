import "./global.css"
import { useFonts} from "expo-font";
import {useEffect} from "react";
import {SplashScreen, Stack} from "expo-router";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://cd4d559b58c9438f1000608b4d1cf0bc@o4510267663712256.ingest.de.sentry.io/4510267676622928',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
    const {isLoading, fetchAuthenticatedUser} = useAuthStore();
    const [fontsLoaded, error] = useFonts({
        "Quicksand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
        "Quicksand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
        "Quicksand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
        "Quicksand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
        "Quicksand-semibold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    })

    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync();
    },[error, fontsLoaded]);

    useEffect(() => {
       fetchAuthenticatedUser();
    },[]);

    if(!fontsLoaded || isLoading) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>

        </Stack>
    );
});