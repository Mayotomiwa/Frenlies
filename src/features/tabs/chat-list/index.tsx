import {
  FlatList,
  SafeAreaView,
  Text,
} from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { Edit2, SearchNormal1 } from "iconsax-react-native";
import { router } from "expo-router";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Conversation, ConversationRow } from "./components/conversation-row";

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Frame Pivot Base",
    lastMessage: "You: The ETH merge is going to ch...",
    timestamp: "at 8:04 am",
    avatarColor: Colors.accent.purple,
    avatarInitial: "F",
    isVerified: true,
  },
  {
    id: "2",
    name: "#web3",
    lastMessage: "You: The ETH merge is going to ch...",
    timestamp: "at 8:04 am",
    avatarColor: Colors.main.primary,
    avatarInitial: "W",
  },
  {
    id: "3",
    name: "#nfts",
    lastMessage: "You: The ETH merge is going to ch...",
    timestamp: "at 8:04 am",
    avatarColor: Colors.main.primary,
    avatarInitial: "N",
  },
  {
    id: "4",
    name: "Dark Heck Vector",
    lastMessage: "You: The ETH merge is going to ch...",
    timestamp: "at 8:04 am",
    avatarColor: Colors.accent.darkGreen,
    avatarInitial: "D",
    isVerified: true,
  },
];

export default function ChatListScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.header, { borderBottomColor: colors.borderColor }]}>
        <Text style={[styles.title, { color: colors.primaryText }]}>Chat</Text>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.background,
              borderColor: colors.borderColor,
            },
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
        <Pressable style={styles.composeBtn}>
          <Edit2 size={FW(26)} color={colors.text} variant="Outline" />
        </Pressable>
      </View>

      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item: Conversation) => item.id}
        renderItem={({ item }: { item: Conversation }) => (
          <ConversationRow
            conversation={item}
            onPress={() =>
              router.push({
                pathname: "/(pages)/chat",
                params: {
                  contactName: item.name,
                  contactColor: item.avatarColor,
                },
              })
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={[styles.separator, { backgroundColor: colors.borderColor }]}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: FW(16),
    paddingVertical: FH(12),
    borderBottomWidth: 1,
    gap: FW(10),
  },
  title: {
    fontSize: typography.fontSize["2xl"],
    fontFamily: typography.fontWeight.bold,
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
  composeBtn: {
    padding: FW(4),
  },
  separator: {
    height: 1,
    marginHorizontal: FW(16),
  },
});
