import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { TickCircle } from "iconsax-react-native";
import { Pressable, StyleSheet, View } from "react-native";

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatarColor: string;
  avatarInitial: string;
  isVerified?: boolean;
};

type Props = {
  conversation: Conversation;
  onPress?: () => void;
};

export function ConversationRow({ conversation, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
      onPress={onPress}
    >
      <View
        style={[styles.avatar, { backgroundColor: conversation.avatarColor }]}
      >
        <Text style={styles.avatarInitial}>{conversation.avatarInitial}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <View style={styles.nameWithBadge}>
            <Text style={[styles.name, { color: colors.primaryText }]}>
              {conversation.name}
            </Text>
            {conversation.isVerified && (
              <TickCircle size={FW(14)} color={colors.secText} variant="Outline" />
            )}
          </View>
          <Text style={[styles.timestamp, { color: colors.secText }]}>
            {conversation.timestamp}
          </Text>
        </View>
        <Text
          style={[styles.lastMessage, { color: colors.secText }]}
          numberOfLines={1}
        >
          {conversation.lastMessage}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: FW(16),
    paddingVertical: FH(14),
    gap: FW(12),
  },
  avatar: {
    width: FW(48),
    height: FW(48),
    borderRadius: FW(24),
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontWeight.bold,
    color: "#fff",
  },
  content: {
    flex: 1,
    gap: FH(4),
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameWithBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(4),
  },
  name: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontWeight.bold,
  },
  timestamp: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
  },
  lastMessage: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
  },
});
