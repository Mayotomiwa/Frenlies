import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { Check, TickCircle } from "iconsax-react-native";
import { StyleSheet, View } from "react-native";

export type ChatMessage = {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  read?: boolean;
};

type MessageBubbleProps = {
  message: ChatMessage;
  showAvatar?: boolean;
  avatarColor?: string;
};

export function MessageBubble({
  message,
  showAvatar = false,
  avatarColor = Colors.accent.purple,
}: MessageBubbleProps) {
  const { colors } = useTheme();
  const { text, timestamp, isSent, read } = message;

  if (isSent) {
    return (
      <View style={styles.sentRow}>
        <View style={styles.sentMeta}>
          <Text style={[styles.timestamp, { color: colors.secText }]}>
            {timestamp}
          </Text>
          {read !== undefined &&
            (read ? (
              <TickCircle
                size={FW(14)}
                color={Colors.main.secondary}
                variant="Bold"
              />
            ) : (
              <Check size={FW(14)} color={colors.secText} variant="Outline" />
            ))}
        </View>
        <View
          style={[
            styles.sentBubble,
            { borderColor: Colors.accent.purpleLight },
          ]}
        >
          <Text style={[styles.bubbleText, { color: colors.text }]}>
            {text}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.receivedRow}>
      {showAvatar ? (
        <View style={[styles.avatar, { backgroundColor: avatarColor }]} />
      ) : (
        <View style={styles.avatarSpacer} />
      )}
      <View style={styles.receivedContent}>
        <View style={styles.receivedBubble}>
          <Text style={[styles.bubbleText, { color: "#fff" }]}>{text}</Text>
        </View>
        <Text
          style={[
            styles.timestamp,
            { color: colors.secText, marginTop: FH(3) },
          ]}
        >
          {timestamp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sentRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: FH(6),
    paddingHorizontal: FW(16),
    gap: FW(6),
  },
  sentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(3),
    marginBottom: FH(2),
  },
  sentBubble: {
    alignSelf: "flex-end",
    maxWidth: "70%",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: FW(18),
    borderBottomRightRadius: FW(4),
    paddingHorizontal: FW(14),
    paddingVertical: FH(10),
  },
  receivedRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: FH(6),
    paddingHorizontal: FW(16),
    gap: FW(8),
  },
  receivedContent: {
    flexShrink: 1,
  },
  receivedBubble: {
    alignSelf: "flex-start",
    maxWidth: FW(260),
    backgroundColor: Colors.accent.purple,
    borderRadius: FW(18),
    borderBottomLeftRadius: FW(4),
    paddingHorizontal: FW(14),
    paddingVertical: FH(10),
  },
  avatar: {
    width: FW(32),
    height: FW(32),
    borderRadius: FW(16),
  },
  avatarSpacer: {
    width: FW(32),
  },
  bubbleText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * 1.5,
  },
  timestamp: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
  },
});
