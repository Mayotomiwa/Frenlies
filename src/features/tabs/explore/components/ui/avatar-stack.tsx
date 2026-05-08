import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { FW } from "@/src/shared/global/utils/responsive";

export type AvatarData = {
  color: string;
  initials: string;
  image?: number;
};

type AvatarStackProps = {
  avatars: AvatarData[];
  size?: number;
};

export function AvatarStack({ avatars, size = FW(28) }: AvatarStackProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      {avatars.slice(0, 4).map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: avatar.color,
              marginLeft: index === 0 ? 0 : -(size * 0.35),
              zIndex: index,
              overflow: "hidden",
            },
          ]}
        >
          {avatar.image != null && (
            <Image
              source={avatar.image}
              style={{ width: size, height: size }}
              contentFit="cover"
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: "#fff",
  },
});
