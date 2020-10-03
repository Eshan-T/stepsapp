import React, {useState, useEffect} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import TodaysStepsScreen from '../screens/TodaysStepsScreen';
import HourlySteps from '../screens/HourlyStepsScreen';
import { createAppContainer } from 'react-navigation';



const AppNavigator = createStackNavigator({
    Today: TodaysStepsScreen,
    Details: HourlySteps

  })

  export default createAppContainer(AppNavigator)
  