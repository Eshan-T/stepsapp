import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const TodayStepsCircular = (props) =>
{

    var progressNum = Math.floor(props.steps / 100)
    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={120}
                width={8}
                fill={progressNum}
                tintColor="#4D32CD"
                onAnimationComplete={() => console.log(props.steps)}
                backgroundColor="#D3D3D3" >
                {
                    () => (
                        <Icon name="walk" type="ionicon" color="#5034D3" size={50} />
                    )
                }
            </AnimatedCircularProgress>

            <View style={styles.dayFill}>

                <Text style={styles.steps}>
                    {props.steps}
                </Text>
                <Text style={styles.goal}>
                    of 10,000 steps
                </Text>
            </View>

        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    dayFill: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: 250,
        height: 250
    },
    steps: {
        backgroundColor: 'transparent',
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
        fontWeight: "bold",
        position: 'absolute',
        top: 30
    },
    goal: {
        position: 'absolute',
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        top: 72,
        color: 'black',
    }
});

export default TodayStepsCircular;