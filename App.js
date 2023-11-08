/** @format */

import { useFonts } from "expo-font";
import Navigation from "./src/navigtaion/Navigation";
import { LogBox, StatusBar, View, Alert } from "react-native";
import React, { useEffect } from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import navigationService from "./navigationService";
import PushNotification from "react-native-push-notification";
import * as Sentry from "@sentry/react-native";
import messaging from "@react-native-firebase/messaging";

const App = () => {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  // Sentry for performance monitoring
  Sentry.init({
    dsn: "https://4429c218387cff379b490bfb4f0f8684@o4505948081881088.ingest.sentry.io/4505948085682176",
    tracesSampleRate: 1.0,
  });

  // FCM Push Notification
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", enabled);
    }
  };

  useEffect(() => {
    requestUserPermission();
    PushNotification.configure({
      onNotification: function (notification) {},
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage?.data?.hasOwnProperty("ticketId")) {
        Alert.alert(
          remoteMessage?.notification?.title,
          remoteMessage?.notification?.body,
          [
            {
              text: "View",
              onPress: () => {
                navigationService.replace("SupportChatScreen", {
                  ticket: remoteMessage?.data?.title,
                  ticketId: remoteMessage?.data?.ticketId,
                  status: "opened",
                });
              },
            },
            {
              text: "Close",
              onPress: () => {},
            },
          ]
        );
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
    return unsubscribe;
  }, []);

  // Load Fonts
  const [loaded] = useFonts({
    RegularText: require("./src/assets/fonts/SF-Pro-Text-Regular.ttf"),
    BoldText: require("./src/assets/fonts/SF-Pro-Text-Bold.ttf"),
    SemiBold: require("./src/assets/fonts/SF-Pro-Text-Semibold.ttf"),
    Heavy: require("./src/assets/fonts/SF-Pro-Text-Heavy.ttf"),
    Medium: require("./src/assets/fonts/SF-Pro-Text-Medium.ttf"),
  });
  if (!loaded) {
    return false;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="#305A9C"
        barStyle="light-content"
      />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </View>
  );
};
export default Sentry.wrap(App);
