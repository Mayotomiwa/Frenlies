import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { Bag, Send2 } from "iconsax-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type ActionItem = {
  icon: React.ReactElement;
  label: string;
  onPress: () => void;
};

type ActionPopupProps = {
  visible: boolean;
  onSendCrypto: () => void;
  onFlauntNFT: () => void;
};

export function ActionPopup({
  visible,
  onSendCrypto,
  onFlauntNFT,
}: ActionPopupProps) {
  const { colors } = useTheme();

  if (!visible) return null;

  const items: ActionItem[] = [
    {
      icon: (
        <Send2 size={FW(20)} color={colors.primaryText} variant="Outline" />
      ),
      label: "Send crypto",
      onPress: onSendCrypto,
    },
    {
      icon: <Bag size={FW(20)} color={colors.primaryText} variant="Outline" />,
      label: "Flaunt your NFTs",
      onPress: onFlauntNFT,
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.itemBackground, shadowColor: "#000" },
      ]}
    >
      {items.map((item, index) => (
        <View key={item.label}>
          <Pressable onPress={item.onPress} style={styles.row}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.layerBackground },
              ]}
            >
              {item.icon}
            </View>
            <Text style={[styles.label, { color: colors.primaryText }]}>
              {item.label}
            </Text>
          </Pressable>
          {index < items.length - 1 && (
            <View
              style={[styles.divider, { backgroundColor: colors.borderColor }]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "100%",
    right: FW(12),
    borderRadius: FW(16),
    paddingVertical: FH(4),
    minWidth: FW(220),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: FW(16),
    paddingVertical: FH(14),
    gap: FW(14),
  },
  iconWrap: {
    width: FW(36),
    height: FW(36),
    borderRadius: FW(18),
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontWeight.semibold,
  },
  divider: {
    height: 1,
    marginHorizontal: FW(16),
  },
});
