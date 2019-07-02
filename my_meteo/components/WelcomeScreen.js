import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import MeteoView from "./MeteoView";
import { CirclesLoader, TextLoader } from "react-native-indicator";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      apiKey: "108ec39d5f0e4a8098869ccb691a8a57",
      address: {
        country: null,
        city: null,
        postcode: null,
        street: null,
        number: null,
        country_code: null
      },
      isLoaded: false
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(info => {
      let url =
        "https://api.opencagedata.com/geocode/v1/json?q=" +
        info.coords.latitude +
        "+" +
        info.coords.longitude +
        "&key=" +
        this.state.apiKey;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({
            address: {
              country: data.results[0].components.country,
              city: data.results[0].components.state_district,
              postcode: data.results[0].components.postcode,
              street: data.results[0].components.street,
              number: data.results[0].components.house_number,
              country_code: data.results[0].components.country_code
            },
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
          });
        });
    });
  }

  onPress() {
    Alert.alert(this.state);
  }

  meteoCallBackIsLoaded() {
    this.setState({
      isLoaded: true
    });
  }

  render() {
    return (
      <View>
        <MeteoView
          address={this.state.address}
          isLoaded={this.meteoCallBackIsLoaded.bind(this)}
        />
        {!this.state.isLoaded && (
          <View style={styles.container}>
            <View style={styles.circleLoader}>
              <CirclesLoader size={80} dotRadius={18} />
            </View>
            <TextLoader text="Nous cherchons votre possition" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  circleLoader: {
    paddingVertical: 40
  }
});
