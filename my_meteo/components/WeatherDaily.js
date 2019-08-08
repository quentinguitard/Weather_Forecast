import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableHighlight
} from "react-native";
import HourlyWeather from "./HourlyWeather";

export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minTemp: false,
            maxTemp: false,
            date: "",
            weatherDesc: ""
        };
        this.displayHourlyOnClick = this.displayHourlyOnClick.bind(this);
    }
    componentWillMount() {
        this.formatDate(this.props.data[0].dt);
        this.getTemperature(this.props.data);
        this.getWeatherDescription(this.props.data[0].weather[0].description);
        console.log(this.props.data[0].main, this.props.data[0].dt_txt);
    }

    getWeatherDescription = data => {
        this.setState({
            weatherDesc: data
        });
    };

    getTemperature = data => {
        let minTempData = data[0].main.temp_min;
        let maxTempData = data[0].main.temp_max;
        data.forEach(element => {
            minTempData =
                element.main.temp_min < minTempData
                    ? element.main.temp_min
                    : minTempData;
            maxTempData =
                element.main.temp_max > maxTempData
                    ? element.main.temp_min
                    : maxTempData;
        });
        minTempData = Math.round(minTempData);
        maxTempData = Math.round(maxTempData);
        this.setState({
            minTemp: minTempData,
            maxTemp: maxTempData
        });
        this.props.loaded;
    };

    formatDate = inputDate => {
        let today = new Date();
        let date = new Date(inputDate * 1000);
        formatTodayDate =
            today.getDate() +
            "/" +
            today.getMonth() +
            "/" +
            today.getFullYear();
        formatTomorrowData =
            today.getDate() +
            1 +
            "/" +
            today.getMonth() +
            "/" +
            today.getFullYear();
        formatDate =
            date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        if (formatDate === formatTodayDate) {
            this.setState({
                date: "Aujourd'hui"
            });
        } else if (formatTomorrowData === formatDate) {
            this.setState({
                date: "Demain"
            });
        } else {
            this.setState({
                date: formatDate
            });
        }
    };

    displayHourlyOnClick = () => {
        return (
            <View>
                <Text> YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO </Text>
            </View>
        );
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <View
                    style={{
                        marginLeft: 10,
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "left"
                    }}
                >
                    <TouchableHighlight onPress={this.displayHourlyOnClick}>
                        <Text style={{ fontSize: 18 }}>{this.state.date}</Text>
                    </TouchableHighlight>
                    <Text>{this.state.weatherDesc}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                    <Text
                        style={{
                            margin: 5,
                            color: "rgb(0, 160, 217)",
                            textAlign: "right"
                        }}
                    >
                        {this.state.minTemp + "°C "}
                    </Text>
                    <Text
                        style={{
                            margin: 5,
                            color: "red",
                            textAlign: "right"
                        }}
                    >
                        {this.state.maxTemp + "°C"}
                    </Text>
                </View>
            </View>
        );
    }
}
