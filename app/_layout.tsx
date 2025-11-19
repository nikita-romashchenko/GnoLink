import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@walletconnect/react-native-compat";
import { AppKitProvider } from "@reown/appkit-react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { appKit } from "@/config/wallet-config";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AppKitProvider instance={appKit}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar
          style={isDark ? "light" : "dark"}
          backgroundColor={isDark ? "#1a1a1a" : "#f5f5f5"}
        />
      </ThemeProvider>
    </AppKitProvider>
  );
}
