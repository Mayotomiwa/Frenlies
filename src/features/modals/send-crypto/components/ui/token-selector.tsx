import { ArrowDown2 } from "iconsax-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { typography } from "@/src/shared/global/constants/typography";
import { FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

type TokenSelectorProps = {
  symbol?: string;
  onPress?: () => void;
};

export function TokenSelector({ symbol = "ETH", onPress }: TokenSelectorProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.layerBackground }]}>
        <Text style={[styles.ethIcon, { color: colors.text }]}>◈</Text>
      </View>
      <Text style={[styles.symbol, { color: colors.text }]}>{symbol}</Text>
      <ArrowDown2 size={FW(16)} color={colors.secText} variant="Outline" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(6),
  },
  iconCircle: {
    width: FW(28),
    height: FW(28),
    borderRadius: FW(14),
    justifyContent: "center",
    alignItems: "center",
  },
  ethIcon: {
    fontSize: typography.fontSize.md,
  },
  symbol: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontWeight.semibold,
  },
});
