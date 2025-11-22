import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { WalletConnect } from "@/components/wallet-connect";
import { WalletGenerator } from "@/components/wallet-generator";
import { AppKit } from "@reown/appkit-react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
          },
        ]}
      >
      {/* Top scrollable section */}
      <ScrollView
        style={[
          styles.section,
          { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
        ]}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          Top Section
        </Text>

        {/* Wallet Connect Component */}
        <WalletConnect />
      </ScrollView>

      {/* Divider */}
      <View
        style={[
          styles.divider,
          { backgroundColor: isDark ? "#444" : "#ccc" },
        ]}
      />

      {/* Bottom scrollable section */}
      <ScrollView
        style={[
          styles.section,
          { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
        ]}
        contentContainerStyle={styles.scrollContent}
      >
        <WalletGenerator />
      </ScrollView>
      </View>
      <AppKit />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1, // Each section takes 50% of screen height
  },
  scrollContent: {
    padding: 16,
  },
  divider: {
    height: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
});
