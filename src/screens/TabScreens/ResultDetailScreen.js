/** @format */

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import moment from "moment";
import Modal from "react-native-modal";
import React, { useState, useEffect, useRef } from "react";
import {
  Feather,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { axiosPOSTCall } from "../../utils/axios.js";
import { useSelector } from "react-redux";
import Device from "../../../src/constants/device";
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;

export default function ResultDeatilScreen({ navigation, route }) {
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  }, [isFocused]);

  const data = route.params.data;
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
  const userData = useSelector((state) => state);
  useEffect(() => {
    setData(route.params.data);
  }, []);

  const [Loading, setLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [overview, setOverView] = React.useState("flex");
  const [address, setAddress] = React.useState("flex");
  const [contact, setContact] = React.useState("flex");
  const [associate, setAssociate] = React.useState("flex");
  const [criminal, setCrminal] = React.useState("flex");
  const [sexOffender, setSexOffender] = React.useState("flex");
  const [bankrupt, setBankrupt] = React.useState("flex");

  const crime = route.params.data;
  const onPressOverView = () => {
    if (overview === "flex") {
      setOverView("none");
    } else {
      setOverView("flex");
    }
  };

  const onPressContact = () => {
    if (contact === "flex") {
      setContact("none");
    } else {
      setContact("flex");
    }
  };

  const onPressAddress = () => {
    if (address === "flex") {
      setAddress("none");
    } else {
      setAddress("flex");
    }
  };

  const onPressAssociate = () => {
    if (associate === "flex") {
      setAssociate("none");
    } else {
      setAssociate("flex");
    }
  };

  const onPressCrminal = () => {
    if (criminal === "flex") {
      setCrminal("none");
    } else {
      setCrminal("flex");
    }
  };
  const onPressSexOffender = () => {
    if (sexOffender === "flex") {
      setSexOffender("none");
    } else {
      setSexOffender("flex");
    }
  };

  const onPressBankRupt = () => {
    if (bankrupt === "flex") {
      setBankrupt("none");
    } else {
      setBankrupt("flex");
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate("SupportTicketScreen");
  };

  const toTitleCase = (str) => {
    if (!str) return str;
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const getStateName = (state) => {
    state = state.toUpperCase();
    const data = options.find((items) => {
      return items.abbreviation == state;
    });
    return data?.name;
  };

  function convertInches(inches) {
    let feetFromInches = Math.floor(inches / 12);
    let inchesRemainder = inches % 12;

    let result = feetFromInches + "'" + inchesRemainder;
    return result;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <View style={styles.homeHeader}>
        <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-thin-left"
          size={24}
          color="#fff"
        />

        <Text style={styles.headerTitle}>
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
            Results
          </Text>
        </Text>
        <TouchableOpacity
          onPress={() => (Loading ? null : setModalVisible(true))}
        >
          <Entypo name="dots-three-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {Loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#305A9C" />
        </View>
      ) : (
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: RFValue(50) }}
        >
          {(data?.criminalData?.length > 0 &&
            data?.criminalData != "No Data Found!") ||
          (data?.sexOffendedData?.length > 0 &&
            data?.sexOffendedData != "No Data Found!") ||
          (data?.bankRuptciesData?.length > 0 &&
            data?.bankRuptciesData != "No Data Found!") ? (
            <View style={styles.alertContainer}>
              <Image
                style={{ width: RFValue(19), height: RFValue(19) }}
                source={require("../../assets/icons/alerticon.png")}
              />

              <Text style={styles.criminalRecordDetectedtext}>
                {data?.sexOffendedData?.length > 0 &&
                data?.sexOffendedData != "No Data Found!"
                  ? "Alert! Sex Offender Record Detected "
                  : data?.bankRuptciesData?.length > 0 &&
                    data?.bankRuptciesData != "No Data Found!"
                  ? "Alert! Bankruptcies Record Detected "
                  : "Alert! Criminal Record Detected "}
              </Text>
            </View>
          ) : (
            ""
          )}
          {/* ))}  */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressOverView}
            style={styles.overViewContainer}
          >
            <View style={styles.overviewLeft}>
              <Ionicons name="person" size={24} color="#00B3EF" />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Overview
              </Text>
            </View>

            {overview === "flex" ? (
              <Feather name="chevron-down" size={28} color="black" />
            ) : (
              <Feather name="chevron-up" size={28} color="black" />
            )}
          </TouchableOpacity>
          <View style={{ ...styles.resultDetailContainer, display: overview }}>
            <Text style={styles.nameAgeText}>
              {toTitleCase(data?.requestObj?.FIRST_NAME)}{" "}
              {toTitleCase(data?.requestObj?.LAST_NAME)}
            </Text>

            <View style={{ marginTop: RFValue(18) }}>
              <Text style={styles.fullnameText}>Full Name</Text>

              <Text style={styles.fullname}>
                {data?.requestObj?.FIRST_NAME} {data?.requestObj?.MIDDLE_NAME}{" "}
                {data?.requestObj?.LAST_NAME}
              </Text>
            </View>

            <View style={{ marginTop: RFValue(18) }}>
              <Text style={styles.fullnameText}>Aliases</Text>

              <View style={{ marginTop: RFValue(6) }}>
                {data?.aliasesData?.length > 0 &&
                  data?.aliasesData?.map((item, inde) => (
                    <View style={{ marginTop: RFValue(8) }}>
                      <Text style={{ ...styles.fullname, marginTop: 0 }}>
                        {item?.firstName} {item?.midName} {item?.lastName}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>

            <View style={styles.footerContainer}>
              <View style={{}}>
                <Text style={styles.fullnameText}>Age</Text>

                <Text style={styles.fullname}>{data?.requestObj?.age}</Text>
              </View>
              <View style={{}}>
                <Text style={styles.fullnameText}>Date of Birth</Text>

                <Text style={styles.fullname}>
                  {data?.requestObj?.formattedDob}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={onPressContact}
            style={styles.overViewContainer}
          >
            <View style={styles.overviewLeft}>
              <Image
                style={{ width: RFValue(20), height: RFValue(20) }}
                source={require("../../assets/icons/call.png")}
              />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Contact Info
              </Text>
            </View>
            {contact === "flex" ? (
              <Feather name="chevron-down" size={28} color="black" />
            ) : (
              <Feather name="chevron-up" size={28} color="black" />
            )}
          </TouchableOpacity>
          <View
            style={{
              ...styles.resultDetailContainer,
              display: contact,
            }}
          >
            <View style={{ marginTop: RFValue(0) }}>
              <Text style={styles.fullnameText}>Most Recent Number</Text>

              {data?.requestObj?.PHONE ? (
                <Text style={styles.fullname}>{data?.requestObj?.PHONE}</Text>
              ) : (
                <>
                  {data?.phone && (
                    <Text style={styles.fullname}>
                      {data?.phone.length > 0 && data?.phone[0]}
                    </Text>
                  )}
                </>
              )}
            </View>

            <View style={{ marginTop: RFValue(18) }}>
              <Text style={styles.fullnameText}>Other Numbers</Text>
              <View style={{ marginTop: RFValue(6) }}>
                {data?.phone?.map((item, index) => (
                  <>
                    {data?.requestObj?.PHONE &&
                      item != data?.requestObj?.PHONE && (
                        <Text style={styles.fullname}>{item}</Text>
                      )}
                  </>
                ))}
              </View>

              <View style={{ marginTop: RFValue(30) }}>
                <Text style={styles.fullnameText}>Most Recent Email</Text>

                {data?.requestObj?.EMAIL ? (
                  <Text style={styles.fullname}>{data?.requestObj?.EMAIL}</Text>
                ) : (
                  <>
                    {data?.email && (
                      <Text style={styles.fullname}>
                        {data?.email.length > 0 && data?.email[0]}
                      </Text>
                    )}
                  </>
                )}
              </View>
              <View style={{ marginTop: RFValue(18) }}>
                <Text style={styles.fullnameText}>Other Emails</Text>
                <View style={{ marginTop: RFValue(6) }}>
                  {data?.email?.map((item, index) => (
                    <>
                      {!data?.requestObj?.EMAIL ? (
                        <>
                          {index != 0 && (
                            <Text style={styles.fullname}>{item}</Text>
                          )}
                        </>
                      ) : (
                        <Text style={styles.fullname}>{item}</Text>
                      )}
                    </>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={onPressAddress}
            style={styles.overViewContainer}
          >
            <View style={styles.overviewLeft}>
              <Image
                style={{ width: RFValue(18), height: RFValue(18) }}
                source={require("../../assets/icons/address.png")}
              />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Address Info
              </Text>
            </View>
            {address === "flex" ? (
              <Feather name="chevron-down" size={28} color="black" />
            ) : (
              <Feather name="chevron-up" size={28} color="black" />
            )}
          </TouchableOpacity>
          <View
            style={{
              ...styles.resultDetailContainer,
              display:
                !data?.requestObj?.ADDRESS && !data?.requestObj?.ADDRESS
                  ? "none"
                  : address,
            }}
          >
            <View style={{ marginTop: RFValue(0) }}>
              <Text style={styles.fullnameText}>Most Recent Address</Text>
              <Text style={[styles.fullname_pastAddress, { marginTop: 20 }]}>
                {data?.requestObj?.ADDRESS}
              </Text>
              <Text style={styles.fullname_pastAddress}>
                {data?.requestObj?.CITY}
                {data?.requestObj?.STATE
                  ? ", " + getStateName(data?.requestObj?.STATE)
                  : ""}
              </Text>
            </View>
            <View style={{ marginTop: RFValue(18) }}>
              <Text style={styles.fullnameText}>Past Addresses</Text>

              <View style={{ marginTop: RFValue(6) }}>
                {data?.address?.map((item, index) => (
                  <>
                    <Text
                      style={[styles.fullname_pastAddress, { marginTop: 20 }]}
                    >
                      {item?.address}
                    </Text>
                    <Text style={styles.fullname_pastAddress}>
                      {item?.city} ,{getStateName(item?.state)}
                    </Text>
                    <Text style={styles.fullname_pastAddress}>
                      {item?.zip ? item?.zip + "\n" : ""}
                    </Text>
                  </>
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={onPressAssociate}
            style={styles.overViewContainer}
          >
            <View style={styles.overviewLeft}>
              <Image
                style={{ width: RFValue(20), height: RFValue(20) }}
                source={require("../../assets/icons/associate.png")}
              />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Potential Associates
              </Text>
            </View>
            {associate === "flex" ? (
              <Feather name="chevron-down" size={28} color="black" />
            ) : (
              <Feather name="chevron-up" size={28} color="black" />
            )}
          </TouchableOpacity>
          {data?.potientialAssociate?.length > 0 && (
            <View
              style={{ ...styles.resultDetailContainer, display: associate }}
            >
              {data?.potientialAssociate?.map((items, index) => (
                <View style={{ marginTop: RFValue(18) }}>
                  <Text
                    style={{
                      fontSize: RFValue(15.5),
                      color: "#343538",
                      fontFamily: "Medium",
                    }}
                  >
                    {toTitleCase(items?._source?.FIRST_NAME)}{" "}
                    {toTitleCase(items?._source?.LAST_NAME)}
                    {""}
                    {items?.age && ", " + items?.age}
                    {/* Sally Jessy Raphael (87) */}
                  </Text>

                  <TouchableOpacity
                    style={{
                      width: RFValue(100),
                      height: RFValue(22),
                      marginTop: RFValue(10),
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "#5979AE",
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      var item = items?._source;
                      item.age = items?.age;
                      item.formattedDob = items?.formattedDob;
                      var d0b = items?._index.includes("dob");
                      if (d0b) {
                        item.index = "dob";
                      } else {
                        item.index = "email";
                      }
                      navigation.push("ResultsScreen", {
                        research: true,
                        obj: items,
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(10),
                        color: "#5979AE",
                        fontFamily: "Medium",
                      }}
                    >
                      Scan this Person
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity
            onPress={onPressCrminal}
            style={styles.overViewContainer}
          >
            <View style={styles.overviewLeft}>
              <Image
                style={{ width: RFValue(20), height: RFValue(20) }}
                source={require("../../assets/icons/crminal.png")}
              />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Criminal Records
              </Text>
            </View>
            {criminal === "flex" ? (
              <Feather name="chevron-down" size={28} color="black" />
            ) : (
              <Feather name="chevron-up" size={28} color="black" />
            )}
          </TouchableOpacity>
          <View
            style={{
              display:
                crime?.criminalData == "No Data Found!" ? "none" : criminal,
            }}
          >
            {data?.criminalData?.length > 0 &&
            data?.criminalData != "No Data Found!" ? (
              <>
                <View
                  style={{
                    ...styles.resultDetailContainer,
                  }}
                >
                  {data?.criminalData?.map((item, index) => (
                    <>
                      {index != 0 && <View style={{ marginTop: 20 }} />}
                      <TouchableOpacity
                        style={{
                          width: RFValue(100),
                          height: RFValue(22),
                          marginTop: RFValue(10),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#466BA4",
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(11),
                            color: "#fff",
                            fontFamily: "Medium",
                          }}
                        >
                          {item?._source?.sourceState
                            ? getStateName(item?._source?.sourceState)
                            : "-"}
                        </Text>
                      </TouchableOpacity>

                      <View style={{ marginTop: RFValue(2) }}>
                        {item?._source?.OffenseDate && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Offense Date:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.OffenseDate &&
                                moment(item?._source?.OffenseDate).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.Category && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Offense Category:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.Category)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.OffenseDesc1 && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Offense Description:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.OffenseDesc1)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.Plea && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Plea:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.Plea)}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.Court && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Court:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.Court)}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.sourceState && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              State:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {getStateName(item?._source?.sourceState)}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.Disposition && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Disposition:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.Disposition)}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.DispositionDate && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Disposition Date:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {moment(
                                item?._source?.DispositionDate,
                                "YYYYMMDD"
                              ).format("MM/DD/YYYY")}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.sourceName && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Source:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.sourceName)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                      </View>
                    </>
                  ))}
                </View>
              </>
            ) : (
              <View
                style={{
                  ...styles.resultDetailContainer,
                  display: bankrupt,
                  height: RFValue(100),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontFamily: "SemiBold",
                    color: "#000",
                  }}
                >
                  No Records Found
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={onPressSexOffender}
            style={styles.overViewContainer}
          >
            <View style={styles.overviewLeft}>
              <Image
                style={{ width: RFValue(20), height: RFValue(20) }}
                source={require("../../assets/icons/crminal.png")}
              />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Sex Offender
              </Text>
            </View>
            {sexOffender === "flex" ? (
              <Feather name="chevron-down" size={28} color="black" />
            ) : (
              <Feather name="chevron-up" size={28} color="black" />
            )}
          </TouchableOpacity>
          <View
            style={{
              display:
                crime?.sexOffendedData == "No Data Found!"
                  ? "none"
                  : sexOffender,
            }}
          >
            {data?.sexOffendedData?.length > 0 &&
            data?.sexOffendedData != "No Data Found!" ? (
              <>
                <View
                  style={{
                    ...styles.resultDetailContainer,
                  }}
                >
                  {data?.sexOffendedData?.map((item, index) => (
                    <>
                      {index != 0 && <View style={{ marginTop: 20 }} />}

                      <TouchableOpacity
                        style={{
                          width: RFValue(100),
                          height: RFValue(22),
                          marginTop: RFValue(10),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#466BA4",
                          borderRadius: 5,
                        }}
                      >
                        {index != 0 && <Text>{"\n"}</Text>}
                        <Text
                          style={{
                            fontSize: RFValue(11),
                            color: "#fff",
                            fontFamily: "Medium",
                          }}
                        >
                          {item?._source?.SOURCE
                            ? getStateName(item?._source?.SOURCE)
                            : "-"}
                          {/* {item?._source?.COUNTY} */}
                        </Text>
                      </TouchableOpacity>

                      <View style={{ marginTop: RFValue(2) }}>
                        {item?._source?.RISKLEVEL && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Risk Level:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.RISKLEVEL &&
                                item?._source?.RISKLEVEL}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.COUNTY && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              County:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.COUNTY && item?._source?.COUNTY}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.HAIRCOLOR && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Hair Color:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.HAIRCOLOR &&
                                item?._source?.HAIRCOLOR}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.EYECOLOR && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Eye Color:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.EYECOLOR &&
                                item?._source?.EYECOLOR}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.HEIGHT && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Height:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.HEIGHT &&
                                convertInches(item?._source?.HEIGHT)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.WEIGHT && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Weight:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.WEIGHT &&
                                convertInches(item?._source?.WEIGHT)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.RACE && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Race:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.RACE &&
                                toTitleCase(item?._source?.RACE)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.GENDER && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Gender:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.GENDER &&
                                toTitleCase(item?._source?.GENDER)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.CASENUMBER && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Case Number:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.CASENUMBER)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.OFFENSEDAT && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              File Date:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.OFFENSEDAT)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.OFFENSEDAT && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Case Type:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.OFFENDERCA)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.OFFENSEDES && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Statue:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.OFFENSEDES)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.OFFENSECOD && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Statue Code:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.OFFENSECOD)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.CONVICTION && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Conviction:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.CONVICTION)}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.CONV_PLACE && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Place of Conviction:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.CONV_PLACE)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                        {item?._source?.VICTIMSAGE && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              Victim's Age:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {toTitleCase(item?._source?.VICTIMSAGE)}
                              {"\n"}
                            </Text>
                          </>
                        )}
                      </View>
                    </>
                  ))}
                </View>
              </>
            ) : (
              <View
                style={{
                  ...styles.resultDetailContainer,
                  display: bankrupt,
                  height: RFValue(100),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontFamily: "SemiBold",
                    color: "#000",
                  }}
                >
                  No Records Found
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={onPressBankRupt}
            style={{ ...styles.overViewContainer }}
          >
            <View style={styles.overviewLeft}>
              <Image
                style={{ width: RFValue(20), height: RFValue(22) }}
                source={require("../../assets/icons/moenybag.png")}
              />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Bankruptcies
              </Text>
            </View>
            {bankrupt === "flex" ? (
              <Feather name="chevron-down" size={28} color="black" />
            ) : (
              <Feather name="chevron-up" size={28} color="black" />
            )}
          </TouchableOpacity>
          <View
            style={{
              display:
                crime?.bankRuptciesData == "No Data Found!" ? "none" : criminal,
            }}
          >
            {data?.bankRuptciesData?.length > 0 &&
            data?.bankRuptciesData != "No Data Found!" ? (
              <>
                <View
                  style={{
                    ...styles.resultDetailContainer,
                  }}
                >
                  {data?.bankRuptciesData?.map((item, index) => (
                    <>
                      {index != 0 && <View style={{ marginTop: 20 }} />}
                      <TouchableOpacity
                        style={{
                          width: RFValue(100),
                          height: RFValue(22),
                          marginTop: RFValue(10),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#466BA4",
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: RFValue(11),
                            color: "#fff",
                            fontFamily: "Medium",
                          }}
                        >
                          {item?._source?.COURTDIST
                            ? getStateName(item?._source?.COURTDIST)
                            : "-"}
                        </Text>
                      </TouchableOpacity>

                      <View style={{ marginTop: RFValue(2) }}>
                        {item?._source?.FILE_DATE && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              File Date:
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.FIRST_NAME &&
                                moment(item?._source?.FILE_DATE).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.CASENUM && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              {toTitleCase("Case Number:")}
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.CASENUM}
                              {"\n"}
                            </Text>
                          </>
                        )}

                        {item?._source?.CHAPTER && (
                          <>
                            <Text
                              style={{
                                ...styles.fullname,
                                marginTop: RFValue(8),
                              }}
                            >
                              {toTitleCase("Bankruptcy Chapter:")}
                            </Text>
                            <Text style={{ ...styles.detailText }}>
                              {item?._source?.CHAPTER}
                              {"\n"}
                            </Text>
                          </>
                        )}
                      </View>
                    </>
                  ))}
                </View>
              </>
            ) : (
              <View
                style={{
                  ...styles.resultDetailContainer,
                  display: bankrupt,
                  height: RFValue(100),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontFamily: "SemiBold",
                    color: "#000",
                  }}
                >
                  No Records Found
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={{ ...styles.overViewContainer }}>
            <View style={styles.overviewLeft}>
              <Ionicons
                name="md-information-circle-outline"
                size={24}
                color="#000000"
              />
              <Text
                style={{
                  ...styles.criminalRecordDetectedtext,
                  fontFamily: "BoldText",
                }}
              >
                Disclaimer
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <View
              style={{
                ...styles.resultDetailContainer,
              }}
            >
              <Text>
                Our service gathers public records, including criminal records
                from government agencies, affiliates, and third parties.
                However, as we are not the creators of these databases, we
                cannot ensure the accuracy of the information or attest to the
                person's character.
                {"\n"}
                {"\n"}
                Court records, which are publicly accessible through government
                agencies, may contain criminal details such as felonies,
                misdemeanors, arrests, or infractions.
                {"\n"}
                {"\n"}
                Nevertheless, these public records can be unreliable,
                incomplete, or unrelated to the individual in question. It is
                crucial to independently verify a person's criminal history at
                the appropriate courthouse and not solely depend on the
                information provided here.
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <Modal
        backdropOpacity={0.9}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.seprator} />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              activeOpacity={0.5}
              style={styles.textinputCOntainer}
            >
              <MaterialCommunityIcons
                style={styles.icon}
                name="message-alert"
                size={24}
                color="#FF536F"
              />
              <Text style={{ ...styles.emailmeCopy, color: "#FF536F" }}>
                Request Removal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  seprator: {
    width: RFValue(45),
    height: 6,
    borderRadius: 5,
    backgroundColor: "#DBDBDB",
    alignSelf: "center",
    marginTop: RFValue(12),
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  homeHeader: {
    width: WIDTH,
    height: RFValue(90),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT 
        : Device.STATUS_BAR_HEIGHT + 20,

    // paddingTop: Platform.OS === "android" ? 0 : RFValue(12),
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
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
    justifyContent: "space-between",
    marginBottom: RFValue(12),
    width: WIDTH - RFValue(40),
    padding: RFValue(12),
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
    fontSize: RFValue(13),
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
    borderRadius: 20,
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
  alertContainer: {
    width: WIDTH - RFValue(45),
    height: RFValue(40),
    backgroundColor: "#FBF9C2",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: RFValue(16),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(5),
  },

  overViewContainer: {
    width: WIDTH - RFValue(45),
    height: RFValue(40),
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: RFValue(16),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(8),
    justifyContent: "space-between",
  },
  criminalRecordDetectedtext: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "Heavy",
    marginLeft: RFValue(5),
  },
  overviewLeft: {
    flexDirection: "row",
  },

  resultDetailContainer: {
    marginBottom: RFValue(10),
    width: WIDTH - RFValue(45),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: RFValue(12),
  },
  nameAgeText: {
    fontSize: RFValue(30),
    fontFamily: "Medium",
    color: "#000",
  },
  fullname: {
    color: "#000",
    fontSize: RFValue(15),
    fontFamily: "Medium",
    marginTop: RFValue(5),
    fontWeight: "bold",
  },
  detailText: {
    color: "#000",
    fontSize: RFValue(15),
    // fontFamily: "Medium",
    // marginTop: RFValue(5),
  },
  fullnameText: {
    color: "#C4C4C5",
    fontSize: RFValue(13),
    fontFamily: "RegularText",
  },
  // detailText: {
  //   color: "#C4C4C5",
  //   fontSize: RFValue(13),
  //   fontFamily: "RegularText",
  // },
  fullname_pastAddress: {
    color: "#000",
    fontSize: RFValue(15),
    fontFamily: "Medium",
    marginTop: RFValue(5),
    marginVertical: 5,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(0),
    marginTop: RFValue(30),
    marginBottom: 10,
  },
  modalContainer: {
    width: WIDTH,
    height: "25%",
    backgroundColor: "#fff",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 22,
    alignSelf: "center",
    position: "absolute",
    bottom: RFValue(-25),
  },
  textinputCOntainer: {
    width: WIDTH - RFValue(40),
    height: RFValue(55),
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(25),
    marginBottom: RFValue(14),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  icon: {
    width: RFValue(20),
    height: RFValue(20),
    marginRight: RFValue(20),
  },

  emailmeCopy: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "Medium",
  },
  buttonsContainer: {
    marginTop: RFValue(20),
  },
});
