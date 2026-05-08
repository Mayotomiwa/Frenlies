import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { AddressChip } from "./ui/address-chip";

type RecipientSectionProps = {
  value: string;
  onChangeText: (text: string) => void;
  onPaste: () => void;
  recentAddress?: string;
  onSelectAddress?: (address: string) => void;
};

export function RecipientSection({
  value,
  onChangeText,
  onPaste,
  recentAddress,
  onSelectAddress,
}: RecipientSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: colors.text }]}>Send to</Text>

      <View style={styles.inputHeader}>
        <Text style={[styles.placeholder, { color: colors.subTitle }]}>
          Enter Chat name, Address or ENS name
        </Text>
        <Pressable onPress={onPaste}>
          <Text style={[styles.pasteBtn, { color: Colors.main.secondary }]}>Paste</Text>
        </Pressable>
      </View>

      <View style={[styles.inputBox, { backgroundColor: colors.layerBackground }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            {
              color: colors.text,
              fontFamily: typography.fontWeight.regular,
            },
          ]}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {recentAddress && (
        <View style={styles.chips}>
          <AddressChip
            address={recentAddress}
            onPress={() => onSelectAddress?.(recentAddress)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontWeight.bold,
    marginBottom: FH(14),
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: FH(8),
  },
  placeholder: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
    flex: 1,
  },
  pasteBtn: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.semibold,
  },
  inputBox: {
    borderRadius: FW(14),
    paddingHorizontal: FW(14),
    paddingVertical: FH(14),
    minHeight: FH(72),
  },
  input: {
    fontSize: typography.fontSize.sm,
    minHeight: FH(44),
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: FW(8),
    marginTop: FH(12),
  },
});
