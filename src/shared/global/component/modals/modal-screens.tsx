import { Theme } from "@/src/shared/theme/types";

export function modal(colors: Theme, detents: number[]) {
  return {
    presentation: "formSheet" as const,
    sheetGrabberVisible: true,
    headerShown: false,
    sheetAllowedDetents: detents,
    contentStyle: { backgroundColor: colors.modalBackground },
  };
}
