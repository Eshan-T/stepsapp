import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
   Button,
   ActivityIndicator
} from 'react-native';


export const postCall = (props) =>
{
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
      console.log(responseJson)
      props.UpdateVisbilityState()

    })
    .catch((error) => {
      console.error(error);
    });

    
}

