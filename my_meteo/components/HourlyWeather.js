import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, Dimensions } from "react-native";

export default class HourlyWeather extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        //request API meteo
    }

    render() {
        //console.log(this.state.weatherDays)
        return (
            <View>
                <Text>Hello WORLD !! bien ?</Text>
            </View>
        );
    }
}
