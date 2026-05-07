import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

const GREEN = "#2EE355";

// --- Logo Icon built from Views ---
const FrenliesIcon = ({ size = 48 }: { size?: number }) => {
  const block = size / 3;
  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      <View
        style={[styles.block, { top: 0, left: 0, width: block, height: block }]}
      />
      <View
        style={[
          styles.block,
          { top: 0, left: block * 1.5, width: block, height: block },
        ]}
      />
      <View
        style={[
          styles.block,
          { top: block * 1.5, left: 0, width: block, height: block },
        ]}
      />
      <View
        style={[
          styles.block,
          { top: block * 1.5, left: block * 1.5, width: block, height: block },
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
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.72)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      // 1. Spring logo in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 55,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      // 2. Green glow pulse
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.4,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0,
          duration: 550,
          useNativeDriver: true,
        }),
      ]),
      // 3. Hold
      Animated.delay(350),
      // 4. Fade out
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish?.();
    });
  }, []);

  return (
    <Animated.View
      pointerEvents="none" // let touches pass through once faded
      style={[styles.container, { opacity: screenOpacity }]}
    >
      {/* Layered gradient bg */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />

      {/* Green glow halo */}
      <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoRow,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <FrenliesIcon size={52} />
        <Text style={[styles.logoText, { fontFamily }]}>Frenlies</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Overlay on top of the entire navigator
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FAFFF0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: "#FEFDE8",
    opacity: 0.85,
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
    backgroundColor: "#DFF3E8",
    opacity: 0.75,
  },
  glow: {
    position: "absolute",
    width: 300,
    height: 130,
    borderRadius: 150,
    backgroundColor: GREEN,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 70,
    elevation: 20,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 10,
  },
  logoText: {
    fontSize: 44,
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  block: {
    position: "absolute",
    borderRadius: 2,
    backgroundColor: GREEN,
  },
});
