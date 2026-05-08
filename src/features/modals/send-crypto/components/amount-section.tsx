import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { ArrowSwapVertical } from "iconsax-react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Token, TokenDropdown } from "./ui/token-dropdown";
import { TokenSelector } from "./ui/token-selector";

type AmountSectionProps = {
  usdAmount: string;
  cryptoAmount: string;
  availableBalance: string;
  symbol?: string;
  dropdownOpen: boolean;
  onDropdownOpenChange: (open: boolean) => void;
  onChangeAmount: (val: string) => void;
  onUseMax: () => void;
  onSwap: () => void;
  onTokenSelect: (token: Token) => void;
};

export function AmountSection({
  usdAmount,
  cryptoAmount,
  availableBalance,
  symbol = "ETH",
  dropdownOpen,
  onDropdownOpenChange,
  onChangeAmount,
  onUseMax,
  onSwap,
  onTokenSelect,
}: AmountSectionProps) {
  const { colors } = useTheme();

  const handleTokenSelect = (token: Token) => {
    onDropdownOpenChange(false);
    onTokenSelect(token);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.secText }]}>
          Enter amount
        </Text>
        <Text style={[styles.label, { color: colors.secText }]}>From</Text>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.amountLeft}>
          <View style={styles.dollarRow}>
            <Text
              style={[
                styles.dollarSign,
                { color: usdAmount ? colors.text : colors.subTitle },
              ]}
            >
              $
            </Text>
            <TextInput
              value={usdAmount}
              onChangeText={onChangeAmount}
              placeholder="0.00"
              placeholderTextColor={colors.subTitle}
              keyboardType="decimal-pad"
              style={[
                styles.amountInput,
                { color: colors.text, fontFamily: typography.fontWeight.bold },
              ]}
            />
            <Pressable
              onPress={onSwap}
              style={[
                styles.swapBtn,
                { backgroundColor: Colors.accent.purpleLight },
              ]}
            >
              <ArrowSwapVertical
                size={FW(20)}
                color={Colors.accent.purple}
                variant="Outline"
              />
            </Pressable>
          </View>
          <Text style={[styles.cryptoEquiv, { color: colors.secText }]}>
            {cryptoAmount} {symbol}
          </Text>
        </View>

        <View style={styles.tokenWrap}>
          <TokenSelector
            symbol={symbol}
            onPress={() => onDropdownOpenChange(!dropdownOpen)}
          />
          <TokenDropdown
            visible={dropdownOpen}
            selected={symbol}
            onSelect={handleTokenSelect}
          />
        </View>
      </View>
      <View style={styles.balanceRow}>
        <Pressable onPress={onUseMax}>
          <Text style={[styles.useMax, { color: Colors.main.secondary }]}>
            Use Max
          </Text>
        </Pressable>
        <Text style={[styles.available, { color: colors.secText }]}>
          Avail.{" "}
          <Text style={[styles.availableValue, { color: colors.secText }]}>
            {availableBalance} {symbol}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: FH(5),
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: FH(8),
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(12),
    marginBottom: FH(6),
  },
  amountLeft: {
    flex: 1,
  },
  dollarRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dollarSign: {
    fontSize: typography.fontSize["2xl"],
    fontFamily: typography.fontWeight.bold,
    marginRight: FW(2),
  },
  amountInput: {
    fontSize: typography.fontSize["2xl"],
    minWidth: FW(80),
    padding: 0,
    includeFontPadding: false,
  },
  cryptoEquiv: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
    marginTop: FH(2),
  },
  swapBtn: {
    width: FW(44),
    height: FW(44),
    borderRadius: FW(22),
    justifyContent: "center",
    alignItems: "center",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: FH(40),
  },
  useMax: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.semibold,
  },
  available: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
  },
  availableValue: {
    fontFamily: typography.fontWeight.semibold,
  },
  tokenWrap: {
    position: "relative",
  },
});
