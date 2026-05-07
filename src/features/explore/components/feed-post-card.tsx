import { Link, More } from "iconsax-react-native";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { Text } from "@/src/shared/global/component/layout/tags/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { PostActions } from "./ui/post-actions";

export type FeedPost = {
  id: string;
  author: { name: string; color: string; image?: number };
  postedIn: string;
  postedAt: string;
  title: string;
  body: string;
  image?: string | number;
  linkUrl?: string;
  linkTitle?: string;
  comments: number;
  upvotes: number;
};

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

type FeedPostCardProps = {
  post: FeedPost;
};

export function FeedPostCard({ post }: FeedPostCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.borderColor }]}>
      {/* Author row: avatar | name + time + ... on one line, hashtag chip below */}
      <View style={styles.authorRow}>
        <View style={[styles.avatar, { backgroundColor: post.author.color }]}>
          {post.author.image != null ? (
            <Image source={post.author.image} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <Text style={styles.initials}>{getInitials(post.author.name)}</Text>
          )}
        </View>

        <View style={styles.authorMeta}>
          <View style={styles.nameRow}>
            <Text style={[styles.authorName, { color: colors.text }]} numberOfLines={1}>
              {post.author.name}
            </Text>
            <Text style={[styles.timeAgo, { color: colors.secText }]}>{post.postedAt}</Text>
            <Pressable hitSlop={8}>
              <More size={FW(16)} color={colors.secText} variant="Outline" />
            </Pressable>
          </View>

          <View style={styles.postedRow}>
            <Text style={[styles.postedLabel, { color: colors.secText }]}>Posted in </Text>
            <View style={[styles.hashtagChip, { backgroundColor: Colors.accent.purpleLight }]}>
              <Text style={styles.hashtagText}>#{post.postedIn}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>

      {/* Image + optional link overlay */}
      {post.image && (
        <View style={styles.imageContainer}>
          <Image
            source={typeof post.image === "string" ? { uri: post.image } : post.image}
            style={styles.image}
            contentFit="cover"
          />
          {post.linkUrl && (
            <View style={[styles.linkCardOverlay, { backgroundColor: Colors.accent.purple }]}>
              <Link size={FW(16)} color="#fff" variant="Outline" />
              <View style={{ flex: 1 }}>
                <Text style={styles.linkTitle} numberOfLines={1}>{post.linkTitle}</Text>
                <Text style={styles.linkUrl} numberOfLines={1}>{post.linkUrl}</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Standalone link card when no image */}
      {!post.image && post.linkUrl && (
        <View style={[styles.linkCard, { backgroundColor: Colors.accent.purple }]}>
          <Link size={FW(16)} color="#fff" variant="Outline" />
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle} numberOfLines={1}>{post.linkTitle}</Text>
            <Text style={styles.linkUrl} numberOfLines={1}>{post.linkUrl}</Text>
          </View>
        </View>
      )}

      {/* Body */}
      <Text style={[styles.body, { color: colors.secText }]} numberOfLines={3}>
        {post.body}
      </Text>

      <PostActions comments={post.comments} upvotes={post.upvotes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: FW(16),
    paddingVertical: FH(16),
    borderBottomWidth: 1,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: FH(12),
    gap: FW(10),
  },
  avatar: {
    width: FW(42),
    height: FW(42),
    borderRadius: FW(21),
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  initials: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.bold,
    color: "#fff",
  },
  authorMeta: {
    flex: 1,
    gap: FH(3),
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(6),
  },
  authorName: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.bold,
    flex: 1,
  },
  timeAgo: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
    flexShrink: 0,
  },
  postedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  postedLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
  },
  hashtagChip: {
    paddingHorizontal: FW(8),
    paddingVertical: FH(2),
    borderRadius: FW(10),
  },
  hashtagText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.semibold,
    color: Colors.accent.purple,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontWeight.bold,
    marginBottom: FH(8),
    lineHeight: typography.fontSize.lg * 1.3,
  },
  imageContainer: {
    position: "relative",
    marginBottom: FH(8),
  },
  image: {
    width: "100%",
    height: FH(200),
    borderRadius: FW(12),
  },
  linkCardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: FW(12),
    borderBottomRightRadius: FW(12),
    paddingHorizontal: FW(12),
    paddingVertical: FH(12),
    gap: FW(10),
  },
  linkCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: FW(10),
    paddingHorizontal: FW(12),
    paddingVertical: FH(12),
    gap: FW(10),
    marginBottom: FH(8),
  },
  linkTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.semibold,
    color: "#fff",
  },
  linkUrl: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontWeight.regular,
    color: "rgba(255,255,255,0.75)",
    marginTop: FH(2),
  },
  body: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * 1.6,
  },
});
