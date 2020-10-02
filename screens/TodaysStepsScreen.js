import React, {useState, useEffect, Touchable} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
   Button, 
   ActivityIndicator,
   Alert

} from 'react-native';



import AppleHealthKit from 'rn-apple-healthkit';

import TodayStepsCircular from '../Components/TodayStepsCircular'

import {postCall} from '../actions/SyncButton'
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

//import HourlySteps from  './screen/HourlySteps'



  

const TodaysStepsScreen = (props) => {
 

    const [steps, setSteps] = useState('check');
    const [visible, setvisible] = useState(false);

  
    
    let d = new Date(2020,10,2);
    let options2 = {
        date: d.toISOString()
    };
    
    const readData = async() => {
      AppleHealthKit.getStepCount(options2, (err, results) => {
        if (err) {
          console.log("error read");
      
            return;
        }
      
        console.log("all good: steps read");
        console.log(results)
        setSteps(results.value)
        console.log(results.value)
      });
    }
  
    const writedata = async() => {
  
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
  
        readData()
        console.log("all good: step written");
      
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
                  "stepsCount":1000,
                  "dayTimestamp": 1601596800000,
              }]
    
            }),
          })
        .then((response) => response.json())
        .then((responseJson) => {

          console.log(responseJson.message)
          setvisible(false)

          if (responseJson.message === "failure")
          {
            createTwoButtonAlert()

          }
          else{

            //
          }
    
        })
        .catch((error) => {
          console.error(error);
        });
    
        
    }


    readData(() => {
  
      fetchUser();
    }, [steps])

        const createTwoButtonAlert = () =>
          Alert.alert(
            "Alert Title",
            "My Alert Msg",
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
    
    return (
      <View style={styles.container}>
        

       <TouchableWithoutFeedback onPress = {() => { props.navigation.navigate({routeName:'hoursteps'})}}>

       <TodayStepsCircular steps={steps} />

       </TouchableWithoutFeedback>

  
       <Button title="Post to server" onPress={postCall} />
       <Button title="Write dummy data" onPress={writedata}/>
  
       <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
            { visible && <ActivityIndicator size="large" color="red" /> }
            </View>
       </View>

       
  
    )};
  
  
    const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent'
      },
    })
  
  export default TodaysStepsScreen;
  