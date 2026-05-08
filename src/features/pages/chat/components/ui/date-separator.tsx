import { StyleSheet, View } from "react-native";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

type DateSeparatorProps = {
  label: string;
};

export function DateSeparator({ label }: DateSeparatorProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.pill, { backgroundColor: colors.layerBackground }]}>
        <Text style={[styles.text, { color: colors.secText }]}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: FH(12),
  },
  pill: {
    paddingHorizontal: FW(16),
    paddingVertical: FH(5),
    borderRadius: FW(20),
  },
  text: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
  },
});
