// src/shared/global/components/Tag.tsx
import { useTheme } from "@/src/shared/theme/hooks/use-theme";
import React from "react";
import {
    FlatList as RNFlatList,
    ScrollView as RNScrollView,
    Text as RNText,
    View as RNView,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { FONT_BOLD, FONT_MEDIUM, FONT_REGULAR } from "../../../constants/fonts";
import { FH, FRF, FW } from "../../../utils/responsive";

//////////////////////////////////
// TEXT COMPONENTS
//////////////////////////////////
export const Text: React.FC<{
  style?: StyleProp<TextStyle>;
  font?: string;
  numberOfLines?: number;
  children?: React.ReactNode;
}> = ({ style, font, numberOfLines, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        { color: colors.text, fontSize: FRF(14), fontFamily: font },
        style,
      ]}
      numberOfLines={numberOfLines}
      {...props}
    />
  );
};

export const Heading: React.FC<{
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  font?: string;
  fontSize?: number;
}> = ({ style, fontSize, font, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        {
          color: colors.text,
          fontSize: fontSize || FRF(24),
          fontFamily: font || FONT_BOLD,
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Subheading: React.FC<{
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  font?: string;
}> = ({ style, font, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        {
          color: colors.text,
          fontSize: FRF(18),
          fontFamily: font || FONT_MEDIUM,
        },
        style,
      ]}
      {...props}
    />
  );
};

export const LightSubheading: React.FC<{
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  fontSize?: number;
  font?: string;
}> = ({ style, font, fontSize, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        {
          color: colors.text,
          fontSize: fontSize || FRF(16),
          fontFamily: font || FONT_REGULAR,
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Caption: React.FC<{
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  font?: string;
  fontSize?: number;
}> = ({ style, font, fontSize, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        {
          color: colors.text,
          fontSize: fontSize || FRF(12),
          fontFamily: font || FONT_REGULAR,
        },
        style,
      ]}
      {...props}
    />
  );
};

export const Paragraph: React.FC<{
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  font?: string;
}> = ({ style, font = FONT_REGULAR, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        { color: colors.text, fontSize: FRF(14), fontFamily: font },
        style,
      ]}
      {...props}
    />
  );
};

export const ButtonText: React.FC<{
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}> = ({ style, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        { color: colors.text, fontSize: FRF(14), fontFamily: FONT_BOLD },
        style,
      ]}
      {...props}
    />
  );
};

//////////////////////////////////
// VIEW / LAYOUT COMPONENTS
//////////////////////////////////
export const View: React.FC<{
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}> = ({ style, ...props }) => <RNView style={[style]} {...props} />;

export const SafeAreaView: React.FC<{
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}> = ({ style, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNSafeAreaView
      style={[{ flex: 1, backgroundColor: colors.background }, style]}
      {...props}
    />
  );
};

export const ScrollView: React.FC<{
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  horizontal?: boolean;
  ref?: any;
}> = ({ style, contentContainerStyle, ref, horizontal = false, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNScrollView
      ref={ref}
      horizontal={horizontal}
      contentContainerStyle={contentContainerStyle}
      contentInsetAdjustmentBehavior="automatic"
      style={[{ backgroundColor: colors.background }, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  );
};

export const FlatList: React.FC<any> = ({ style, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNFlatList
      style={[{ backgroundColor: colors.background }, style]}
      {...props}
    />
  );
};

//////////////////////////////////
// CARD / BADGE / ICONS
//////////////////////////////////
interface CardProps {
  style?: StyleProp<ViewStyle>;
  padding?: number;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ style, padding, children }) => {
  const { colors } = useTheme();

  return (
    <RNView
      style={[
        {
          backgroundColor: colors.layerBackground,
          padding: padding ?? FW(16),
          borderRadius: FW(10),
        },
        style,
      ]}
    >
      {children}
    </RNView>
  );
};

export const Badge: React.FC<{
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}> = ({ style, ...props }) => {
  const { colors } = useTheme();
  return (
    <RNView
      style={[
        {
          backgroundColor: colors.primary,
          paddingHorizontal: FW(8),
          paddingVertical: FH(4),
          borderRadius: FW(12),
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      {...props}
    />
  );
};

type ThemedIconsProps = {
  name: string;
  size?: number;
  color?: string;
};

export const ThemedIcons: React.FC<ThemedIconsProps> = ({
  name,
  size = 24,
  color,
}) => {
  const { colors } = useTheme();

  // Convert e.g. "arrow-left-line" → "RiArrowLeftLine"
  const formattedName =
    "Ri" +
    name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");

  // @ts-ignore dynamic lookup
  const IconComponent = RemixIcons[formattedName];

  if (!IconComponent) {
    console.warn(`⚠️ Remix icon "${formattedName}" not found.`);
    return null;
  }

  return <IconComponent size={size} color={color || colors.icon} />;
};
