import { Tabs } from "expo-router";
import {
  Category2,
  Chart,
  DocumentText,
  MessageText,
  People,
} from "iconsax-react-native";

import { HapticTab } from "@/components/haptic-tab";
import { ActiveTabLabel } from "@/src/shared/global/component/layout/actions/active-tab-bar";
import { Colors } from "@/src/shared/global/constants/colors";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: Colors.main.primary,
        tabBarInactiveTintColor: Colors.neutral.gray400,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.borderColor,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ActiveTabLabel label="Explore" color={color} />
            ) : (
              <Category2 size={20} color={color} variant="Outline" />
            ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ActiveTabLabel label="Journal" color={color} />
            ) : (
              <DocumentText size={22} color={color} variant="Outline" />
            ),
        }}
      />
      <Tabs.Screen
        name="frens"
        options={{
          title: "Frens",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ActiveTabLabel label="Frens" color={color} />
            ) : (
              <People size={24} color={color} variant="Outline" />
            ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ActiveTabLabel label="Activity" color={color} />
            ) : (
              <Chart size={22} color={color} variant="Outline" />
            ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <ActiveTabLabel label="Chat" color={color} />
            ) : (
              <MessageText size={22} color={color} variant="Outline" />
            ),
        }}
      />
    </Tabs>
  );
}
