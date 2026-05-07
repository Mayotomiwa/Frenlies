import { StyleSheet, View } from "react-native";
import { SafeAreaView, Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { typography } from "@/src/shared/global/constants/typography";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

export default function JournalScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={[styles.label, { color: colors.secText }]}>Journal</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontSize: typography.fontSize["2xl"], fontFamily: typography.fontWeight.bold },
});
