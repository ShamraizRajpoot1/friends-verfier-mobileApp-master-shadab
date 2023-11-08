import { Platform, StatusBar } from "react";
export const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
