import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

const GREEN = "#2EE355";
const DARK = "#1A1A1A";

// Matches the actual logo: two L-shaped corner brackets
const FrenliesIcon = ({ size = 52 }: { size?: number }) => {
  const t = size / 4; // tile size
  const g = size / 8; // gap between tiles

  return (
    <View style={{ width: size, height: size }}>
      {/* Top-left bracket */}
      <View style={[s.tile, { width: t, height: t, top: 0, left: 0 }]} />
      <View style={[s.tile, { width: t, height: t, top: t + g, left: 0 }]} />
      <View style={[s.tile, { width: t, height: t, top: 0, left: t + g }]} />
      {/* Bottom-right bracket */}
      <View
        style={[s.tile, { width: t, height: t, top: t + g, left: t + g }]}
      />
      <View
        style={[
          s.tile,
          { width: t, height: t, top: t * 2 + g * 2, left: t + g },
        ]}
      />
      <View
        style={[
          s.tile,
          { width: t, height: t, top: t + g, left: t * 2 + g * 2 },
        ]}
      />
    </View>
  );
};

interface Props {
  onFinish?: () => void;
  fontFamily?: string;
}

export default function FrenliesSplashScreen({
  onFinish,
  fontFamily = "SpaceGrotesk-Bold",
}: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(150),
      // Ease in
      Animated.timing(progress, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(900),
      // Ease out
      Animated.timing(progress, {
        toValue: 2,
        duration: 500,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => onFinish?.());
  }, []);

  const logoOpacity = progress.interpolate({
    inputRange: [0, 1, 1.8, 2],
    outputRange: [0, 1, 1, 0],
  });

  const logoScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.88, 1],
    extrapolate: "clamp",
  });

  const logoTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
    extrapolate: "clamp",
  });

  const screenOpacity = progress.interpolate({
    inputRange: [1.8, 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[s.container, { opacity: screenOpacity }]}>
      <Animated.View
        style={[
          s.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }, { translateY: logoTranslateY }],
          },
        ]}
      >
        <FrenliesIcon size={52} />
        <Text style={[s.wordmark, { fontFamily }]}>Frenlies</Text>
      </Animated.View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F8FEF0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  wordmark: {
    fontSize: 44,
    color: DARK,
    letterSpacing: -0.5,
  },
  tile: {
    position: "absolute",
    borderRadius: 2,
    backgroundColor: GREEN,
  },
});
