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
    var d = new Date()
    const [date, setDate] = useState(d);
    const [items, setItems] = useState([]);
    
    

    let options2 = {
        date: date.toISOString()
    };
    
    const readData = () => {
      AppleHealthKit.getStepCountHourly(options2, (err, results) => {
        if (err) {
          console.log("error read");
      
            return;
        }
      
        console.log("all good: steps read");

        console.log(results)

        var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        for (let i = 0; i < results.value.length; i++) {
          console.log("arf")
          arr[i] = parseInt(results.value[i][0])    
        }
        setItems(arr)     
           console.log("final check")

        console.log(items)
      });
    }
  
    

    useEffect(() => {
  
      readData();
    }, [date])


    const reduceDate = () =>
    {
      const copy = new Date(Number(date))
      copy.setDate(date.getDate() - 1)

      let prevDate = copy
      console.log(copy)
      setDate(prevDate)
    }

    const addDate = () =>
    {
      const copy2 = new Date(Number(date))
      copy2.setDate(date.getDate() + 1)

      let prevDate = copy2
      console.log(copy2)
      setDate(prevDate)
    

    }

  


      return (
       <View >

         <View style={styles.container}>
           <Button title="<" onPress={reduceDate}/>
           <Text>Today</Text>
           <Button title=">" onPress={addDate}/>
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
    width={400} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      barPercentage: 0.4,
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
