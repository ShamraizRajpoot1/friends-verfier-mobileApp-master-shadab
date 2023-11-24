import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { RFValue } from 'react-native-responsive-fontsize';
const slides = [
  {
    key: 'screen1',
    title: 'Your Safety is Our\nPriority',
    text: 'Enhance your security by accessing billions of\nrecords, allowing you to conduct private\nbackground checks on individuals from any\nwhere.',
    image: require('../../assets/icons/onboardingA.png'),
    backgroundColor: '#F4F4F4',
  },
  {
    key: 'screen2',
    title: 'Friend or Foe\nYou Need to Know',
    text: 'Friend Verifier enables you to identify potential\nrisks to you and your loved ones. You can opt\nout from our databases if you have no criminal\nhistory',
    image: require('../../assets/icons/onboardingb.png'),
    backgroundColor: '#F4F4F4',
  },
  {
    key: 'screen3',
    title: 'Free Credit Just For\nSigning Up',
    text: 'Sign up for a free background check with no\nstrings attached. Pay $4.99 per background\ncheck or subscribe for $6.99 a month for 25\nchecks, thats around 27 cents per check!',
    image: require('../../assets/icons/onboardingC.png'),
    backgroundColor: '#F4F4F4',
  },
];

const IntroSlider = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    // Handle the completion of the intro slides, e.g., navigate to the main screen
    navigation.navigate('LoginScreen');
  };

  return (
    <AppIntroSlider
    renderItem={renderItem}
    data={slides}
    onDone={onDone}
    showSkipButton={true}
    onSkip={onDone}
    showPrevButton={false}
    renderNextButton={() => (
      <Text style={[styles.buttonText,{fontWeight: 'bold'}]}>Next</Text>
    )}
    renderSkipButton={() => (
      <Text style={styles.buttonText}>Skip</Text>
    )}
    activeDotStyle={{ backgroundColor: '#315A9C' }}
    dotStyle={{ backgroundColor: 'lightblue' }}
    renderDoneButton={() => (
      <TouchableOpacity onPress={onDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    )}
  />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#305A9B',
    fontSize: RFValue(14),
    marginTop: RFValue(8),
    paddingHorizontal:RFValue(10)
    //fontWeight: 'bold',
  },
  doneButtonText: {
    color: '#305A9B',
    fontSize: RFValue(14),
    marginTop: RFValue(8),
    paddingHorizontal:RFValue(10),
    fontWeight: 'bold',
  },
  image: {
    width: RFValue(270),
    height: RFValue(270),
    marginBottom:RFValue(50),
    resizeMode: 'contain',
  },
  title: {
    fontSize: RFValue(30),
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign:'center'
  },
  text: {
    fontSize: RFValue(12),
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    marginHorizontal: 40,
    textAlign:'center',
    lineHeight:RFValue(25)
  },
});

export default IntroSlider;
