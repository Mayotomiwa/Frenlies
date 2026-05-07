import { StyleSheet } from "react-native";
import { typography } from "../../../constants/typography";
import { FW } from "../../../utils/responsive";
import { Text, View } from "../tags/themed-components";
export function ActiveTabLabel({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <View style={styles.activeLabel}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.activeLabelText, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activeLabel: {
    flexDirection: "row", // dot • text side by side
    alignItems: "center",
    gap: 5,
    overflow: "visible", // escape the icon slot's clip bounds
    minWidth: 60, // enough room for longest label "Activity"
    paddingHorizontal: FW(5),
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  activeLabelText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.medium,
  },
});
