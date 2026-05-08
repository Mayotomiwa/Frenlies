import {
  FlatList,
  SafeAreaView,
  Text,
} from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { Add, Microphone2, Notification, SearchNormal1, Setting4 } from "iconsax-react-native";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";
import { AudioRoom, AudioRoomCard } from "./components/audio-room-card";
import { FeedPost, FeedPostCard } from "./components/feed-post-card";
import { ExploreTab, TabToggle } from "./components/ui/tab-toggle";

const AVATAR_COLORS = ["#7B61FF", "#FF6B6B", "#2EC4B6", "#FAC400", "#E63946"];

const AVATARS = [
  require("@/assets/images/avatar1.png"),
  require("@/assets/images/avatar2.png"),
  require("@/assets/images/avatar3.png"),
  require("@/assets/images/avatar4.png"),
  require("@/assets/images/avatar5.png"),
  require("@/assets/images/avatar6.png"),
  require("@/assets/images/avatar7.png"),
];

const MOCK_POSTS: FeedPost[] = [
  {
    id: "1",
    author: { name: "Associate antling tissue", color: "#FF6B6B", image: AVATARS[0] },
    postedIn: "web3",
    postedAt: "15s ago",
    title: "Web3 in its infancy",
    body: "While several Web3 dapps exist, there is no broad Web3 infrastructure like the current internet. Significant widespread development, consolidation and accessibility...",
    comments: 129,
    upvotes: 58,
  },
  {
    id: "2",
    author: { name: "Demograph dancing bone", color: "#E63946", image: AVATARS[1] },
    postedIn: "Bear Market",
    postedAt: "2h ago",
    title: "Is this market crash the end of crypto?",
    body: "During the last few years, Bitcoin switched from being an asset that no one paid attention to, to an asset that nearly everyone was looking to own, and then to an asset that...",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    comments: 45,
    upvotes: 21,
  },
  {
    id: "3",
    author: { name: "Popular cotton bold", color: "#2EC4B6", image: AVATARS[2] },
    postedIn: "Bear Market",
    postedAt: "3d ago",
    title: "Earn free crypto",
    body: "There are so many ways to earn free cryptocurrency but you may not have heard of them because most people entering the crypto space are focused on trading...",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80",
    linkTitle: "Earn crypto for free: 10 proven ways",
    linkUrl: "https://frnli.es/24fcr3",
    comments: 567,
    upvotes: 0,
  },
];

const MOCK_ROOMS: AudioRoom[] = [
  {
    id: "1",
    title: "Web3 in its infancy",
    color: Colors.main.secondary,
    host: { name: "Popular cotton bold", color: "#2EC4B6", image: AVATARS[3] },
    hashtag: "web3",
    listeners: "27",
    participants: AVATAR_COLORS.map((c, i) => ({ color: c, initials: "", image: AVATARS[i % AVATARS.length] })),
  },
  {
    id: "2",
    title: "Earn free Stable coins and NFT Airdrops",
    color: Colors.accent.yellow,
    host: { name: "Demograph dancing...", color: "#E63946", image: AVATARS[4] },
    hashtag: "Bear Market",
    listeners: "12k",
    participants: AVATAR_COLORS.map((c, i) => ({ color: c, initials: "", image: AVATARS[(i + 2) % AVATARS.length] })),
  },
  {
    id: "3",
    title: "Is this market crash the end of crypto?",
    color: Colors.main.primary,
    host: { name: "Popular cotton bold", color: "#2EC4B6", image: AVATARS[5] },
    hashtag: "crypto...",
    listeners: "9k",
    participants: AVATAR_COLORS.map((c, i) => ({ color: c, initials: "", image: AVATARS[(i + 4) % AVATARS.length] })),
  },
  {
    id: "4",
    title: "There's a lot to look forward to with Crypto loans",
    color: Colors.accent.darkGreen,
    host: { name: "Demograph", color: "#E63946", image: AVATARS[6] },
    hashtag: "Bear...",
    listeners: "684k",
    participants: AVATAR_COLORS.map((c, i) => ({ color: c, initials: "", image: AVATARS[(i + 1) % AVATARS.length] })),
  },
];

export default function ExploreScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<ExploreTab>("feeds");

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerMaxHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [120, 0],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header — collapses on scroll */}
      <Animated.View
        style={{ maxHeight: headerMaxHeight, opacity: headerOpacity, overflow: "hidden" }}
      >
        <View style={[styles.header, { borderBottomColor: colors.borderColor }]}>
          <View style={styles.logoMark}>
            <View style={styles.direction}>
              <View style={[styles.dot, { backgroundColor: colors.primaryText }]} />
              <View style={[styles.dot, { backgroundColor: colors.secText }]} />
            </View>
            <View style={styles.direction}>
              <View style={[styles.dot, { backgroundColor: colors.secText }]} />
              <View style={[styles.dot, { backgroundColor: colors.primaryText }]} />
            </View>
          </View>

          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.background, borderColor: colors.borderColor },
            ]}
          >
            <SearchNormal1 size={FW(16)} color={colors.secText} variant="Outline" />
            <TextInput
              placeholder="Search"
              placeholderTextColor={colors.secText}
              style={[
                styles.searchInput,
                { color: colors.text, fontFamily: typography.fontWeight.regular },
              ]}
            />
          </View>

          <Pressable style={styles.bellWrap}>
            <Notification size={FW(24)} color={colors.primaryText} variant="Outline" />
            <View style={[styles.badge, { backgroundColor: Colors.main.primary }]}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </Pressable>
        </View>
      </Animated.View>

      {/* Tab row — always visible */}
      <View style={[styles.tabRow, { borderBottomColor: colors.borderColor }]}>
        <TabToggle active={activeTab} onChange={setActiveTab} />
        <Pressable style={styles.filterBtn}>
          <Setting4 size={FW(22)} color={colors.text} variant="Outline" />
        </Pressable>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {activeTab === "feeds" ? (
          <FlatList
            key="feeds"
            data={MOCK_POSTS}
            keyExtractor={(item: FeedPost) => item.id}
            renderItem={({ item }: { item: FeedPost }) => (
              <FeedPostCard post={item} />
            )}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            key="rooms"
            data={MOCK_ROOMS}
            keyExtractor={(item: AudioRoom) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.roomRow}
            contentContainerStyle={styles.roomsContent}
            renderItem={({ item }: { item: AudioRoom }) => (
              <AudioRoomCard room={item} />
            )}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* FAB */}
        <Pressable style={[styles.fab, { backgroundColor: Colors.main.primary }]}>
          {activeTab === "feeds" ? (
            <Add size={FW(26)} color={Colors.neutral.black} variant="Linear" />
          ) : (
            <Microphone2 size={FW(26)} color={Colors.neutral.black} variant="Outline" />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: FW(16),
    paddingVertical: FH(10),
    gap: FW(10),
  },
  logoMark: {
    gap: FW(5),
    alignItems: "center",
  },
  direction: {
    flexDirection: "row",
    gap: FW(5),
  },
  dot: {
    width: FW(6),
    height: FW(6),
    borderRadius: FW(4),
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: FW(20),
    borderWidth: 1,
    paddingHorizontal: FW(12),
    paddingVertical: FH(8),
    gap: FW(6),
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    padding: 0,
  },
  bellWrap: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -FH(4),
    right: -FW(4),
    minWidth: FW(16),
    height: FW(16),
    borderRadius: FW(8),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: FW(3),
  },
  badgeText: {
    fontSize: typography.fontSize.xxxs,
    fontFamily: typography.fontWeight.bold,
    color: Colors.neutral.black,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: FW(16),
    paddingVertical: FH(10),
    borderBottomWidth: 1,
  },
  filterBtn: {
    padding: FW(4),
  },
  roomRow: {
    gap: FW(16),
    paddingHorizontal: FW(16),
  },
  roomsContent: {
    paddingTop: FH(16),
    paddingBottom: FH(100),
    gap: FH(20),
  },
  fab: {
    position: "absolute",
    bottom: FH(24),
    right: FW(20),
    width: FW(56),
    height: FW(56),
    borderRadius: FW(28),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
