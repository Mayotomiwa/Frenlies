import { More } from "iconsax-react-native";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW, SCREEN_WIDTH } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { AvatarData, AvatarStack } from "./ui/avatar-stack";
import { Colors } from "@/src/shared/global/constants/colors";

export type AudioRoom = {
  id: string;
  title: string;
  color: string;
  host: { name: string; color: string; image?: number };
  hashtag: string;
  listeners: string;
  participants: AvatarData[];
};

type AudioRoomCardProps = {
  room: AudioRoom;
  onPress?: () => void;
  onMenuPress?: () => void;
};

const CARD_WIDTH = (SCREEN_WIDTH - FW(16) * 3) / 2;

export function AudioRoomCard({ room, onPress, onMenuPress }: AudioRoomCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <View style={[styles.card, { backgroundColor: room.color }]}>
        <View style={styles.cardHeader}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Pressable onPress={onMenuPress} hitSlop={8}>
            <More size={FW(18)} color="rgba(255,255,255,0.85)" variant="Outline" />
          </Pressable>
        </View>

        <Text style={styles.roomTitle} numberOfLines={3}>
          {room.title}
        </Text>

        <View style={styles.cardFooter}>
          <AvatarStack avatars={room.participants} size={FW(24)} />
          <Text style={styles.listenerCount}>{room.listeners} frens listening</Text>
        </View>
      </View>

      <View style={styles.hostRow}>
        <View style={[styles.hostAvatar, { backgroundColor: room.host.color }]}>
            {room.host.image != null && (
              <Image source={room.host.image} style={StyleSheet.absoluteFill} contentFit="cover" />
            )}
          </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.hostName, { color: colors.text }]} numberOfLines={1}>
            {room.host.name}
          </Text>
          <View style={styles.hostedIn}>
            <Text style={[styles.hostedLabel, { color: colors.secText }]}>Hosted in </Text>
            <Text style={styles.hostHashtag} numberOfLines={1}>
              #{room.hashtag}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
  },
  card: {
    borderRadius: FW(14),
    padding: FW(12),
    minHeight: FH(160),
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: FH(8),
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(4),
  },
  liveDot: {
    width: FW(7),
    height: FW(7),
    borderRadius: FW(4),
    backgroundColor: "#fff",
  },
  liveText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.bold,
    color: "#fff",
    letterSpacing: 0.5,
  },
  roomTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontWeight.bold,
    color: "#fff",
    flex: 1,
    lineHeight: typography.fontSize.md * 1.4,
  },
  cardFooter: {
    marginTop: FH(12),
    gap: FH(4),
  },
  listenerCount: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
    color: "rgba(255,255,255,0.9)",
    marginTop: FH(4),
  },
  hostRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(8),
    marginTop: FH(8),
    paddingHorizontal: FW(2),
  },
  hostAvatar: {
    width: FW(24),
    height: FW(24),
    borderRadius: FW(12),
    flexShrink: 0,
    overflow: "hidden",
  },
  hostName: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.semibold,
  },
  hostedIn: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostedLabel: {
    fontSize: typography.fontSize.xxs,
    fontFamily: typography.fontWeight.regular,
  },
  hostHashtag: {
    fontSize: typography.fontSize.xxs,
    fontFamily: typography.fontWeight.medium,
    color: Colors.accent.purple,
  },
});
