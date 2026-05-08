import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

export type Token = {
  symbol: string;
  name: string;
  icon: string;
  priceUsd: number;
};

export const TOKENS: Token[] = [
  { symbol: "ETH",  name: "Ethereum",  icon: "◈", priceUsd: 1564.5 },
  { symbol: "BTC",  name: "Bitcoin",   icon: "₿", priceUsd: 62340  },
  { symbol: "SOL",  name: "Solana",    icon: "◎", priceUsd: 142.8  },
  { symbol: "USDC", name: "USD Coin",  icon: "$", priceUsd: 1      },
  { symbol: "USDT", name: "Tether",    icon: "₮", priceUsd: 1      },
];

type TokenDropdownProps = {
  visible: boolean;
  selected: string;
  onSelect: (token: Token) => void;
};

export function TokenDropdown({ visible, selected, onSelect }: TokenDropdownProps) {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.itemBackground, shadowColor: "#000" },
      ]}
    >
      {TOKENS.map((token, index) => (
        <View key={token.symbol}>
          <Pressable
            onPress={() => onSelect(token)}
            style={[
              styles.row,
              token.symbol === selected && { backgroundColor: colors.layerBackground },
            ]}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.layerBackground }]}>
              <Text style={[styles.icon, { color: colors.text }]}>{token.icon}</Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.symbol, { color: colors.text }]}>{token.symbol}</Text>
              <Text style={[styles.name, { color: colors.secText }]}>{token.name}</Text>
            </View>
            {token.symbol === selected && (
              <View style={[styles.checkDot, { backgroundColor: Colors.main.primary }]} />
            )}
          </Pressable>
          {index < TOKENS.length - 1 && (
            <View style={[styles.divider, { backgroundColor: colors.borderColor }]} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: FH(6),
    borderRadius: FW(16),
    paddingVertical: FH(4),
    minWidth: FW(200),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: FW(14),
    paddingVertical: FH(12),
    gap: FW(12),
    borderRadius: FW(12),
  },
  iconCircle: {
    width: FW(34),
    height: FW(34),
    borderRadius: FW(17),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: typography.fontSize.md,
  },
  info: {
    flex: 1,
    gap: FH(2),
  },
  symbol: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.semibold,
  },
  name: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
  },
  checkDot: {
    width: FW(8),
    height: FW(8),
    borderRadius: FW(4),
  },
  divider: {
    height: 1,
    marginHorizontal: FW(14),
  },
});
