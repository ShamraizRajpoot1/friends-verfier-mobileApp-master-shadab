import { Dimensions, Platform, StatusBar } from "react-native";

// android
const android = Platform.OS === "android";

const iOS = Platform.OS === "ios";
const web = Platform.OS === "web";
const windowInfo = Dimensions.get("window");
const { height, width } = windowInfo;
const aspectRatio = height / width;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
// is iPad
const { isPad } = Platform;

// is iPhone with Notch?
// iPhoneX, iPhoneXs, iPhoneXr, iPhoneXs Max, iPhone 11 & 12
let iPhoneNotch = false;
if (iOS) {
  if (height === 812 || height === 844 || height === 896 || height === 926) {
    iPhoneNotch = true;
  }
}

export default {
  android,
  aspectRatio,
  height,
  iOS,
  iPhoneNotch,
  isPad,
  web,
  STATUS_BAR_HEIGHT,
  width,
};
