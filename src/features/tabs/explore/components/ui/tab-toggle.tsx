import {
  Text,
  View,
} from "@/src/shared/global/component/layout/tags/themed-components";
import { Colors } from "@/src/shared/global/constants/colors";
import { typography } from "@/src/shared/global/constants/typography";
import { FH, FW } from "@/src/shared/global/utils/responsive";
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import { Category, Microphone2 } from "iconsax-react-native";
import type { Icon } from "iconsax-react-native";
import { Pressable, StyleSheet } from "react-native";

export type ExploreTab = "feeds" | "audio-rooms";

type TabToggleProps = {
  active: ExploreTab;
  onChange: (tab: ExploreTab) => void;
};

const TABS: { id: ExploreTab; label: string; IconComponent: Icon }[] = [
  { id: "feeds", label: "Feeds", IconComponent: Category },
  { id: "audio-rooms", label: "Audio rooms", IconComponent: Microphone2 },
];

export function TabToggle({ active, onChange }: TabToggleProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[
              styles.pill,
              {
                backgroundColor: isActive ? Colors.main.primary : "transparent",
                borderColor: isActive
                  ? Colors.main.primary
                  : colors.borderColor,
              },
            ]}
          >
            <tab.IconComponent
              size={FW(15)}
              color={isActive ? Colors.neutral.black : colors.primaryText}
              variant={isActive ? "Bold" : "Outline"}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? Colors.neutral.black : colors.primaryText,
                  fontFamily: typography.fontWeight.semibold,
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: FW(8),
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: FW(14),
    paddingVertical: FH(8),
    borderRadius: FW(24),
    borderWidth: 1.5,
    gap: FW(5),
  },
  label: {
    fontSize: typography.fontSize.sm,
  },
});
