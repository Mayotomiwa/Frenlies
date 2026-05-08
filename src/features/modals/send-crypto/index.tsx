import {
  SafeAreaView,
  Text,
} from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { Add } from "iconsax-react-native";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { AmountSection } from "./components/amount-section";
import { RecipientSection } from "./components/recipient-section";
import { Token, TOKENS } from "./components/ui/token-dropdown";

const AVAILABLE_BALANCE = "12.4541";

export default function SendCryptoScreen() {
  const { colors } = useTheme();
  const [usdAmount, setUsdAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [selectedToken, setSelectedToken] = useState<Token>(TOKENS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cryptoAmount = usdAmount
    ? (
        parseFloat(usdAmount.replace(/,/g, "")) / selectedToken.priceUsd
      ).toFixed(4)
    : "0.00";

  const isReady = usdAmount.length > 0 && recipient.length > 0;

  const handleUseMax = () => {
    const maxUsd = (
      parseFloat(AVAILABLE_BALANCE) * selectedToken.priceUsd
    ).toFixed(2);
    setUsdAmount(maxUsd);
  };

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) setRecipient(text);
  };

  const handleSend = () => {
    Keyboard.dismiss();
    router.back();
  };

  return (
    <Pressable
      style={{ flex: 1, backgroundColor: colors.background }}
      onPress={Keyboard.dismiss}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Sheet Header */}
        <View
          style={[
            styles.sheetHeader,
            { borderBottomColor: colors.borderColor },
          ]}
        >
          <View style={styles.headerSpacer} />
          <Text style={[styles.title, { color: colors.primaryText }]}>
            Send
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={[
              styles.closeBtn,
              { backgroundColor: colors.layerBackground },
            ]}
          >
            <View style={{ transform: [{ rotate: "45deg" }] }}>
              <Add size={FW(18)} color={colors.primaryText} variant="Linear" />
            </View>
          </Pressable>
        </View>

        {/* Backdrop — closes dropdown when tapping outside */}
        {dropdownOpen && (
          <Pressable
            style={[StyleSheet.absoluteFillObject, styles.backdrop]}
            onPress={() => {
              setDropdownOpen(false);
              Keyboard.dismiss();
            }}
          />
        )}

        {/* Body */}
        <View style={styles.body}>
          <AmountSection
            usdAmount={usdAmount}
            cryptoAmount={cryptoAmount}
            availableBalance={AVAILABLE_BALANCE}
            symbol={selectedToken.symbol}
            dropdownOpen={dropdownOpen}
            onDropdownOpenChange={setDropdownOpen}
            onChangeAmount={setUsdAmount}
            onUseMax={handleUseMax}
            onSwap={() => {}}
            onTokenSelect={setSelectedToken}
          />

          <View
            style={[styles.divider, { backgroundColor: colors.borderColor }]}
          />

          <RecipientSection
            value={recipient}
            onChangeText={setRecipient}
            onPaste={handlePaste}
            recentAddress="0xd4e...e870"
            onSelectAddress={(addr) => setRecipient(addr)}
          />
        </View>

        {/* Send Button */}
        <View style={[styles.footer, { backgroundColor: colors.background }]}>
          <Pressable
            style={[
              styles.sendBtn,
              {
                backgroundColor: isReady
                  ? Colors.main.primary
                  : Colors.accent.greenLight,
              },
            ]}
            disabled={!isReady}
            onPress={handleSend}
          >
            <Text
              style={[
                styles.sendBtnText,
                {
                  color: isReady
                    ? Colors.neutral.black
                    : Colors.neutral.gray300,
                },
              ]}
            >
              Send
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: FW(16),
    paddingVertical: FH(14),
    borderBottomWidth: 1,
  },
  headerSpacer: {
    width: FW(36),
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontWeight.bold,
  },
  closeBtn: {
    width: FW(36),
    height: FW(36),
    borderRadius: FW(18),
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    zIndex: 90,
  },
  body: {
    flex: 1,
    paddingHorizontal: FW(20),
    paddingTop: FH(20),
    gap: FH(20),
    zIndex: 100,
  },
  divider: {
    height: 1,
  },
  footer: {
    paddingHorizontal: FW(20),
    paddingBottom: FH(250),
    paddingTop: FH(12),
  },
  sendBtn: {
    borderRadius: FW(32),
    paddingVertical: FH(16),
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontWeight.bold,
  },
});
