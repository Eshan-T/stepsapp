import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AppleHealthKit from 'rn-apple-healthkit';


// get permissions
let options = {
  permissions: {
      read: ["StepCount"],
      write: ["StepCount"]
  }
};

AppleHealthKit.initHealthKit(options, (err, results) => {
  if (err) {
      console.log("error initializing Healthkit: ", err);
      return;
  }
  console.log("all good: ");


});

let stepsWrite = {
  value: 100,
  startDate: (new Date(2020,10,2,6,0,0)).toISOString(),
  endDate: (new Date(2020,10,2,6,30,0)).toISOString()
};

AppleHealthKit.saveSteps(stepsWrite, (err, res) => {
  if (err) {
    console.log("error write");

    return;
  }
  console.log("all good: step written");

});

let d = new Date(2020,10,2);
let options2 = {
    date: d.toISOString()
};

AppleHealthKit.getStepCount(options2, (err, results) => {
  if (err) {
    console.log("error read");

      return;
  }

  console.log("all good: steps read");

  console.log(results)
});


const App = () => {
  return (
   <View>
     <Text>
       hello
     </Text>
   </View>
  )};

export default App;
