import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { ArrowDown, ArrowUp, MessageText } from "iconsax-react-native";
import { Pressable, StyleSheet, View } from "react-native";

type PostActionsProps = {
  comments: number;
  upvotes: number;
};

export function PostActions({ comments, upvotes }: PostActionsProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Pressable style={styles.action}>
          <MessageText size={FW(18)} color={colors.secText} variant="Outline" />
          <Text style={[styles.count, { color: colors.secText }]}>
            {formatCount(comments)}
          </Text>
        </Pressable>
        <Pressable style={[styles.action, { marginLeft: FW(16) }]}>
          <ArrowUp size={FW(18)} color={colors.secText} variant="Outline" />
        </Pressable>
      </View>

      <View style={styles.right}>
        <Pressable style={styles.voteBtn}>
          <View
            style={[styles.votePill, { borderColor: Colors.accent.purple }]}
          >
            <ArrowUp
              size={FW(14)}
              color={Colors.accent.purple}
              variant="Outline"
            />
          </View>
          <Text style={[styles.count, { color: colors.primaryText }]}>
            {formatCount(upvotes)}
          </Text>
        </Pressable>
        <Pressable style={[styles.voteBtn, { marginLeft: FW(8) }]}>
          <View
            style={[styles.votePill, { borderColor: Colors.semantic.error }]}
          >
            <ArrowDown
              size={FW(14)}
              color={Colors.semantic.error}
              variant="Outline"
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: FH(10),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(4),
  },
  count: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.semibold,
  },
  voteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(5),
  },
  votePill: {
    width: FW(28),
    height: FW(28),
    borderRadius: FW(14),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
