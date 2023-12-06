/** @format */

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Feather, Entypo, Octicons } from "@expo/vector-icons";
import SearchScreen from "./SearchScreen";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
import { axiosPOSTCall } from "../utils/axios.js";
import { axiosGETCall } from "../utils/axios.js";
import { useIsFocused } from "@react-navigation/native";
import Device from "../../src/constants/device";
import { useDispatch } from "react-redux";
import RFIcon from "../assets/RFIcon.svg";
import { pendingSearch } from "../redux/action";
import * as RNIap from "react-native-iap";

const WIDTH = Dimensions.get("window").width;

export default function ResultsScreen({ navigation, route }) {
  var { obj, selected, research, city, replace } = route?.params;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(true);
  const userData = useSelector((state) => state?.loginDetails);
  const pendingSearchRed = useSelector((state) => state?.pendingSearch);
  const [DATA, setData] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const isFocused = useIsFocused();
  const [planData, setPlanData] = useState({});
  const [SelectedData, setSelectedData] = useState({});
  const [screenValue, setScreenValue] = useState(0);
  const [searchFunCall, setSearchFunCall] = useState(false);

  useEffect(() => {
    if (research) {
      // setShowModal(true);
      // showConfirmDialog(obj)
      // SearchFunction(obj);
    } else {
      searchAPI(pageNo);
    }
  }, []);
  const searchAPI = (pageNo) => {
    var url = `/search/openSearch?pageNo=${pageNo}&pageSize=${10}`;
    var Token = userData?.Authorization;
    setScreenValue(1);
    axiosPOSTCall(url, obj, Token, (callBack) => {
      if (callBack?.status == 200) {
        if (pageNo == 1) {
          setData(callBack?.data?.response);
          setCount(callBack?.data?.count);
        } else {
          if (callBack?.data?.response?.length > 0) {
            var dat = DATA;
            array1 = dat.concat(callBack?.data?.response);
            setData(array1);
          }
        }
        setPageNo(pageNo + 1);
      }
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    });
  };

  const PayPalPaymentRequest = (obj) => {
    var url =
      "/orders/successPayment?planId=" +
      obj?.planId +
      "&paymentMode=online&paymentVia=google&purchaseToken=" +
      obj?.purchaseToken;
    var Token = userData?.Authorization;
    axiosGETCall(url, Token, (callBack) => {
      setTimeout(() => {
        setScreenValue(2);
      }, 100);
      setSearchFunCall(true);
    });
  };

  useEffect(() => {
    if (searchFunCall) {
      SearchFunction(pendingSearchRed);
    }
  }, [searchFunCall]);

  const handlePurchase = async (sku) => {
    setShowModal(true);
    setScreenValue(3);
    if (Platform.OS == "android") {
      var NData = await RNIap.getProducts({
        skus: [sku.productId],
      });
      var data = await RNIap.requestPurchase(
        { skus: [NData[0]?.productId] },
        false
      )
        .then(async (res) => {
          var NData = res[0];
          var newData = await RNIap.finishTransaction({
            purchase: NData,
            isConsumable: true,
            developerPayloadAndroid: "",
          });
          if (newData?.code == "OK") {
            var obj = {
              planId: "64393ad4a06e611316ce03bd",
              paymentMode: "online",
              paymentVia: "google",
              purchaseToken: newData?.purchaseToken,
            };
            PayPalPaymentRequest(obj, pendingSearchRed);
          }
        })
        .catch((err) => {
          setShowModal(false);
        });
    } else if (Platform.OS == "ios") {
      var NData = await RNIap.getProducts({
        skus: [sku.productId],
      });
      var data = await RNIap.requestPurchase(
        { sku: NData[0]?.productId },
        false
      )
        .then(async (res) => {
          var newData = await RNIap.finishTransaction({
            purchase: res,
            isConsumable: true,
            developerPayloadAndroid: "",
          });
          var obj = {
            planId: "64393ad4a06e611316ce03bd",
            paymentMode: "online",
            paymentVia: "apple",
            purchaseToken: res?.transactionId,
          };
          PayPalPaymentRequest(obj, pendingSearchRed);
        })
        .catch((err) => {
          setShowModal(false);
          console.log(
            "🚀 ~ file: SubscribeScreen.js:156 ~ handlePurchase ~ err:",
            err
          );
          // setPayPalLoading(false);
        });
    }
  };

  const SearchFunction = (item, callBackData) => {
    // mapped the initial search data ...
    setShowModal(true);
    if (!research) {
      item.metaBody = obj;
    } else {
      item.metaBody = { research: true };
    }
    setShowModal(true);
    setLoadingData(item.item?._id);
    var url = "/search/searchCluster";
    var Token = userData?.Authorization;
    axiosPOSTCall(url, item, Token, (callBack) => {
      if (callBack?.status == 200) {
        setTimeout(() => {
          setShowModal(false);
          navigation.navigate("ResultDeatilScreen", {
            data: callBack?.data,
            newData: SelectedData,
          });
        }, 1000);
      } else {
        if (
          callBack.message == "No Search Available, Please Purchase a plan!"
        ) {
          setShowModal(false);
          if (
            callBackData.freeSearches == 0 &&
            callBackData.totalSearch == 0 &&
            callBackData?.planData
          ) {
            Alert.alert(
              callBackData?.planData ? "Out of Credits" : "Pay As You Go",
              callBackData?.planData
                ? "You have ran out of monthly subscription credits, this report will cost you $4.99"
                : callBack.message,
              [
                {
                  text: callBackData?.planData ? "Approve" : "Buy",
                  onPress: () => {
                    dispatch(pendingSearch({ payload: obj }));
                    setShowModal(true);
                    setTimeout(() => {
                      handlePurchase({ productId: "pay_as_you_go_2" });
                    }, 100);
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => {},
                },
              ]
            );
          } else {
            Alert.alert(
              callBackData?.planData ||
                callBackData.freeSearches != 0 ||
                callBackData.totalSearch != 0
                ? "Credits"
                : "Pay As You Go",
              callBackData?.planData ||
                callBackData.freeSearches != 0 ||
                callBackData.totalSearch != 0
                ? "To view this record one of your monthly credits will be deducted."
                : "To view this report you will be charged $4.99. Do you wish to proceed?",
              [
                {
                  text:
                    callBackData?.planData ||
                    callBackData.freeSearches != 0 ||
                    callBackData.totalSearch != 0
                      ? "Approve"
                      : "Buy",
                  onPress: () => {
                    if (
                      callBackData?.planData ||
                      callBackData.freeSearches != 0 ||
                      callBackData.totalSearch != 0
                    ) {
                      setScreenValue(2);
                      setShowModal(true);
                      // setSearchedData(data);
                      dispatch(pendingSearch({ payload: obj }));

                      setTimeout(() => {
                        handlePurchase({ productId: "pay_as_you_go_2" });
                      }, 100);
                    } else {
                      setShowModal(true);
                      dispatch(pendingSearch({ payload: obj }));

                      setTimeout(() => {
                        handlePurchase({ productId: "pay_as_you_go_2" });
                      }, 100);
                    }
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => {},
                },
              ]
            );
          }
        }
      }
    });
  };

  const setPlan = (val) => {
    showConfirmDialog(val);
  };
  const showConfirmDialog = (data) => {
    if (Searches.freeSearches == 0 && Searches.totalSearch == 0 && planData) {
      Alert.alert(
        planData ? "Out of Credits" : "Pay As You Go",
        planData
          ? "You have ran out of monthly subscription credits, this report will cost you $4.99"
          : callBack?.message,
        [
          {
            text: planData ? "Approve" : "Buy",
            onPress: () => {
              dispatch(pendingSearch({ payload: data }));
              setTimeout(() => {
                handlePurchase({ productId: "pay_as_you_go_2" });
              }, 100);
            },
          },
          {
            text: "Cancel",
            onPress: () => {},
          },
        ]
      );
    } else {
      if (planData?.planType == "Per Background Check") {
        Alert.alert(
          "Friend Verifier",
          "To view this record you will be charged $6.99",
          [
            // The "Yes" button
            {
              text: "Approve",
              onPress: () => {
                setScreenValue(2);
                SearchFunction(data);
              },
            },
            {
              text: "Cancel",
              onPress: () => {},
            },
          ]
        );
      } else {
        Alert.alert(
          planData || Searches.freeSearches != 0 || Searches.totalSearch != 0
            ? "Credits"
            : "Pay As You Go",
          planData || Searches.freeSearches != 0 || Searches.totalSearch != 0
            ? "To view this record one of your monthly credits will be deducted."
            : "To view this report you will be charged $4.99. Do you wish to proceed?",
          [
            {
              text:
                planData ||
                Searches.freeSearches != 0 ||
                Searches.totalSearch != 0
                  ? "Approve"
                  : "Buy",
              onPress: () => {
                if (
                  planData ||
                  Searches.freeSearches != 0 ||
                  Searches.totalSearch != 0
                ) {
                  setScreenValue(2);
                  dispatch(pendingSearch({ payload: data }));
                  SearchFunction(data);
                } else {
                  dispatch(pendingSearch({ payload: data }));
                  handlePurchase({ productId: "pay_as_you_go_2" });
                }
              },
            },
            {
              text: "Cancel",
              onPress: () => {},
            },
          ]
        );
      }
    }
  };
  const getStateName = (state) => {
    const data = options.find((items) => {
      return items.abbreviation == state;
    });
    return data?.name;
  };

  const [Searches, setSearches] = useState(0);

  const options = [
    {
      name: "Alabama",
      abbreviation: "AL",
    },
    {
      name: "Alaska",
      abbreviation: "AK",
    },
    {
      name: "American Samoa",
      abbreviation: "AS",
    },
    {
      name: "Arizona",
      abbreviation: "AZ",
    },
    {
      name: "Arkansas",
      abbreviation: "AR",
    },
    {
      name: "California",
      abbreviation: "CA",
    },
    {
      name: "Colorado",
      abbreviation: "CO",
    },
    {
      name: "Connecticut",
      abbreviation: "CT",
    },
    {
      name: "Delaware",
      abbreviation: "DE",
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC",
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM",
    },
    {
      name: "Florida",
      abbreviation: "FL",
    },
    {
      name: "Georgia",
      abbreviation: "GA",
    },
    {
      name: "Guam",
      abbreviation: "GU",
    },
    {
      name: "Hawaii",
      abbreviation: "HI",
    },
    {
      name: "Idaho",
      abbreviation: "ID",
    },
    {
      name: "Illinois",
      abbreviation: "IL",
    },
    {
      name: "Indiana",
      abbreviation: "IN",
    },
    {
      name: "Iowa",
      abbreviation: "IA",
    },
    {
      name: "Kansas",
      abbreviation: "KS",
    },
    {
      name: "Kentucky",
      abbreviation: "KY",
    },
    {
      name: "Louisiana",
      abbreviation: "LA",
    },
    {
      name: "Maine",
      abbreviation: "ME",
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH",
    },
    {
      name: "Maryland",
      abbreviation: "MD",
    },
    {
      name: "Massachusetts",
      abbreviation: "MA",
    },
    {
      name: "Michigan",
      abbreviation: "MI",
    },
    {
      name: "Minnesota",
      abbreviation: "MN",
    },
    {
      name: "Mississippi",
      abbreviation: "MS",
    },
    {
      name: "Missouri",
      abbreviation: "MO",
    },
    {
      name: "Montana",
      abbreviation: "MT",
    },
    {
      name: "Nebraska",
      abbreviation: "NE",
    },
    {
      name: "Nevada",
      abbreviation: "NV",
    },
    {
      name: "New Hampshire",
      abbreviation: "NH",
    },
    {
      name: "New Jersey",
      abbreviation: "NJ",
    },
    {
      name: "New Mexico",
      abbreviation: "NM",
    },
    {
      name: "New York",
      abbreviation: "NY",
    },
    {
      name: "North Carolina",
      abbreviation: "NC",
    },
    {
      name: "North Dakota",
      abbreviation: "ND",
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP",
    },
    {
      name: "Ohio",
      abbreviation: "OH",
    },
    {
      name: "Oklahoma",
      abbreviation: "OK",
    },
    {
      name: "Oregon",
      abbreviation: "OR",
    },
    {
      name: "Palau",
      abbreviation: "PW",
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA",
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR",
    },
    {
      name: "Rhode Island",
      abbreviation: "RI",
    },
    {
      name: "South Carolina",
      abbreviation: "SC",
    },
    {
      name: "South Dakota",
      abbreviation: "SD",
    },
    {
      name: "Tennessee",
      abbreviation: "TN",
    },
    {
      name: "Texas",
      abbreviation: "TX",
    },
    {
      name: "Utah",
      abbreviation: "UT",
    },
    {
      name: "Vermont",
      abbreviation: "VT",
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI",
    },
    {
      name: "Virginia",
      abbreviation: "VA",
    },
    {
      name: "Washington",
      abbreviation: "WA",
    },
    {
      name: "West Virginia",
      abbreviation: "WV",
    },
    {
      name: "Wisconsin",
      abbreviation: "WI",
    },
    {
      name: "Wyoming",
      abbreviation: "WY",
    },
  ];
  const [isPhone, setIsPhone] = useState(false);
  const [Email, setEmail] = useState(false);
  useEffect(() => {
    GetSearch();
  }, [isFocused]);

  const GetSearch = () => {
    if (!research) {
      if (userData?.hasOwnProperty("Authorization")) {
        var Token = userData?.Authorization;
        var url = "/getSearch";
        axiosGETCall(url, Token, (callBack) => {
          if (callBack?.status == 200) {
            setPlanData(callBack?.data?.planId);
            setSearches(callBack?.data);
          }
        });
      }

      var exists =
        obj?.fields.filter(function (o) {
          return o.hasOwnProperty("phone");
        }).length > 0;
      setIsPhone(exists);
      var emailExist =
        obj?.fields.filter(function (o) {
          return o.hasOwnProperty("email");
        }).length > 0;
      setEmail(emailExist);
    } else {
      if (userData?.hasOwnProperty("Authorization")) {
        var Token = userData?.Authorization;
        var url = "/getSearch";
        axiosGETCall(url, Token, (callBack) => {
          if (callBack?.status == 200) {
            setPlanData(callBack?.data?.planId);
            setSearches(callBack?.data);
            setTimeout(() => {
              SearchFunction(obj, callBack?.data);
            }, 1000);
          }
        });
      }
    }
  };
  const [LoadingData, setLoadingData] = React.useState();
  const Item = (items) => {
    var item = items?.item?._source;
    item.age = items?.item?.age;
    item.formattedDob = items?.item?.formattedDob;
    var d0b = items?.item?._index.includes("dob");
    if (d0b) {
      item.index = "dob";
    } else {
      item.index = "email";
    }
    return (
      <View activeOpacity={0.5} style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => (!LoadingData ? setPlan(items?.item) : null)}
        >
          <View
            style={{
              width: "35%",
              height: RFValue(20),
              alignItems: "center",
              backgroundColor: "#3B5997",
              borderTopLeftRadius: RFValue(10),
              justifyContent: "center",
            }}
          >
            <Text
              style={[styles.age, { fontSize: RFValue(10), color: "#ffffff" }]}
            >
              Viewed on: 10/1/2023
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "87%",
              paddingHorizontal: RFValue(12),
            }}
          >
            <Text style={styles.name}>
              {item?.FIRST_NAME} {item?.LAST_NAME}
            </Text>
            <View style={{ marginRight: RFValue(12) }}>
              <Text
                style={[styles.age, { fontSize: RFValue(24), color: "#000" }]}
              >
                {items?.item?.age && items?.item?.age}
              </Text>
              {items?.item?.age && (
                <Text
                  style={[
                    styles.age,
                    { fontSize: RFValue(6), marginTop: RFValue(-5) },
                  ]}
                >
                  Years Old
                </Text>
              )}
            </View>
          </View>

          <View style={{ flexDirection: "row", marginHorizontal: RFValue(12) }}>
            <Octicons
              style={{ marginRight: RFValue(5) }}
              name="location"
              size={20}
              color="#BEBEBE"
            />
            <View style={{ height: 40, width: 110 }}>
              <Text style={styles.age} numberOfLines={2}>
                {item?.CITY}, {item?.STATE}
              </Text>
              <Text style={styles.age}>{}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: RFValue(10),
              marginBottom: RFValue(5),
            }}
          >
            <View
              style={{
                width: "40%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: RFValue(20), height: RFValue(20) }}
                source={require("../assets/icons/phone1.png")}
              />
              <Text style={styles.age}>{" "}2 Mobile Numbers</Text>
            </View>
            <View
              style={{
                width: "40%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: RFValue(20), height: RFValue(20) }}
                source={require("../assets/icons/email1.png")}
              />
              <Text style={styles.age}>{" "}5 Email Addresses</Text>
            </View>
          </View>
          <View
            style={{
              width: "82.3%",
              alignItems: "flex-end",
              borderTopWidth: 1,
              borderColor: "rgba(0,0,0,0.3)",
            }}
          >
            <View
              style={[styles.viewReportContainer, { marginRight: RFValue(12) }]}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedData(items?.item);
                  if (!LoadingData) {
                    setPlan(items?.item);
                  }
                }}
              >
                {LoadingData == items?.item?._id ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.viewReportText}>View Report</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getFirstLatter = (text) => {
    return text.charAt(0);
  };

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumberString;
  }

  const toTitleCase = (str) => {
    if (!str) return str;
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const ItemForPhone = (items) => {
    var item = items?.item?._source;
    item.age = items?.item?.age;
    item.formattedDob = items?.item?.formattedDob;
    var d0b = items?.item?._index.includes("dob");
    if (d0b) {
      item.index = "dob";
    } else {
      item.index = "email";
    }
    return (
      <View activeOpacity={0.5} style={styles.itemContainer}>
        <View>
          {Email ? (
            <Text style={{ fontSize: 24, color: "black" }}>{item?.EMAIL}</Text>
          ) : (
            <Text style={{ fontSize: 24, color: "black" }}>
              {formatPhoneNumber(item?.PHONE)}
            </Text>
          )}
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.fullnameText}>Full Name</Text>
            <View style={{ marginVertical: 10 }}>
              <Text style={[styles.fullnameText, { fontWeight: "bold" }]}>
                {items?.item?._source?.FIRST_NAME
                  ? getFirstLatter(items?.item?._source?.FIRST_NAME)
                  : "-"}
                {""}
                ********
              </Text>
            </View>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text style={styles.fullnameText}>Location</Text>
            <View style={{ marginVertical: 10 }}>
              <Text style={[styles.fullnameText, { fontWeight: "bold" }]}>
                {toTitleCase(items?.item?._source?.CITY)}
                {toTitleCase(items?.item?._source?.STATE)
                  ? ", " + getStateName(items?.item?._source?.STATE)
                  : null}
              </Text>
              <Text style={[styles.fullnameText, { fontWeight: "bold" }]}>
                {items?.item?._source?.ORIG_ZIP}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ width: RFValue(10), height: RFValue(20) }}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
          Results
        </Text>
        <Feather name="menu" size={24} color="#305A9C" />
      </View>
      {count >= 100 ? (
        <View style={[styles.dangerContainer]}>
          <Text style={styles.dangerLine}>
            {count} Results found for{" "}
            <Text style={{ ...styles.dangerLine, fontFamily: "BoldText" }}>
              {obj?.fields[0][Object.keys(obj?.fields[0])[0]]}
              {obj?.fields?.map((item, index) => {
                Object.keys(obj?.fields[index]) != "city" &&
                  obj?.fields[index][Object.keys(obj?.fields[index])[0]] + " ";
              })}
            </Text>{" "}
            in{" "}
            <Text style={{ ...styles.dangerLine, fontFamily: "BoldText" }}>
              {city ? city + " " : ""}
              {selected ? selected : "All States"}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen", { refine: true })}
          >
            <Text
              style={{
                ...styles.dangerLine,
                textDecorationLine: "underline",
              }}
            >
              Refine Search
            </Text>
          </TouchableOpacity>
        </View>
      ) : count <= 0 && !showModal ? (
        <>
          {isPhone || Email ? (
            <View style={[styles.dangerContainer]}>
              <Text style={styles.dangerLine}>
                {"No result for " +
                  obj?.fields[0][Object.keys(obj?.fields[0])[0]]}
              </Text>
            </View>
          ) : (
            <>
              {obj?.fields?.length > 0 && (
                <View style={[styles.dangerContainer]}>
                  {obj?.fields?.map((item, index) => {
                    if (item == "phone" || item == "email") {
                      return (
                        <Text style={styles.dangerLine}>
                          {Object.keys(obj?.fields[0]) == "phone" ||
                          Object.keys(obj?.fields[0]) == "email" ? (
                            "No results for " +
                            obj?.fields[0][Object.keys(obj?.fields[0])[0]]
                          ) : (
                            <>
                              {count} Results found for{" "}
                              <Text
                                style={{
                                  ...styles.dangerLine,
                                  fontFamily: "BoldText",
                                }}
                              >
                                {obj?.fields?.map((item, index) => (
                                  <>
                                    {Object.keys(obj?.fields[index]) !=
                                      "city" &&
                                      Object.keys(obj?.fields[index]) !=
                                        "state" &&
                                      obj?.fields[index][
                                        Object.keys(obj?.fields[index])[0]
                                      ] + " "}
                                  </>
                                ))}
                              </Text>{" "}
                              in{" "}
                              <Text
                                style={{
                                  ...styles.dangerLine,
                                  fontFamily: "BoldText",
                                }}
                              >
                                {city ? city + ", " : ""}
                                {selected ? selected : "All States"}
                              </Text>
                            </>
                          )}
                        </Text>
                      );
                    } else {
                      return (
                        <>
                          {count == 0 && index == 0 && (
                            <>
                              <Text
                                style={{
                                  ...styles.dangerLine,
                                  fontFamily: "BoldText",
                                }}
                              >
                                No results for{" "}
                                {obj?.fields?.map((item, indexes) => (
                                  <>
                                    {Object.keys(obj?.fields[indexes]) !=
                                      "city" &&
                                      Object.keys(obj?.fields[indexes]) !=
                                        "state" &&
                                      obj?.fields[indexes][
                                        Object.keys(obj?.fields[indexes])[0]
                                      ] + " "}
                                  </>
                                ))}
                              </Text>
                              <Text
                                style={{
                                  ...styles.dangerLine,
                                  fontFamily: "BoldText",
                                }}
                              >
                                in {city ? city + " " : ""}
                                {selected ? selected : "All States"}
                              </Text>
                            </>
                          )}
                        </>
                      );
                    }
                  })}
                </View>
              )}
            </>
          )}
        </>
      ) : (
        ""
      )}
      <View style={styles.searchListContainer}>
        {(isPhone || Email) && DATA?.length > 0 ? (
          <>
            <View
              activeOpacity={0.5}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: "#F5F5F5",
                  marginTop: 30,
                  height: 40,
                  padding: 0,
                  paddingHorizontal: 10,
                },
              ]}
            >
              <RFIcon style={{ marginRight: 10 }} />
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Record Founds
              </Text>
            </View>
            <ItemForPhone item={DATA[0]} />
            <TouchableOpacity
              onPress={() => {
                setSelectedData(DATA[0]);
                if (!LoadingData) {
                  var item = DATA[0]?._source;
                  item.age = DATA[0]?.age;
                  item.formattedDob = DATA[0]?.formattedDob;
                  var d0b = DATA[0]?._index.includes("dob");
                  if (d0b) {
                    item.index = "dob";
                  } else {
                    item.index = "email";
                  }
                  console.log(
                    "🚀 ~ file: ResultsScreen.js:856 ~ ResultsScreen ~ DATA[0]:",
                    item
                  );
                  setPlan(DATA[0]);
                }
              }}
              style={{
                height: 60,
                width: WIDTH - RFValue(40),

                backgroundColor: "#43CE91",
                alignSelf: "center",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                View Report
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {DATA?.length > 0 && (
              <Text style={styles.totalResults}>{count} Results</Text>
            )}
            <FlatList
              contentContainerStyle={{
                marginTop: RFValue(30),
                paddingBottom: RFValue(120),
              }}
              data={DATA}
              renderItem={Item}
              keyExtractor={(item, index) => item?.item?._source}
            />
          </>
        )}
      </View>
      {showModal && (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={true}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            <SearchScreen screen={screenValue} />
          </View>
        </Modal>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchListContainer: {
    marginBottom: 150,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
  },
  homeHeader: {
    width: WIDTH,
    height: RFValue(90),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT
        : Device.STATUS_BAR_HEIGHT + 20,
  },
  headerTitle: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "RegularText",
  },
  underHeaderContainer: {
    width: WIDTH,
    height: RFValue(22),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F6F6F",
    paddingBottom: 2,
  },
  dangerContainer: {
    width: WIDTH - RFValue(50),
    height: RFValue(50),
    padding: 2,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: RFValue(24),
    backgroundColor: "#44CE91",
    alignItems: "center",
    justifyContent: "center",
  },
  dangerIcon: {
    width: RFValue(20),
    height: RFValue(20),
    tintColor: "#000",
    marginRight: RFValue(5),
  },
  dangerLine: {
    fontSize: RFValue(12),
    color: "#fff",
    fontFamily: "RegularText",
  },
  totalResults: {
    color: "#000",
    fontFamily: "Medium",
    fontSize: RFValue(16),
    marginTop: RFValue(14),
    marginLeft: RFValue(24),
  },
  itemContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(12),
    width: WIDTH - RFValue(40),
    paddingBottom: RFValue(12),
    //padding: RFValue(12),
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  name: {
    fontSize: RFValue(16),
    color: "#000",
    fontFamily: "SemiBold",
    marginBottom: RFValue(5),
  },
  age: {
    color: "#8C929B",
    fontSize: RFValue(12),
    fontFamily: "RegularText",
  },
  viewReportContainer: {
    width: RFValue(90),
    height: RFValue(22),
    borderRadius: RFValue(2),
    backgroundColor: "#44CE91",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(6),
    paddingBottom: 2,
  },
  viewReportText: {
    fontSize: RFValue(12),
    color: "#fff",
    fontFamily: "BoldText",
  },
  itemRight: {
    flexDirection: "row",
  },
});
