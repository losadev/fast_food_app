import "./global.css"
import { useFonts} from "expo-font";
import {useEffect} from "react";
import {SplashScreen, Stack} from "expo-router";

export default function RootLayout() {
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

    return (
        <Stack screenOptions={{ headerShown: false }}>

        </Stack>
    );
}
