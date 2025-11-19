import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
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
        {/* Example scrollable content */}
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.item,
              { backgroundColor: isDark ? "#2a2a2a" : "#e0e0e0" },
            ]}
          >
            <Text style={{ color: isDark ? "#fff" : "#000" }}>
              Top Item {i + 1}
            </Text>
          </View>
        ))}
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
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          Bottom Section
        </Text>
        {/* Example scrollable content */}
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.item,
              { backgroundColor: isDark ? "#2a2a2a" : "#e0e0e0" },
            ]}
          >
            <Text style={{ color: isDark ? "#fff" : "#000" }}>
              Bottom Item {i + 1}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
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
