import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  
} from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import AppleHealthKit from 'rn-apple-healthkit';


const TodayStepsCircular = (props) => {
   


    console.log("how many times")
    var progressNum = Math.floor(props.steps/100)
    return (
     <View style= {styles.container}>
       <AnimatedCircularProgress
    size={120}
    width={15}
    fill={progressNum}
    tintColor="#00e0ff"
    onAnimationComplete={() => console.log(props.steps)}
    backgroundColor="#3d5875" >

{
    () => (
      <Text>
       dkkd
      </Text>
    )
  }
    </AnimatedCircularProgress>

                   
    


    <View style={styles.dayFill}>
                        
                        <Text style={styles.steps}>
                            Steps : {props.steps}
                        </Text>
                        <Text style={styles.goal}>
                            Goal: 10000
                        </Text>
                    </View>
  
     </View>
    )};
                








    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: "center",
            backgroundColor: 'transparent'
        },
        weekFill: {
            position: 'absolute',
            top: 5,
            left: 5,
            alignItems: 'center',
            justifyContent: 'center',
            width: 30,
            height: 30
        },
        dayFill: {
            backgroundColor: 'transparent',
            // position: 'absolute',
            // top: 10,
            // left: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 250,
            height: 250
        },
        day: {
            color: 'blue',
            fontWeight: '800'
        },
        steps: {
            backgroundColor: 'transparent',
            fontSize: 30,
            textAlign: 'center',
            color: 'blue'
        },
        goal: {
            color: 'blue'
        }
    });

  export default TodayStepsCircular;