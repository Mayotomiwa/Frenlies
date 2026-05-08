import { FlatList, StyleSheet, View } from "react-native";
import { FW } from "@/src/shared/global/utils/responsive";
import { Participant, ParticipantCell } from "./ui/participant-cell";

type ParticipantGridProps = {
  participants: Participant[];
};

const NUM_COLUMNS = 4;

export function ParticipantGrid({ participants }: ParticipantGridProps) {
  return (
    <FlatList
      data={participants}
      keyExtractor={(item) => item.id}
      numColumns={NUM_COLUMNS}
      renderItem={({ item }) => (
        <View style={styles.cell}>
          <ParticipantCell participant={item} />
        </View>
      )}
      scrollEnabled={false}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: FW(8),
  },
  cell: {
    flex: 1 / NUM_COLUMNS,
    alignItems: "center",
  },
});
