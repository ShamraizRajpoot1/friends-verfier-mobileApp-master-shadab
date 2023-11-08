import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { WebView } from "react-native-webview";
import Device from "../../src/constants/device";

const WIDTH = Dimensions.get("window").width;

const Paypal = ({ navigation, route }) => {
  const stateChng = (navState) => {
    const { url, title } = navState;
    // console.log(url)
    // console.log(title);

    if (url == "https://friends-verifier.netlify.app/dashboard") {
      navigation.navigate("HomeScreen");
    }

    // console.log(title)
    // if (title == "PayPal Checkout") {
    //   // var urls = "orders/successPayment/63da5f98affa4bb98905390c?paymentId=PAYID-MPNF7RA7TD77055XV4068247&token=EC-6TN9618291349262W&PayerID=LFKR2PBJQEENE"
    //   console.log("url", url);
    //   let spliturl = url.split("?");
    //   // console.log("spliturl",spliturl);
    //   let splitotherhalf = spliturl[1].split("&");
    //   console.log("splitotherhalf", splitotherhalf);
    //   let paymentId = splitotherhalf[0].replace("paymentId=", "");
    //   let token = splitotherhalf[1].replace("token=", "");
    //   let PayerID = splitotherhalf[2].replace("PayerID=", "");
    //   // props.navigation.navigate('Success',{payId:paymentId,token:token,payerId:PayerID})
    //   const url = `/orders/successPayment/${orderId}?paymentId=${paymentId}&token=${token}&PayerID=${PayerID}`;
    // }
  };
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <View style={styles.header}>
        <Text style={styles.emailVerificationText}>Paypal</Text>
      </View>
      <View style={{ width: "100%", height: "100%" }}>
        <WebView
          startInLoadingState={true}
          onNavigationStateChange={stateChng}
          // renderLoading={() => <Loading />}
          source={{ uri: route?.params?.url }}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  FlexContainer: {
    flex: 1,
  },
  SecondaryFlex: {
    flex: 2,
    justifyContent: "center",
  },
  header: {
    width: WIDTH,
    height: RFValue(65),
    backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
  },
  emailVerificationText: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "SemiBold",
    textAlign: "center",
    paddingTop: RFValue(10),
    top: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    paddingVertical: 10,
    lineHeight: 36,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    paddingVertical: 10,
    lineHeight: 21,
  },
});
export default Paypal;
