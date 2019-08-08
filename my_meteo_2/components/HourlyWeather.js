import React, { Component } from "react";
import {
    Text,
    View,
    ImageBackground,
    ScrollView,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import Owfont from "../Owfont";

export default class HourlyWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            dataLoaded: false
        };
    }

    static navigationOptions = {
        headerStyle: {
            height: 0,
            backgroundColor: "transparent"
        }
    };

    componentWillMount() {
        let data = this.props.navigation.state.params.data;
        data.forEach(element => {
            let currentHour = new Date(element.dt * 1000);
            let time = currentHour.getHours() + " h";
            element.time = time;
        });

        this.setState({
            data: data,
            dataLoaded: true
        });
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
                <ImageBackground
                    source={require("../assets/backgroundimg.jpg")}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        backgroundColor: "rgba(255,255,255,0.1)"
                    }}
                >
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                height: 100
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
                                {this.props.navigation.state.params.city}{" "}
                            </Text>
                        </View>
                        {this.state.data.map((days, key) => {
                            return (
                                <View key={key} style={styles.wrapper}>
                                    <View
                                        style={{
                                            marginLeft: 10,
                                            flex: 1,
                                            justifyContent: "space-around",
                                            alignItems: "left",
                                            marginBottom: 10,
                                            paddingLeft: 20,
                                            marginTop: 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                color: "rgb(255,255,255)",
                                                fontFamily: "Nunito-Bold",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            {days.time}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "rgb(255,255,255)",
                                                fontSize: 12,
                                                fontFamily: "Nunito-Light",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            {days.weather[0].description}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "flex-end",
                                            marginTop: 15
                                        }}
                                    >
                                        <Owfont
                                            name={"-" + days.weather[0].id}
                                            size={50}
                                            color="white"
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "space-around"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                margin: 5,
                                                fontSize: 30,
                                                color: "white",
                                                textAlign: "right",
                                                fontFamily: "Nunito-Bold"
                                            }}
                                        >
                                            {Math.round(days.main.temp_max) +
                                                "°"}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </ImageBackground>

                {/* {this.state.isLoading && <View style={{ flex: 1 }} />} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderColor: "white",
        borderTopWidth: 0.5,
        height: 100
    },
    scroll: {}
});
