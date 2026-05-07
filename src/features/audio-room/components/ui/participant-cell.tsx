import { StyleSheet, View } from "react-native";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

export type Participant = {
  id: string;
  name: string;
  role: "Host" | "Listening";
  color: string;
};

type ParticipantCellProps = {
  participant: Participant;
};

export function ParticipantCell({ participant }: ParticipantCellProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: participant.color }]} />
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
        {participant.name}
      </Text>
      <Text style={[styles.role, { color: colors.secText }]} numberOfLines={1}>
        {participant.role}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: FW(4),
    marginBottom: FH(16),
  },
  avatar: {
    width: FW(64),
    height: FW(64),
    borderRadius: FW(32),
    marginBottom: FH(6),
  },
  name: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.medium,
    textAlign: "center",
    width: "100%",
  },
  role: {
    fontSize: typography.fontSize.xxs,
    fontFamily: typography.fontWeight.regular,
    textAlign: "center",
    marginTop: FH(2),
  },
});
