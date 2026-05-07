import type { Icon } from "iconsax-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

type RoomActionButtonProps = {
  IconComponent: Icon;
  label: string;
  destructive?: boolean;
  onPress?: () => void;
};

export function RoomActionButton({
  IconComponent,
  label,
  destructive = false,
  onPress,
}: RoomActionButtonProps) {
  const { colors } = useTheme();
  const color = destructive ? Colors.semantic.error : colors.secText;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.layerBackground }]}>
        <IconComponent size={FW(22)} color={color} variant="Outline" />
      </View>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: FH(6),
    flex: 1,
  },
  iconCircle: {
    width: FW(52),
    height: FW(52),
    borderRadius: FW(26),
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.medium,
  },
});
