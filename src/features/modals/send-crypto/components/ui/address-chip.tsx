import { Pressable, StyleSheet } from "react-native";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";

type AddressChipProps = {
  address: string;
  onPress?: () => void;
};

export function AddressChip({ address, onPress }: AddressChipProps) {
  return (
    <Pressable onPress={onPress} style={styles.chip}>
      <Text style={styles.text}>{address}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    backgroundColor: Colors.accent.purpleLight,
    paddingHorizontal: FW(14),
    paddingVertical: FH(7),
    borderRadius: FW(20),
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.medium,
    color: Colors.accent.purple,
  },
});
