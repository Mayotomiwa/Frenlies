import {
  FlatList,
  SafeAreaView,
  Text,
} from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Lock1, More2 } from "iconsax-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ChatInputBar } from "./components/chat-input-bar";
import { DateSeparator } from "./components/ui/date-separator";
import { ChatMessage, MessageBubble } from "./components/ui/message-bubble";

const MOCK_MESSAGES: ChatMessage[] = [
  { id: "1", text: "hello", timestamp: "8:04 am", isSent: false },
  { id: "2", text: "Hi", timestamp: "8:04 am", isSent: true, read: true },
  {
    id: "3",
    text: "How're you doing today?",
    timestamp: "8:04 am",
    isSent: false,
  },
  {
    id: "4",
    text: "Very well, thank you",
    timestamp: "8:04 am",
    isSent: true,
    read: true,
  },
  { id: "5", text: "wbu?", timestamp: "8:04 am", isSent: true, read: true },
  {
    id: "6",
    text: "I'm doing great too, thank you",
    timestamp: "8:04 am",
    isSent: false,
  },
  {
    id: "7",
    text: "How can I help you?",
    timestamp: "8:04 am",
    isSent: true,
    read: false,
  },
  {
    id: "8",
    text: "Is there a reason why you decided to chat me up?",
    timestamp: "8:06 am",
    isSent: true,
    read: false,
  },
  {
    id: "9",
    text: "I was hoping we could discuss some mutual interests",
    timestamp: "8:06 am",
    isSent: false,
  },
];

export default function ChatScreen() {
  const {
    contactName = "Frame Pivot Base",
    contactColor = Colors.accent.purple,
  } = useLocalSearchParams<{ contactName: string; contactColor: string }>();
  const { colors } = useTheme();
  const [inputText, setInputText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View
          style={[styles.header, { borderBottomColor: colors.borderColor }]}
        >
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft
              size={FW(24)}
              color={colors.primaryText}
              variant="Outline"
            />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={[styles.contactName, { color: colors.primaryText }]}>
              {contactName}
            </Text>
            <View style={styles.encryptedRow}>
              <Lock1 size={FW(11)} color={colors.secText} variant="Outline" />
              <Text style={[styles.encryptedLabel, { color: colors.secText }]}>
                encrypted
              </Text>
            </View>
          </View>
          <Pressable style={styles.menuBtn}>
            <More2 size={FW(20)} color={colors.primaryText} variant="Outline" />
          </Pressable>
        </View>

        {/* Messages */}
        <FlatList
          data={MOCK_MESSAGES}
          keyExtractor={(item: ChatMessage) => item.id}
          renderItem={({ item }: { item: ChatMessage }) => (
            <MessageBubble
              message={item}
              showAvatar={!item.isSent}
              avatarColor={contactColor}
            />
          )}
          ListHeaderComponent={<DateSeparator label="Today, Aug 27" />}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />

        {/* Backdrop — closes action popup when tapping outside */}
        {menuOpen && (
          <Pressable
            style={[StyleSheet.absoluteFillObject, styles.menuBackdrop]}
            onPress={() => setMenuOpen(false)}
          />
        )}

        {/* Input */}
        <View style={styles.inputWrapper}>
          <ChatInputBar
            value={inputText}
            onChangeText={setInputText}
            onSend={() => setInputText("")}
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((v) => !v)}
            onCamera={() => {}}
            onMic={() => {}}
            onSendCrypto={() => {
              setMenuOpen(false);
              router.push("/(modals)/send-crypto");
            }}
            onFlauntNFT={() => setMenuOpen(false)}
          />
        </View>
      </KeyboardAvoidingView>
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
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  contactName: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontWeight.bold,
  },
  encryptedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: FW(3),
    marginTop: FH(1),
  },
  encryptedLabel: {
    fontSize: typography.fontSize.xxs,
    fontFamily: typography.fontWeight.regular,
  },
  menuBtn: {
    padding: FW(4),
  },
  messageList: {
    paddingVertical: FH(8),
  },
  menuBackdrop: {
    zIndex: 90,
  },
  inputWrapper: {
    zIndex: 100,
  },
});
