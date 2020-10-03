import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
     Button
  } from 'react-native';

  import AppleHealthKit from 'rn-apple-healthkit';


  import {
    BarChart,
  } from "react-native-chart-kit";

    const HourlyStepsScreen = () =>
  {

    const [date, setDate] = useState('check');
    var stepsArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    let d = new Date(2020,10,2);
    let options2 = {
        date: d.toISOString()
    };
    
    const readData = async() => {

      stepsArray
      AppleHealthKit.getStepCount(options2, (err, results) => {
        if (err) {
          console.log("error read");
      
            return;
        }
      
        console.log("all good: steps read");
        console.log(results)
        //setSteps(results.value)
        console.log(results.value)
      });
    }

    readData(() => {
  
      fetchUser();
    }, [date])


      return (
       <View >

         <View style={styles.container}>
           <Button title="back"/>
           <Text>today</Text>
           <Button title="next"/>
         </View>
  <BarChart
    data={{
      labels: ["00", "6AM", "12PM", "6PM", "12AM"],
      datasets: [
        {
          data: stepsArray
        }
      ]
    }}
    width={400} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "1",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 0
    }}
  />

  
</View>
        )
  }


  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: "space-evenly",
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


  export default HourlyStepsScreen;
