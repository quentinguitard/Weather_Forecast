import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import HourlyWeather from "./HourlyWeather";
import Owfont from "../Owfont";

export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minTemp: false,
            maxTemp: false,
            date: "",
            weatherDesc: ""
        };
    }
    componentWillMount() {
        this.formatDate(this.props.data[0].dt);
        this.getTemperature(this.props.data);
        this.getWeatherDescription(this.props.data[0].weather[0].description);
        this.getIdIcon(this.props.data[0].weather[0].id);
    }

    getWeatherDescription = data => {
        this.setState({
            weatherDesc: data
        });
    };

    getIdIcon = data => {
        this.setState({
            iconId: data
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate("HourlyWeather", {
                            data: this.props.data,
                            city: this.props.city
                        });
                    }}
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: "100%",
                        width: "100%"
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
                        <Text
                            style={{
                                fontSize: 14,
                                color: "rgb(255,255,255)",
                                fontFamily: "Nunito-Bold",
                                textTransform: "uppercase"
                            }}
                        >
                            {this.state.date}
                        </Text>
                        <Text
                            style={{
                                color: "rgb(255,255,255)",
                                fontSize: 12,
                                fontFamily: "Nunito-Light",
                                textTransform: "uppercase"
                            }}
                        >
                            {this.state.weatherDesc}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-end"
                        }}
                    >
                        <Owfont
                            name={"-" + this.state.iconId}
                            size={50}
                            color="white"
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "space-around" }}>
                        <Text
                            style={{
                                margin: 5,
                                color: "blue",
                                textAlign: "right",
                                fontFamily: "Nunito-Bold"
                            }}
                        >
                            {this.state.minTemp + "°C "}

                            <Owfont name="-903" size={18} />
                        </Text>
                        <Text
                            style={{
                                margin: 5,
                                color: "red",
                                textAlign: "right"
                            }}
                        >
                            {this.state.maxTemp + "°C "}
                            <Owfont name="-904" size={18} />
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
