import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import AppleHealthKit from 'rn-apple-healthkit';
import TodayStepsCircular from '../Components/TodayStepsCircular'
import {TouchableWithoutFeedback } from 'react-native-gesture-handler';

const TodaysStepsScreen = (props) => {

  //usestates
  const [steps, setSteps] = useState('0');
  const [visible, setvisible] = useState(false);


  let TodaysDate = new Date();
  let fetchDate = {
    date: TodaysDate.toISOString()
  };

  const readData = async () => {
    AppleHealthKit.getStepCount(fetchDate, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      setSteps(results.value)
    });
  }

  
  const writedata = async () => {

    // generate random steps 
    let num = Math.random() * (22 - 1) + 1;
    var start = new Date();
    start.setHours(num, 10, 0, 0);
    var end = new Date();
    end.setHours(num, 12, 0, 0);

    let stepsWrite = {
      value: 100,
      startDate: start.toISOString(),
      endDate: end.toISOString()
    };


    AppleHealthKit.saveSteps(stepsWrite, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      readData()
    });
  }

  const postCall = () => 
  {
    setvisible(true)
    let url = "https://api.getvisitapp.xyz/virat/eshan-test"
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        steps: [{
          "stepsCount": 1000,
          "dayTimestamp": 1601596800000,
        }]

      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setvisible(false)
        createTwoButtonAlert(responseJson.message)
      })
      .catch((error) => {
        console.error(error);
      });
  }


  useEffect(() => {

    readData();
  }, [steps])

  const createTwoButtonAlert = (status) => {
    var AlertText = ""
    if (status === "failure") {
      AlertText = "Sync Failed, please try again later"
    }
    else {
      AlertText = "Success!"
    }
    Alert.alert(
      "Alert ",
      AlertText,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container} >

      <TouchableWithoutFeedback onPress={() => { props.navigation.navigate({ routeName: 'Details' }) }}>
        <TodayStepsCircular steps={parseInt(steps)} />
      </TouchableWithoutFeedback>

      <Icon.Button name="server" onPress={postCall} backgroundColor="#5034D3">
        Post to server
      </Icon.Button>

      <Text></Text>

      <Icon2.Button name="shoe-prints" onPress={writedata} solid backgroundColor="#5034D3">
        Write dummy data
      </Icon2.Button>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
        {visible && <ActivityIndicator size="large" color="#5034D3" />}
      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  writedata: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
    left: 30
  },
  twobutton: {
    color: "#5034D3"
  }
})

export default TodaysStepsScreen;
