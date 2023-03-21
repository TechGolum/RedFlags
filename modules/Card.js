import React, {useState} from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';

export default function Card(props)
{
    let time = 2000

    function animate()
    {
        const x = Animated.timing(props.rotateX, {
            toValue: 180,
            duration: time,
            useNativeDriver: true,
            easing: Easing.linear
        })

        Animated.parallel([
            x
        ]).start(() => {
            animate()
        })
    }

    let rotate = {
        transform:[
            {rotateX: props.rotateX.interpolate({
                inputRange:[0, 180],
                outputRange:["0deg", "180deg"],
            })}
        ]
    }

    return(
        <Animated.View 
            style = {[styles.card, {backgroundColor : props.flag ? 'red' : '#3de090'}, rotate]} 
            onTouchEnd = {() => {animate(); setTimeout(() => {props.onAnimationEnded(); props.setAnim(true)}, time / 2); }}>
            <Text 
                style = {[styles.text, {color: props.flag ? 'white' : 'white', transform : props.anim ? [{rotateX : '180deg'}] : [{rotateX : '0deg'}]}]}>
                    {props.text}
            </Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card : {
        width: 300,
        height: 150,
        borderRadius: 30,
        backgroundColor: 'red',
        margin: 10,
        justifyContent : 'center',
        alignItems: 'center',
        elevation : 0
    },
    text: {
        fontSize : 20,
        margin: 15,
        transform: [{rotateX: '0deg'}]
    }
})