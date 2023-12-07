/** @format */

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Entypo, Feather, Fontisto } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import simpleAlertCall from "../utils/alerts"; // Alert function for Mobile applications
import { axiosGETCall } from "../utils/axios.js"; // GET function for axios
import { useSelector } from "react-redux";
import Device from "../../src/constants/device";
import { GetStorageItems, SaveStorageItems } from "../utils/AsyncStorage";
import * as RNIap from "react-native-iap";

const WIDTH = Dimensions.get("window").width;

export default function SubscribeScreen({ navigation, route }) {
  const pay_as_you_go = route?.params?.pay_as_you_go;
  useEffect(() => {
    setFirstVisit(route?.params?.welcome == 1 ? true : false);
    getMyPlan();
  }, []);

  const scrollView = useRef(null);

  const subscriptions = useCallback(
    async (key) =>
      RNIap.getSubscriptions({
        skus: [key],
      }),
    []
  );

  const handlePurchaseAndroid = async (sku) => {
    setPayPalLoading(true);
    if (sku?.hasOwnProperty("_id")) {
      if (sku.hasOwnProperty("androidSubscriptionKey")) {
        var data = await RNIap.getProducts({
          skus: [sku?.androidSubscriptionKey],
        });
        handlePurchase(data[0]);
      } else {
        simpleAlertCall("Please select a package.", () => {});
      }
      return;
    }
    if (Platform.OS == "android") {
      if (selected.hasOwnProperty("androidSubscriptionKey")) {
        var data = await RNIap.getProducts({
          skus: [selected?.androidSubscriptionKey],
        });
        handlePurchase(data[0]);
      } else {
        simpleAlertCall("Please select a package.", () => {});
      }
    } else if (Platform.OS == "ios") {
      if (selected.hasOwnProperty("iOSSubscriptionKey")) {
        var data = await RNIap.getProducts({
          skus: [selected?.iOSSubscriptionKey],
        });
        var newData = data[0];
        handlePurchase(newData);
      } else {
        simpleAlertCall("Please select a package.", () => {});
      }
    }
  };

  const handlePurchase = async (sku) => {
    if (Platform.OS == "android") {
      var data = await RNIap.requestPurchase({ skus: [sku.productId] }, false)
        .then(async (res) => {
          var NData = res[0];
          setPayPalLoading(false);
          var newData = await RNIap.finishTransaction({
            purchase: NData,
            isConsumable: true,
            developerPayloadAndroid: "",
          });
          if (newData?.code == "OK") {
            var obj = {
              planId: selected?._id,
              paymentMode: "online",
              paymentVia: "google",
              purchaseToken: newData?.purchaseToken,
            };
            PayPalPaymentRequest(obj);
          }
          setPayPalLoading(false);
        })
        .catch((err) => {
          setPayPalLoading(false);
        });
    } else if (Platform.OS == "ios") {
      var data = await subscriptions(sku.productId);
      var data = await RNIap.requestPurchase(
        {
          sku: sku.productId,
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
        },
        false
      )
        .then(async (res) => {
          var NData = res[0];
          setPayPalLoading(false);
          var newData = await RNIap.finishTransaction({
            purchase: res,
            isConsumable: true,
            developerPayloadAndroid: "",
          });
          var obj = {
            planId: selected?._id,
            paymentMode: "online",
            paymentVia: "apple",
            purchaseToken: res?.transactionId,
          };
          PayPalPaymentRequest(obj);
          setPayPalLoading(false);
        })
        .catch((err) => {
          setPayPalLoading(false);
        });
    }
  };
  useEffect(() => {
    SetUpIAP();
  }, []);

  const SetUpIAP = async () => {
    await RNIap.clearProductsIOS();
    await RNIap.initConnection().then((res) => {});
  };

  const GetSubscriptions = useCallback(
    async (productId) =>
      RNIap.getSubscriptions({
        skus: [productId],
      }),
    []
  );

  const userData = useSelector((state) => state);
  const [PayPalLoading, setPayPalLoading] = useState(false);
  const [PayList, setPayList] = useState([]);
  const [planPrice, setplanPrice] = useState();
  const [FirstVisit, setFirstVisit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [SelectedPlan, setSelectedPlan] = useState(2);
  const [PayAsYouGo, setPayAsYouGo] = useState([]);

  useEffect(() => {
    GetPlansList(SelectedPlan);
    GetPlansList(0);
  }, [SelectedPlan]);

  const GetPlansList = (SelectedPlan = 0) => {
    var url;
    if (SelectedPlan == 1) {
      url = "/subscriptionPlans/list?planType=Monthly";
    } else if (SelectedPlan == 2) {
      url = "/subscriptionPlans/list?planType=Yearly";
    } else if (SelectedPlan == 0) {
      url = "/subscriptionPlans/list?planType=OneTime";
    }
    var Token = userData?.loginDetails?.Authorization;
    axiosGETCall(url, Token, (callBack) => {
      if (callBack?.status == 200) {
        if (SelectedPlan == 0) {
          setPayAsYouGo(callBack?.data);
          if (pay_as_you_go) {
            setSelected(callBack?.data[0]);
            handlePurchaseAndroid(callBack?.data[0]);
          }
        } else {
          setPayList(callBack?.data);
          setplanPrice(callBack?.data);
        }
      }
    });
    GetStorageItems("@loginDetails", (callBack) => {
      if (callBack?.data?.firstVisit == 1) {
        callBack.data.firstVisit = 0;
        SaveStorageItems(
          "@loginDetails",
          JSON.stringify(callBack),
          0,
          () => {}
        );
      }
    });
  };

  const [ActivePlan, setActivePlan] = useState(false);

  const getMyPlan = () => {
    if (userData?.loginDetails?.hasOwnProperty("Authorization")) {
      if (!userData?.loginDetails?.data?.isSuperUser) {
        var Token = userData?.loginDetails?.Authorization;
        var url = "/getSearch";
        axiosGETCall(url, Token, (callBack) => {
          if (callBack?.status == 200) {
            if (callBack?.data?.planId) {
              setActivePlan(true);
              var nPlanID = callBack?.data?.planId?.planId;
              callBack.data.planId._id = nPlanID;
              setSelected(callBack?.data?.planId);
            }
          }
        });
      }
    }
  };

  const [selected, setSelected] = useState({});

  const PayPalPaymentRequest = (obj) => {
    console.log(
      "🚀 ~ file: SubscribeScreen.js:442 ~ PayPalPaymentRequest ~ obj:",
      obj
    );
    setShowModal(false);
    var url =
      "/orders/successPayment?planId=" +
      selected?._id +
      "&paymentMode=online&paymentVia=google&purchaseToken=" +
      obj?.purchaseToken;
    var Token = userData?.loginDetails?.Authorization;
    setPayPalLoading(true);
    axiosGETCall(url, Token, (callBack) => {
      setPayPalLoading(false);
      simpleAlertCall("Payment successful.", () => {
        navigation.replace("tabs");
      });
    });
  };

  const cancelSub = () => {
    Alert.alert(
      "Please Confirm Subscription Cancelation!",
      " By canceling your subscription you will not be charged again at the end of your billing cycle, you can use the remaining credits that you may have until the end of your subscription when all credits will be lost.",
      [
        {
          text: "Process",
          onPress: () => {
            ConfirmPlanCancel();
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  ConfirmPlanCancel = () => {
    setPayPalLoading(true);
    var Token = userData?.loginDetails?.Authorization;

    var url = "/getSearch/cancelPlan";
    axiosGETCall(url, Token, (callBack) => {
      setPayPalLoading(false);
      if (callBack?.status == 200) {
        simpleAlertCall("Plan canceled.", () => {
          navigation.replace("tabs");
        });
      }
    });
  };

  const WelcomeComponent = () => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.WelcomeText}>Welcome!</Text>
      <Text style={styles.WelcomeDesc}>
        Hello there! Thank you for becoming a part of the{" "}
        <Text style={{ fontWeight: "bold" }}>Friend Verifier </Text> family.
        Before we get started, please pick a subscription or pay-as-you-go
        option. You will still receive a free background check if you're a new
        user.
      </Text>
    </View>
  );

  const BilledSelectorComp = () => (
    <>
      <View
        style={{
          width: WIDTH,
          justifyContent: "flex-end",
          flexDirection: "row",
          paddingHorizontal: 20,
          marginBottom: 15,
          bottom: 10,
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={[styles.WelcomeText, { marginVertical: 0 }]}>
            Billed:
          </Text>
          <View
            style={{
              height: 35,
              width: WIDTH / 2.5,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",

              paddingHorizontal: 3,
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setSelectedPlan(2);
              }}
              style={{
                height: 30,
                width: "50%",
                backgroundColor: SelectedPlan == 2 && "#305A9C",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.choosePlanContainerText,
                  {
                    color: SelectedPlan == 2 ? "white" : "black",
                    fontSize: RFValue(12),
                  },
                ]}
              >
                Yearly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setSelectedPlan(1);
              }}
              style={{
                height: 30,
                width: "50%",
                backgroundColor: SelectedPlan == 1 && "#305A9C",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.choosePlanContainerText,
                  {
                    color: SelectedPlan == 1 ? "white" : "black",
                    fontSize: RFValue(12),
                  },
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  const colors = ["#BAD8E0", "#FAD143", "#030303"];

  const PlanComponent = ({
    title,
    discountedPrice = "4.99",
    discountPercentage = 70,
    item,
    index,
    planType,
  }) => {
    return (
      <View style={{}}>
        {/* {item?.planCategory && (
          <View
            style={{
              height: RFValue(35),
              width: RFValue(120),
              backgroundColor:
                item?.planCategory == "Basic"
                  ? colors[0]
                  : item?.planCategory == "Gold"
                  ? colors[1]
                  : item?.planCategory == "Platinum"
                  ? colors[2]
                  : "gray",
              borderRadius: 50,
              // position: "absolute",
              bottom: RFValue(-15),
              left: RFValue(30),
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Text
              style={{
                color: item?.planCategory == "Platinum" ? "white" : "black",
                fontWeight: "bold",
                fontSize: RFValue(14),
              }}
            >
              {item?.planCategory}
            </Text>
          </View>
        )} */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            ActivePlan ? null : setSelected(item);
          }}
          style={[
            styles.PlanContainer,
            {
              backgroundColor: selected?._id == item?._id ? "#B3D1FF" : "#fff",
            },
          ]}
        >
          <View style={styles.PlanContent}>
            <Text
              style={{
                ...styles.titleSearches,
                fontFamily: "BoldText",
                fontSize: RFValue(14),
                marginBottom: 10,
              }}
            >
              {title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...styles.titleSearches,
                  fontFamily: "Heavy",
                  fontSize: RFValue(14),
                  color: "#305A9C",
                }}
              >
                ${item?.discountedPrice ? discountedPrice : item?.price}
              </Text>
              <Text style={{ color: "#999999", fontWeight: "600" }}>
                {" "}
                /{" "}
                {planType == "OneTime"
                  ? "Per Background Check"
                  : planType == "Yearly"
                  ? item?.description
                  : planType}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...styles.titleSearches,
                  fontSize: RFValue(9),
                  color: "#777777",
                }}
              >
                {item?.discountedPrice
                  ? "Regular Price $ " + item?.price + "-" + " "
                  : item?.description}
              </Text>
              {item?.discountedPrice && discountPercentage && (
                <Text
                  style={{
                    ...styles.titleSearches,
                    fontFamily: "BoldText",
                    fontSize: RFValue(10),
                    color: "#FD2D43",
                    fontWeight: "Heavy",
                  }}
                >
                  {discountPercentage}% off!
                </Text>
              )}
            </View>
          </View>
          <View style={[styles.PlanCheckBoxContainer, { paddingTop: 40 }]}>
            <View
              style={{
                height: 25,
                width: 25,
                borderRadius: 15,
                borderWidth: 0.2,
                borderColor: "gray",
                bottom: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 25,
                  backgroundColor:
                    selected?._id == item?._id ? "#2D5D97" : "#fff",
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={[styles.container, { opacity: showModal ? 0.5 : 1 }]}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
          backgroundColor="transparent"
        />
        {FirstVisit == 0 ? (
          <View style={styles.homeHeader}>
             <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ width: RFValue(10), height: RFValue(20) }}
          />
        </TouchableOpacity>

            <Text style={styles.headerTitle}>
              <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
                Subscriptions
              </Text>
            </Text>
            <Pressable>
              <Feather name="menu" size={24} color="#305A9C" />
            </Pressable>
          </View>
        ) : (
          <View style={{ height: RFValue(30) }} />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: RFValue(50) }}
          ref={scrollView}
        >
          {FirstVisit == 1 && <WelcomeComponent />}
          <View style={styles.choosePlanContainer}>
            <Text
              onPress={() => navigation.goBack()}
              style={styles.choosePlanContainerText1}
            >
              Choose Plan
            </Text>
          </View>
          {PayAsYouGo?.map((item, index) => (
            <>
              {item?.hasOwnProperty("planName") && (
                <>
                  <PlanComponent
                    planBox={true}
                    title={item?.planName}
                    discountedPrice={item?.discountedPrice}
                    planType={item?.planType}
                    price={item?.price}
                    discountPercentage={item?.discountPercentage}
                    PlanName={"Gold"}
                    item={item}
                    PlanBoxColor={colors[index]}
                    index={index}
                  />
                </>
              )}
            </>
          ))}
          <View>
            <View style={{ marginTop: RFValue(14) }}>
              {!pay_as_you_go && <BilledSelectorComp />}
              {!pay_as_you_go &&
                PayList?.map((item, index) => (
                  <>
                    {item?.hasOwnProperty("planName") && (
                      <>
                        <PlanComponent
                          planBox={true}
                          title={item?.totalSearch + " " + item?.planName}
                          discountedPrice={item?.discountedPrice}
                          planType={item?.planType}
                          price={item?.price}
                          discountPercentage={item?.discountPercentage}
                          PlanName={"Gold"}
                          item={item}
                          PlanBoxColor={colors[index]}
                          index={index}
                        />
                      </>
                    )}
                  </>
                ))}
              <TouchableOpacity
                onPress={() => {
                  if (ActivePlan) {
                    cancelSub();
                  } else {
                    Platform.OS == "android"
                      ? handlePurchaseAndroid()
                      : handlePurchaseAndroid();
                  }
                }}
                activeOpacity={0.5}
                style={styles.paymentContainer}
              >
                {PayPalLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Text
                      style={[
                        styles.choosePlanContainerText,
                        { color: "white" },
                      ]}
                    >
                      {ActivePlan ? "Cancel Subscription" : "CHOOSE"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              {/* <View style={{ marginTop: RFValue(15), marginLeft: "5%" }}>
                <View style={styles.heading}>
                  <Image
                    source={require("../assets/icons/thumbs.png")}
                    style={styles.do}
                  /> 
                  <Text style={styles.title}>Referral Code</Text>
                </View>
              </View>
              <View style={{flexDirection:"row",justifyContent:'space-between', marginHorizontal: '8%',}}>
              <TextInput
            style={styles.input} 
            />
            <TouchableOpacity style={styles.send}><Text style={styles.sendtext}>SEND</Text></TouchableOpacity>
              </View> */}
              {!pay_as_you_go && FirstVisit != 1 && (
                <>
                  <Text
                    style={{
                      marginTop: RFValue(15),
                      fontSize: RFValue(10),
                      textAlign: "center",
                      color: "gray",
                    }}
                  >
                    Privacy & Terms
                  </Text>

                  <Text
                    style={{
                      fontSize: RFValue(7),
                      textAlign: "center",
                      color: "#000",
                      marginTop: RFValue(10),
                    }}
                  >
                    Upon purchase confirmation, charges, including taxes, will
                    be billed to your mobile device{"\n"}
                    payment account. Your subscription will renew automatically,
                    with charges processed{"\n"}
                    through your mobile payment account at the subscription's
                    end. Cancel anytime in the App{"\n"}
                    Store settinas.
                  </Text>
                </>
              )}

              {/* )} */}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: RFValue(8),
    marginTop: RFValue(10),
    width: "75%",
    height: RFValue(35),
    color:'#000000',
    fontSize: RFValue(12),
    paddingHorizontal:RFValue(8)
  },
  send:{
    width:'23%',
    backgroundColor:'#305A9C',
    marginTop: RFValue(10),
    height: RFValue(35),
    alignItems:'center',
    justifyContent:'center',
    borderRadius: RFValue(8),
  },
  sendtext:{
    color:"#FFFFFF",
    fontSize: RFValue(12),
  },
  payMent: {
    justifyContent: "center",
    alignItems: "center",
  },
  paymentContainer: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  paymentIcon: {
    height: 40,
    width: 100,
  },
  seprator: {
    width: RFValue(45),
    height: 6,
    borderRadius: 5,
    backgroundColor: "#DBDBDB",
    alignSelf: "center",
    marginTop: RFValue(12),
  },
  homeHeader: {
    // width: WIDTH,
    // height: RFValue(30),
    // backgroundColor: "#305A9C",
    // justifyContent: "space-between",
    // alignItems: "center",
    // flexDirection: "row",
    // paddingHorizontal: RFValue(20),
    // marginTop: Device.STATUS_BAR_HEIGHT + 30,

    width: WIDTH,
    height: RFValue(90),
    backgroundColor: "#305A9C",
    // alignItems: "center",
    paddingHorizontal: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT
        : Device.STATUS_BAR_HEIGHT + 20,
    alignItems: "center",

    // paddingTop:Platform.OS==='android'?0:RFValue(12),
  },
  heading: {
    backgroundColor: "#F5F5F5",
    width: "95%",
    height: RFValue(32),
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: RFValue(12),
  },
  do: {
    width: RFValue(14),
    height: RFValue(14),
    marginRight: RFValue(5),
  },
  title: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
    // marginLeft: RFValue(40),
  },
  headerTitle: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "Bold",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  offerPriceContainer: {
    width: WIDTH - RFValue(30),
    height: RFValue(90),
    paddingHorizontal: RFValue(8),
    paddingBottom: RFValue(10),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#315A9C",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RFValue(8),
  },
  membershipIncludes: {
    fontFamily: "Heavy",
    color: "#315A9C",
    fontSize: RFValue(15),
    marginLeft: RFValue(20),
    marginTop: RFValue(10),
  },
  membericon: {
    width: RFValue(24),
    height: RFValue(24),
  },
  memberlistText: {
    fontSize: RFValue(18),
    color: "#000",
    fontFamily: "Medium",
    marginLeft: RFValue(12),
  },
  memberListDeatil: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(20),
    marginTop: RFValue(16),
  },
  WelcomeText: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#30599D",
    marginVertical: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  WelcomeDesc: {
    textAlign: "center",
    fontSize: RFValue(14),
    paddingHorizontal: 10,
    marginBottom: RFValue(15),
  },
  choosePlanContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  choosePlanContainerText: {
    fontSize: RFValue(11),
    fontWeight: "bold",
  },
  choosePlanContainerText1: {
    marginLeft: RFValue(5),
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
  },
  PlanContainer: {
    // height: RFValue(180),
    borderWidth: 0.2,
    // borderWidth: 2,
    width: WIDTH - RFValue(30),
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "gray",
    flexDirection: "row",
    marginBottom: 10,
    // height: RFValue(125),
    // maxHeight: RFValue(125),
    // minHeight: RFValue(20),
    // height: RFValue(120),
  },
  titleSearches: {
    fontSize: RFValue(12),
    color: "rgba(0,0,0,0.8)",
    // fontFamily: "Medium",
  },
  PlanContent: {
    // borderWidth: 1,
    width: WIDTH / 1.2,
    padding: 15,
  },
  PlanCheckBoxContainer: {
    // borderWidth: 1,
    width: WIDTH / 10,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: RFValue(-5),
  },
  PlanCheckBox: {},
  modal: {
    // flex: 1,
    height: 150,
    width: 150,
    alignItems: "center",
    backgroundColor: "#00ff00",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: "white",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WIDTH - 30,
    height: WIDTH / 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    // textAlign: "center",
  },
  paymentContainer1: {
    width: WIDTH - 50,
    borderWidth: 1,
    borderRadius: 10,
    // borderColor:'',
    paddingVertical: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
