import React, {useState, useEffect} from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
   Button
} from 'react-native';

import AppleHealthKit from 'rn-apple-healthkit';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import TodayStepsCircular from './Components/TodayStepsCircular'

import {postCall} from './actions/SyncButton'

import AppNavigator from './navigation/AppNavigator'



let options = {
  permissions: {
      read: ["StepCount"],
      write: ["StepCount"]
  }
}

AppleHealthKit.initHealthKit(options, (err, results) => {
  if (err) {
      console.log("error initializing Healthkit: ", err);

      const createTwoButtonAlert = () =>
      Alert.alert(
        "Alert",
        "Health permissions are required for this app to function. Please go to the health center and manually enable them.",
        [
        //   {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //     style: "cancel"
        //   },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return;
  }
  console.log("all good: ");


});

const App = () => {
 
  return (
   
<AppNavigator/>
  )
};

  

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
  })

export default App;
