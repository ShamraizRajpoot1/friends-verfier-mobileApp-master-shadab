/** @format */

import React, { useState } from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/Authentication/LoginScreen";
import ResetPassword from "../screens/Authentication/RestPassword";
import CreateAccountScreen from "../screens/Authentication/CreateAccountScreen";
import ForgotPasswordScreen from "../screens/Authentication/ForgetPasswordScreen";
import EmailVerificationScreen from "../screens/Authentication/EmailVerificationScreen";
import SmsVerificationScreen from "../screens/Authentication/SmsVerificationScreen";
import SmsOtpVerificationScreen from "../screens/Authentication/SmsOtpVerification";
import HomeScreen from "../screens/TabScreens/HomeScreen";
import PhoneNumberScreen from "../screens/TabScreens/PhoneNumberScreen";
import ScanPhoneScreen from "../screens/TabScreens/ScanPhoneScreen";
import EmailScreen from "../screens/TabScreens/EmailScreen";
import SearchAddressScreen from "../screens/TabScreens/SearchAddressScreen";
import { RFValue } from "react-native-responsive-fontsize";
import SearchScreen from "../screens/SearchScreen";
import ResultsScreen from "../screens/ResultsScreen";
import ResultDeatilScreen from "../screens/TabScreens/ResultDetailScreen";
import SideMenuScreen from "../screens/SideMenuScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import InviteEmptyScreen from "../screens/InviteEmptyScreen";
import InviteDisplayScreen from "../screens/InviteDisplayScreen";
import SettingScreen from "../screens/SettingScreen";
import NotificationScreen from "../screens/NotificationScreen";
import DoandDOntsScreen from "../screens/DoandDontsScreen";
import SupportandLegalScreen from "../screens/SupportandLegalScreen";
import AccountSelector from "../screens/AccountSelector";
import FaqScreen from "../screens/FaqScreen";
import TermsScreen from "../screens/TermsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SupportTicketScreen from "../screens/SupportTicketScreen";
import CreateTicket from "../screens/CreateTicket";
import SupportChatScreen from "../screens/SupportChatScreen";
import Paypal from "../screens/Paypal";
import { GetStorageItems } from "../utils/AsyncStorage";
import { useDispatch } from "react-redux";
import { loginDetails } from "../redux/action"; // Action function
import navigationService from "../../navigationService";
import GetStartedScreen from "../screens/Authentication/GetStartedScreen.js";
const Stack = createNativeStackNavigator();

function Navigation() {
  const dispatch = useDispatch();
  GetStorageItems("@loginDetails", (callBack) => {
    dispatch(loginDetails({ payload: callBack }));
    if (callBack) {
      setInitialRoute("tabs");
    } else {
      setInitialRoute("GetStartedScreen");
    }
  });
  const [initialRoute, setInitialRoute] = useState("");
  return (
    <NavigationContainer
      ref={(ref) => navigationService.setTopLevelNavigator(ref)}
    >
      {initialRoute && (
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            animation: "fade",
            headerShown: false,
            animationTypeForReplace: "pop",
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AccountSelector" component={AccountSelector} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
          <Stack.Screen name="SubscribeScreen" component={SubscribeScreen} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen name="DoandDOntsScreen" component={DoandDOntsScreen} />
          <Stack.Screen name="FaqScreen" component={FaqScreen} />
          <Stack.Screen name="TermsScreen" component={TermsScreen} />
          <Stack.Screen name="CreateTicket" component={CreateTicket} />
          <Stack.Screen name="Paypal" component={Paypal} />
          <Stack.Screen name="tabs" component={MyTabs} />
          <Stack.Screen
            name="CreateAccountScreen"
            component={CreateAccountScreen}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="EmailVerificationScreen"
            component={EmailVerificationScreen}
          />
          <Stack.Screen
            name="SmsVerificationScreen"
            component={SmsVerificationScreen}
          />
          <Stack.Screen
            name="SmsOtpVerificationScreen"
            component={SmsOtpVerificationScreen}
          />
          <Stack.Screen
            name="ResultDeatilScreen"
            component={ResultDeatilScreen}
          />
          <Stack.Screen
            options={{
              animationTypeForReplace: "pop",
              animation: "slide_from_left",
            }}
            name="SideMenuScreen"
            component={SideMenuScreen}
          />
          <Stack.Screen
            name="InviteEmptyScreen"
            component={InviteEmptyScreen}
          />
          <Stack.Screen
            name="InviteDisplayScreen"
            component={InviteDisplayScreen}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen
            name="SupportandLegalScreen"
            component={SupportandLegalScreen}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen
            name="SupportTicketScreen"
            component={SupportTicketScreen}
          />
          <Stack.Screen
            name="SupportChatScreen"
            component={SupportChatScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: RFValue(-40),
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: RFValue(80),
        height: RFValue(80),
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

// Tab Navigation
function MyTabs() {
  return (
    <Tab.Navigator
      lazy={false}
      tabBarOptions={{
        tabStyle: {},

        iconStyle: {
          top: Platform.OS === "android" ? RFValue(10) : RFValue(10),
        },

        style: {
          backgroundColor: "#fff",
          position: "absolute",
          borderTopColor: "#f5f5f5",
          borderTopWidth: 1.5,
          height: RFValue(78),
          zIndex: 9999,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor, color }) => {
            if (focused)
              return (
                <Image
                  style={{ width: RFValue(28), height: RFValue(28) }}
                  source={require("../assets/icons/tabicons/homeactive.png")}
                />
              );
            else
              return (
                <Image
                  style={{ width: RFValue(28), height: RFValue(28) }}
                  source={require("../assets/icons/tabicons/home.png")}
                />
              );
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor, color }) => {
            if (focused)
              return (
                <Image
                  style={{ width: RFValue(28), height: RFValue(28) }}
                  source={require("../assets/icons/tabicons/phoneactive.png")}
                />
              );
            else
              return (
                <Image
                  style={{ width: RFValue(28), height: RFValue(28) }}
                  source={require("../assets/icons/tabicons/phone.png")}
                />
              );
          },
        }}
        name="PhoneNumberScreen"
        component={PhoneNumberScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",

          tabBarIcon: ({ focused }) => {
            if (focused)
              return (
                <Image
                  style={{
                    width: RFValue(60),
                    height: RFValue(60),
                    top: 0,
                    borderWidth: 4,
                    borderColor: "#C3EED9",
                    borderRadius: 40,
                  }}
                  source={require("../assets/icons/tabicons/middleactive.png")}
                />
              );
            else
              return (
                <Image
                  style={{ width: RFValue(60), height: RFValue(60), top: 0 }}
                  source={require("../assets/icons/tabicons/middle.png")}
                />
              );
          },
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
        name="ScanPhoneScreen"
        component={ScanPhoneScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor, color }) => {
            if (focused)
              return (
                <Image
                  style={{ width: RFValue(28), height: RFValue(28) }}
                  source={require("../assets/icons/tabicons/emailactive.png")}
                />
              );
            else
              return (
                <Image
                  style={{ width: RFValue(28), height: RFValue(28) }}
                  source={require("../assets/icons/tabicons/email.png")}
                />
              );
          },
        }}
        name="EmailScreen"
        component={EmailScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor, color }) => {
            if (focused)
              return (
                <Image
                  style={{ width: RFValue(28), height: RFValue(28) }}
                  source={require("../assets/icons/tabicons/lastactive.png")}
                />
              );
            else
              return (
                <>
                  <Image
                    style={{ width: RFValue(25), height: RFValue(25) }}
                    source={require("../assets/icons/logout.png")}
                  />
                </>
              );
          },
        }}
        name="SearchAddressScreen"
        component={SearchAddressScreen}
      />
    </Tab.Navigator>
  );
}
