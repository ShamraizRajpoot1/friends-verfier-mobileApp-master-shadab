import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { RFValue } from "react-native-responsive-fontsize";

export const CELL_SIZE = 48;
export const CELL_BORDER_RADIUS = 30;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const CELL_COUNT = 6;

const OtpVerification = ({ setValue1, value1 }) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);


  return (
    <View style={styles.root}>
      <View style={{}}>
        <CodeField
       
          ref={ref}
          {...props}
          value={value1}
          onChangeText={setValue1}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused && styles.focusCell,
                  {
                    backgroundColor:
                      value.length === 6 || isFocused ? "#315A9C" : "#F4F4F4",
                    color: value.length === 6 || isFocused ? "#fff" : "gray",
                  },
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  codigoText: {
    fontSize: RFValue(12),
    color: "#000",
    opacity: 0.38,
    marginLeft: RFValue(30),
    marginTop: RFValue(20),
    marginBottom: RFValue(14),
    fontFamily: "Bold",
  },
  focusCell: {
    marginHorizontal: RFValue(3),
    width: RFValue(45),
    height: RFValue(60),
    borderRadius: 10,
    fontSize: RFValue(32),
    textAlign: "center",
    color: "#fff",
    // fontFamily: "Bold",
    backgroundColor: "red",
    lineHeight: RFValue(55),
  },

  codeFiledRoot: {
    marginLeft: RFValue(2),
  },
  cell: {
    marginHorizontal: RFValue(3),
    width: RFValue(45),
    height: RFValue(60),
    borderRadius: 10,
    fontSize: RFValue(32),
    textAlign: "center",

    color: "gray",
    // fontFamily: "Bold",
    backgroundColor: "#D9D9D9",
    lineHeight: RFValue(55),
  },

  root: {
    minHeight: 50,
    alignSelf: "flex-start",
  },
  title: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },

  underInputLine: {
    fontSize: RFValue(12),
    color: "#569A59",
    fontFamily: "Bold",
    textAlign: "right",
    marginRight: RFValue(16),
    marginTop: RFValue(22),
  },
});
