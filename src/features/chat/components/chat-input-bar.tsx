import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import {
  Add,
  Camera,
  EmojiHappy,
  Global,
  Microphone2,
  Send2,
} from "iconsax-react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { ActionPopup } from "./action-popup";

type ChatInputBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCamera: () => void;
  onMic: () => void;
  onSendCrypto: () => void;
  onFlauntNFT: () => void;
};

export function ChatInputBar({
  value,
  onChangeText,
  onSend,
  menuOpen,
  onToggleMenu,
  onCamera,
  onMic,
  onSendCrypto,
  onFlauntNFT,
}: ChatInputBarProps) {
  const { colors } = useTheme();
  const isTyping = value.trim().length > 0;

  return (
    <View>
      <ActionPopup
        visible={menuOpen}
        onSendCrypto={onSendCrypto}
        onFlauntNFT={onFlauntNFT}
      />
      <View
        style={[
          styles.container,
          {
            borderTopColor: colors.borderColor,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Pressable onPress={onCamera} style={styles.sideBtn}>
          <Camera size={FW(24)} color={colors.primaryText} variant="Outline" />
        </Pressable>

        <View
          style={[
            styles.inputWrap,
            { backgroundColor: colors.layerBackground },
          ]}
        >
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Message..."
            placeholderTextColor={colors.secText}
            style={[
              styles.input,
              {
                color: colors.primaryText,
                fontFamily: typography.fontWeight.regular,
              },
            ]}
            multiline
          />
          <View style={styles.inputActions}>
            <Pressable>
              <Global size={FW(20)} color={colors.secText} variant="Outline" />
            </Pressable>
            <Pressable>
              <EmojiHappy
                size={FW(20)}
                color={colors.secText}
                variant="Outline"
              />
            </Pressable>
            <Pressable
              onPress={onToggleMenu}
              style={[
                styles.plusBtn,
                { backgroundColor: Colors.main.secondary },
              ]}
            >
              {menuOpen ? (
                <View style={{ transform: [{ rotate: "45deg" }] }}>
                  <Add
                    size={FW(18)}
                    color={Colors.neutral.white}
                    variant="Linear"
                  />
                </View>
              ) : (
                <Add
                  size={FW(18)}
                  color={Colors.neutral.white}
                  variant="Linear"
                />
              )}
            </Pressable>
          </View>
        </View>

        <Pressable onPress={isTyping ? onSend : onMic} style={styles.sideBtn}>
          {isTyping ? (
            <Send2 size={FW(24)} color={Colors.main.secondary} variant="Bold" />
          ) : (
            <Microphone2
              size={FW(24)}
              color={colors.primaryText}
              variant="Outline"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: FW(12),
    paddingVertical: FH(10),
    borderTopWidth: 1,
    gap: FW(8),
  },
  sideBtn: {
    paddingBottom: FH(8),
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: FW(24),
    paddingLeft: FW(16),
    paddingRight: FW(8),
    paddingVertical: FH(8),
    minHeight: FH(44),
    gap: FW(8),
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    maxHeight: FH(100),
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(8),
    paddingBottom: FH(2),
  },
  plusBtn: {
    width: FW(30),
    height: FW(30),
    borderRadius: FW(15),
    justifyContent: "center",
    alignItems: "center",
  },
});
