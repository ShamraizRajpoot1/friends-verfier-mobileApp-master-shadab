import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

const Modal1 = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onBackdropPress}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={props.onBackdropPress}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={[styles.row]}>
            <Text style={styles.heading}>Bulk Sex Offender Scan</Text>
            <Text style={styles.texta}>Depending on your saved contacts{"\n"}
quantity, this might take a little time.{"\n"}
We'll inform you once it's done.</Text>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={props.onPress}
            >
              <Text style={[styles.text]}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Modal1;

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  heading: {
    marginTop:RFValue(16),
    textAlign: "center",
    fontSize: RFValue(16),
    fontFamily: "SemiBold",
  },
  don: {
    width: RFValue(20),
    height: RFValue(20),
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    borderRadius: RFValue(12),
    height: RFValue(140),
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  privatetext: {
    textAlign: "center",
  },
  row: {
    width: "100%",
  },
  textContainer: {
   marginTop:RFValue(10),
    width: "100%",
    height: RFValue(40),
    justifyContent:'center',
    alignItems: "center",
    marginBottom: RFValue(10),
    //borderRadius: RFValue(12),
    borderTopWidth: RFValue(0.5),
    borderColor:'rgba(0,0,0,0.3)'
  },
  texta:{
 textAlign:'center',
 fontSize:RFValue(12),
 marginTop:RFValue(5),
 lineHeight:RFValue(16)
  },
  text: {
    //marginLeft: RFValue(20),
    fontSize: RFValue(16),
    //fontFamily: "SemiBold",
    color: "#007AFE",
  },
});
