import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Dimensions
} from "react-native";
import WeatherDaily from "./WeatherDaily";
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

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

  componentWillReceiveProps(nextProps) {
    //request API meteo
    if (nextProps.address !== this.props.address) {
      this.getWeatherForcast(nextProps);
    }
  }

  getWeatherForcast(props) {
    var url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      props.address.city +
      "," +
      props.address.country_code +
      "&units=metric&appid=" +
      this.state.weatherApiKey + "&lang=fr";

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
          weatherDays: weatherDaysArray,
        });
        this.meteoCallBackIsLoaded();
      })
  }

  meteoCallBackIsLoaded() {
    this.setState({
      isLoading: true
    });
    this.props.isLoaded();
  }

  render() {
      //console.log(this.state.weatherDays)
    return (

      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        {this.state.isLoading && (
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{textAlign: "center", fontSize:22 }}>Vous etes à {this.props.address.city} </Text>
          </View>
          //nextDaysWeather
        )}
        {this.state.weatherDays.map((days, key) => {
            return <View key={key} style={styles.dayBloc}><WeatherDaily data={days} ></WeatherDaily></View>
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dayBloc: {
    height: 50,
    width: width,
    backgroundColor: 'rgb(217, 245, 255)',
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: 'rgb(150, 150, 150)',
  }
});
