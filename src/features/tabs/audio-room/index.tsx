import { ArrowLeft, EmojiHappy, LogoutCurve, Microphone, MicrophoneSlash1, More, More2 } from "iconsax-react-native";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import {
  SafeAreaView,
  Text,
} from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { ParticipantGrid } from "./components/participant-grid";
import { RoomActionButton } from "./components/ui/room-action-button";
import { Participant } from "./components/ui/participant-cell";
import { AvatarStack } from "../explore/components/ui/avatar-stack";

const MOCK_PARTICIPANTS: Participant[] = [
  { id: "1", name: "Demograp...", role: "Host", color: "#E63946" },
  { id: "2", name: "Demograp...", role: "Listening", color: "#7B61FF" },
  { id: "3", name: "Demograp...", role: "Listening", color: "#2EC4B6" },
  { id: "4", name: "Demograp...", role: "Listening", color: "#FAC400" },
  { id: "5", name: "Demograp...", role: "Listening", color: "#FF6B6B" },
  { id: "6", name: "Demograp...", role: "Listening", color: "#4CAF50" },
  { id: "7", name: "Demograp...", role: "Listening", color: "#9C27B0" },
  { id: "8", name: "Demograp...", role: "Listening", color: "#FF9800" },
  { id: "9", name: "Demograp...", role: "Listening", color: "#00BCD4" },
  { id: "10", name: "Demograp...", role: "Listening", color: "#E91E63" },
  { id: "11", name: "Demograp...", role: "Listening", color: "#3F51B5" },
  { id: "12", name: "Demograp...", role: "Listening", color: "#8BC34A" },
];

const ROOM_AVATARS = MOCK_PARTICIPANTS.slice(0, 4).map((p) => ({ color: p.color, initials: "" }));

type AudioRoomScreenProps = {
  roomName?: string;
  roomTitle?: string;
  roomColor?: string;
  hashtag?: string;
  listenerCount?: string;
};

export default function AudioRoomScreen({
  roomName = "Frame Pivot Base",
  roomTitle = "Earn free Stable coins and NFT Airdrops",
  roomColor = Colors.accent.yellow,
  hashtag = "Bear Market",
  listenerCount = "12k",
}: AudioRoomScreenProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderColor }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={FW(24)} color={colors.text} variant="Outline" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={[styles.roomName, { color: colors.text }]}>{roomName}</Text>
          <View style={[styles.chainBadge, { backgroundColor: colors.layerBackground }]}>
            <Text style={[styles.chainText, { color: colors.secText }]}>Base</Text>
          </View>
        </View>
        <Pressable style={styles.menuBtn}>
          <More2 size={FW(20)} color={colors.text} variant="Outline" />
        </Pressable>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1 }}>
        {/* Featured Room Card */}
        <View style={[styles.featuredCard, { backgroundColor: roomColor }]}>
          <View style={styles.cardTopRow}>
            <View style={[styles.hashtagChip, { backgroundColor: "rgba(0,0,0,0.15)" }]}>
              <Text style={styles.hashtagText}>#{hashtag}</Text>
            </View>
            <Pressable>
              <More size={FW(20)} color="rgba(255,255,255,0.85)" variant="Outline" />
            </Pressable>
          </View>

          <Text style={styles.cardTitle}>{roomTitle}</Text>

          <View style={styles.cardFooter}>
            <AvatarStack avatars={ROOM_AVATARS} size={FW(28)} />
            <Text style={styles.listenerText}>{listenerCount} frens listening</Text>
          </View>
        </View>

        {/* Participants */}
        <ParticipantGrid participants={MOCK_PARTICIPANTS} />
      </ScrollView>

      {/* Action Bar */}
      <View style={[styles.actionBar, { borderTopColor: colors.borderColor, backgroundColor: colors.background }]}>
        <RoomActionButton IconComponent={LogoutCurve} label="Leave" destructive onPress={() => router.back()} />
        <RoomActionButton IconComponent={Microphone} label="Request" />
        <RoomActionButton IconComponent={EmojiHappy} label="React" />
        <RoomActionButton IconComponent={MicrophoneSlash1} label="Muted" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: FW(12),
    paddingVertical: FH(10),
    borderBottomWidth: 1,
    gap: FW(8),
  },
  backBtn: {
    padding: FW(4),
  },
  headerTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: FW(8),
  },
  roomName: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontWeight.bold,
  },
  chainBadge: {
    paddingHorizontal: FW(10),
    paddingVertical: FH(3),
    borderRadius: FW(10),
  },
  chainText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.medium,
  },
  menuBtn: {
    padding: FW(4),
  },
  featuredCard: {
    margin: FW(16),
    borderRadius: FW(16),
    padding: FW(16),
    minHeight: FH(160),
    justifyContent: "space-between",
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hashtagChip: {
    paddingHorizontal: FW(10),
    paddingVertical: FH(4),
    borderRadius: FW(10),
  },
  hashtagText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.medium,
    color: "#fff",
  },
  cardTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontWeight.bold,
    color: "#fff",
    marginTop: FH(10),
    lineHeight: typography.fontSize.xl * 1.3,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(10),
    marginTop: FH(16),
  },
  listenerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
    color: "rgba(255,255,255,0.9)",
  },
  actionBar: {
    flexDirection: "row",
    paddingVertical: FH(16),
    paddingHorizontal: FW(8),
    borderTopWidth: 1,
    gap: FW(4),
  },
});
