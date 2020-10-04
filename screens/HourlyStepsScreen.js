import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import AppleHealthKit from 'rn-apple-healthkit';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BarChart,
} from "react-native-chart-kit";

const HourlyStepsScreen = () => {
  var TodaysDate = new Date()
  TodaysDate.setHours(0, 0, 0, 0);

  const [date, setDate] = useState(TodaysDate);
  const [items, setItems] = useState([]);
  const [steps, setsteps] = useState(0);

  let dateForReadQuery = {
    date: date.toISOString()
  };

  const readData = () => {

    AppleHealthKit.getStepCountHourly(dateForReadQuery, (err, results) => {
      if (err) {
        console.log("error read");
        return;
      }

      var arr = []
      var loopcounter = 0
      if (results.value.length > 23) {
        loopcounter = 24
      }
      else {
        loopcounter = results.value.length
      }

      var todaysSteps = 0
      for (let i = 0; i < loopcounter; i++) {
        todaysSteps = todaysSteps + parseInt(results.value[i][0])
        arr[i] = parseInt(results.value[i][0])
      }
      setItems(arr)
      setsteps(todaysSteps)

    });
  }


  useEffect(() => {
    readData();
  }, [date])


  const reduceDate = () => {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() - 1)
    let prevDate = copy
    setDate(prevDate)
  }

  const addDate = () => {
    const copy2 = new Date(Number(date))
    copy2.setDate(date.getDate() + 1)
    let prevDate = copy2
    setDate(prevDate)
  }



  return (
    <View >

      <View style={styles.container}>
        <Icon.Button
          name="caret-back"
          backgroundColor="#F3F3F3"
          color="#000000"
          onPress={reduceDate}>
        </Icon.Button>

        <Text>{date.toLocaleDateString()}</Text>

        <Icon.Button
          name="caret-forward"
          backgroundColor="#F3F3F3"
          color="#000000"

          onPress={addDate}>
        </Icon.Button>


      </View>
      <BarChart
        data={{
          labels: ["00", "6AM", "12PM", "6PM", "12AM"],
          datasets: [
            {
              data: items
            }
          ]
        }}
        width={400} 
        height={220}
        yAxisLabel=""

        yAxisSuffix=""

        yAxisInterval={10} 
        chartConfig={{
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          fillShadowGradientOpacity: 1,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(80, 52, 211, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          barPercentage: 0.2,
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

      <View style={styles.bottomview}>

        <View style={styles.insidebottomview}>

          <Icon2 name="shoe-print" type="ionicon" color="#5034D3" size={40} style={styles.textinsidebottomview} />
          <Text style={styles.textinsidebottomview}>Total Steps</Text>
          <Text style={styles.textinsidebottomview}>{steps}</Text>

        </View>

        <View style={styles.insidebottomview}>

          <Icon2 name="bullseye-arrow" type="ionicon" color="#5034D3" size={40} style={styles.textinsidebottomview} />
          <Text style={styles.textinsidebottomview}>Your daily goal</Text>
          <Text style={styles.textinsidebottomview}>10000</Text>

        </View>

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    backgroundColor: 'transparent'
  },
  bottomview: {
    flexDirection: 'row',
  },
  insidebottomview: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    height: 100
  },
  textinsidebottomview: {
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: 7,
  }
});


export default HourlyStepsScreen;
