import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import {

  StyleSheet,
} from 'react-native';

import AppleHealthKit from 'rn-apple-healthkit';

import AppNavigator from './navigation/AppNavigator'



let permissionParameters = {
  permissions: {
    read: ["StepCount"],
    write: ["StepCount"]
  }
}

AppleHealthKit.initHealthKit(permissionParameters, (err, results) => {
  if (err) {
    console.log("error initializing Healthkit: ", err);

    const createTwoButtonAlert = () =>
      Alert.alert(
        "Alert",
        "Health permissions are required for this app to function. Please go to the health center and manually enable them.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    return;
  }
});

const App = () => {
  return (
    <AppNavigator />
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
