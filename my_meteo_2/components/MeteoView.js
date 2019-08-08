import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, Dimensions } from "react-native";
import WeatherDaily from "./WeatherDaily";
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;
import { Ionicons } from "@expo/vector-icons";

export default class MeteoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            weatherApiKey: "b312993b7e7d771af51e48e4fd5aaf0d",
            weatherDays: []
        };
        this.meteoCallBackIsLoaded.bind(this);
    }

    static navigationOptions = {
        title: "Back",
        headerStyle: {
            height: 0
        }
    };

    componentWillReceiveProps(nextProps) {
        //request API meteo
        if (nextProps.address !== this.props.address) {
            this.getWeatherForcast(nextProps);
        }
    }

    getWeatherForcast(props) {
        if (props.address.city == null) {
            props.address.city = "Paris";
        }
        var url =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            props.address.city +
            "," +
            props.address.country_code +
            "&units=metric&appid=" +
            this.state.weatherApiKey +
            "&lang=fr";

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let prevDate;
                let weatherDaysArray = [];
                let weatherDaily = [];
                data.list.forEach(element => {
                    let currentDate = element.dt_txt.split(" ");
                    if (prevDate === currentDate[0] || !prevDate) {
                        weatherDaily.push(element);
                        prevDate = currentDate[0];
                    } else {
                        weatherDaysArray.push(weatherDaily);
                        prevDate = currentDate[0];
                        weatherDaily = [];
                    }
                });
                this.setState({
                    weatherDays: weatherDaysArray
                });
                this.meteoCallBackIsLoaded();
            });
    }

    meteoCallBackIsLoaded() {
        this.setState({
            isLoading: true
        });
        this.props.isLoaded();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "stretch"
                }}
            >
                {this.state.isLoading && (
                    <View
                        style={{
                            flex: 2,
                            justifyContent: "center",
                            backgroundColor: "rgba(255,255,255,0.1)"
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 26,
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                fontFamily: "Nunito-Bold"
                            }}
                        >
                            {this.props.address.city}{" "}
                        </Text>
                    </View>
                    //nextDaysWeather
                )}
                {this.state.weatherDays.map((days, key) => {
                    return (
                        <View key={key} style={styles.dayBloc}>
                            <WeatherDaily
                                city={this.props.address.city}
                                navigation={this.props.navigation}
                                data={days}
                            />
                        </View>
                    );
                })}
                {/* {this.state.isLoading && <View style={{ flex: 1 }} />} */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    dayBloc: {
        height: 50,
        width: width,
        flex: 2,
        justifyContent: "center",
        borderTopWidth: 0.5,
        borderColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "rgba(255,255,255,0.2)"
    }
});
