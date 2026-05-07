import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import FrenliesSplashScreen from "@/src/shared/global/component/layout/actions/splash-screen";
import { modal } from "@/src/shared/global/component/modals/modal-screens";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

// Keep the native OS splash visible until we're ready
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { colors } = useTheme();
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    "SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
    "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the native OS splash immediately — our custom one takes over
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Don't render anything until fonts are ready
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen name="(pages)/chat" options={{ headerShown: false }} />
        <Stack.Screen
          name="(pages)/audio-room"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(modals)/send-crypto"
          options={modal(colors, [0.92])}
        />
      </Stack>

      <StatusBar style="dark" />

      {showCustomSplash && (
        <FrenliesSplashScreen
          onFinish={() => setShowCustomSplash(false)}
          fontFamily="SpaceGrotesk-Bold"
        />
      )}
    </ThemeProvider>
  );
}
