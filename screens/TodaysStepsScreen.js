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

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';




import AppleHealthKit from 'rn-apple-healthkit';

import TodayStepsCircular from '../Components/TodayStepsCircular'

import {postCall} from '../actions/SyncButton'
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

//import HourlySteps from  './screen/HourlySteps'



  

const TodaysStepsScreen = (props) => {
 

    const [steps, setSteps] = useState('0');
    const [visible, setvisible] = useState(false);

  
    
    let d = new Date();
    //d.setHours(1,0,0,0);

    let options2 = {
        date: d.toISOString()
    };
    
    const readData = async() => {
      AppleHealthKit.getStepCount(options2, (err, results) => {
        if (err) {
          console.log("error read");
      
            return;
        }
      
       // console.log("all good: steps read");
       // console.log(results)
        setSteps(results.value)
      });
    }
  
    const writedata = async() => {
  
       
         let num =  Math.random() * (22 - 1) + 1; 
          
          
        var start = new Date();
    start.setHours(num,0,0,0);

        var end = new Date();
        end.setHours(num,30,0,0);

      let stepsWrite = {
        value: 100,
        startDate: start.toISOString(),
        endDate: end.toISOString()
      }; 

      
      AppleHealthKit.saveSteps(stepsWrite, (err, res) => {
        if (err) {
          console.log("error write");
      
          return;
        }
  
        console.log(stepsWrite)
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
                  "stepsCount":1000,
                  "dayTimestamp": 1601596800000,
              }]
    
            }),
          })
        .then((response) => response.json())
        .then((responseJson) => {

          setvisible(false)

          
            createTwoButtonAlert(responseJson.message )

    
        })
        .catch((error) => {
          console.error(error);
        });
    
        
    }


    // readData(() => {
  
    //   fetchUser();
    // }, [steps])

    useEffect(() => {
  
        readData();
      }, [steps])

        const createTwoButtonAlert = (status) =>{
            var text = ""
            if (status === "failure")
            {
                text = "Sync Failed, please try again later"
            }
            else{
                text = "Success!"
            }
          Alert.alert(
            "Alert ",
                text,
            [
         
             { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
            
    return (
      <View style={styles.container} >
        
       <TouchableWithoutFeedback onPress = {() => { props.navigation.navigate({routeName:'Details'})}}>


       <TodayStepsCircular steps={parseInt(steps)} />

       </TouchableWithoutFeedback>

  
       <Icon.Button name="server" onPress={postCall} backgroundColor="#5034D3"> 
            Post to server
         </Icon.Button>
         <Text></Text>
         <Icon2.Button name="shoe-prints" onPress={writedata} solid backgroundColor="#5034D3">
         Write dummy data
         </Icon2.Button>
  
       <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
            { visible && <ActivityIndicator size="large" color="#5034D3" /> }
            </View>
       </View>

       
  
    )};
  
  
    const styles = StyleSheet.create({
      container: {
        flex:1,
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
            left:30
      },
      twobutton:{
        color:"#5034D3"
      }
    })
  
  export default TodaysStepsScreen;
  