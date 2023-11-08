import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
// import { getStorageItem, SaveStorageItem } from "../Utils/Asyncstorage";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import navigationService from "../navigation/navigationService";
// import { RoutesText } from "../constants/RoutesText";

export async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     notificationListener();
  //     configureNotification();
  //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //       console.log("Message handled in the background!", remoteMessage);
  //     });
  //   }
  //   if (enabled) {
  //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //       console.log("Message handled in the background!", remoteMessage);
  //     });
  //     // getFcmtoken();
  //   }
}
// }

const configureNotification = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};
const getFcmtoken = async () => {
  //   const checkToken = getStorageItem("fcmToken");
  console.log("old frcm token", checkToken);
  if (!!checkToken) {
    try {
      const FcmToken = await messaging().getToken();
      //   if (FcmToken) {
      //     SaveStorageItem("fcmToken", FcmToken);
      //   }
    } catch (error) {
      console.log("error occured in getting FCM token");
      alert(error?.message);
    }
  }
};
export const notificationListener = async () => {
  var data = await messaging().registerDeviceForRemoteMessages();
  console.log("🚀 ~ file: NotificationService.js:98 ~ data:", data);

  return;
  // alert("222");

  messaging().onMessage(async (remoteMessage) => {
    Alert.alert(
      remoteMessage?.notification?.title,
      remoteMessage?.notification?.body,
      [
        {
          text: "View",
          onPress: () => {
            navigation.navigate(
              "SupportChatScreen",

              {
                ticket: item?.subject,
                ticketId: item?.id,
                status: item?.status,
              }
            );
            // setShowBox(false);
            // setScreenValue(2);
            // SearchFunction(data);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Close",
          onPress: () => {},
        },
      ]
    );

    // alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  });
  // useEffect(() => {
  //   messaging().onMessage(async (remoteMessage) => {
  //     console.log(
  //       "🚀 ~ file: App.js:29 ~ unsubscribe ~ remoteMessage:",
  //       remoteMessage
  //     );
  //     alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });
  //   alert("www");
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //     if (remoteMessage) {
  //       console.log(
  //         "🚀 ~ file: NotificationService.js:45 ~ messaging ~ remoteMessage:",
  //         remoteMessage
  //       );
  //       //   getStorageItem("@loginData", (callBacks) => {
  //       //     const token = JSON.parse(callBacks);
  //       //     if (token?.accessToken) {
  //       //       setTimeout(() => {
  //       //         // navigationService.navigate(
  //       //         //   RoutesText.routeNames.ACCEPT_AND_DECLINE_INVITES
  //       //         // );
  //       //       }, 2000);
  //       //     } else {
  //       //       setTimeout(() => {
  //       //         // navigationService.navigate(RoutesText.routeNames.SIGN_IN_SCREEN);
  //       //       }, 2000);
  //       //     }
  //       //   });
  //     }
  //     console.log("background statew", remoteMessage.notification);
  //   });
  // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //         console.log(
  //           "background state notification",
  //           remoteMessage.notification
  //         ); // e.g. "Settings"
  //       }
  //       //   setLoading(false);
  //     });
  //   messaging().onMessage(notificationListener);
};
