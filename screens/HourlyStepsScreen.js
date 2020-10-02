import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
     Button
  } from 'react-native';

  import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

    const HourlyStepsScreen = () =>
  {
      return (
       <View>
  <Text>Bezier Line Chart</Text>
  <BarChart
    data={{
      labels: ["00", "6AM", "12PM", "6PM", "12AM"],
      datasets: [
        {
          data: [
            0,
            0,
           100,
            0,
            0,
            0,
            0,
            0,
           100,
            200,
            300,
            0,
            200,
            500,
           100,
            0,
            100,
            0,
            250,
            200,
           100,
            0,
            0,
            0,
          ]
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


  export default HourlyStepsScreen;
