import React, {useState, useEffect} from 'react';
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
import { color } from 'react-native-reanimated';

    const HourlyStepsScreen = () =>
  {
    var d = new Date()
    d.setHours(0,0,0,0);
   

    const [date, setDate] = useState(d);
    const [items, setItems] = useState([]);
    const [steps,setsteps] =  useState(0);

    var todaysSteps = 0


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
        var loopcounter = 0
        if (results.value.length > 23)
        {
          loopcounter = 24
        }
        else{
          loopcounter = results.value.length

        }
        for (let i = 0; i < loopcounter; i++) {
          todaysSteps = todaysSteps + parseInt(results.value[i][0]) 
          arr[i] = parseInt(results.value[i][0])    
        }
        setItems(arr)     
        setsteps(todaysSteps)
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
    width={400} // from react-native
    height={220}
    yAxisLabel=""
    
    yAxisSuffix=""
  
    yAxisInterval={10} // optional, defaults to 1
    chartConfig={{
      //backgroundColor: "#00000",
      backgroundGradientFrom: "#FFFFFF",
       backgroundGradientTo: "#FFFFFF",
       fillShadowGradientOpacity:1,
      
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

    <Icon2 name="shoe-print" type="ionicon" color="#5034D3" size={40} style={styles.textinsidebottomview}/>

    <Text style={styles.textinsidebottomview}>Total Steps</Text>
    <Text style={styles.textinsidebottomview}>{steps}</Text>

    </View>
    <View style={styles.insidebottomview}>
    <Icon2 name="bullseye-arrow" type="ionicon" color="#5034D3" size={40} style={styles.textinsidebottomview}/>
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
    },
    bottomview:{
      flexDirection: 'row',
    },
    insidebottomview:{
      flex: 1,
      justifyContent:"center",
      alignContent:"center",
      height:100
    },
    textinsidebottomview:{
      flexDirection:'column',
      textAlign:'center',
      paddingTop:7,


    }
});


  export default HourlyStepsScreen;
