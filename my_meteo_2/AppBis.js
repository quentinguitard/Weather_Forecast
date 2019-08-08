import { Font } from "expo";
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import WelcomeScreen from "./components/WelcomeScreen";

export default class AppBis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        };
    }

    static navigationOptions = {
        title: "Home",
        headerStyle: {
            height: 0
        }
    };

    async componentDidMount() {
        await Font.loadAsync({
            Owfont: require("./assets/owfont-regular.ttf"),
            "Nunito-Bold": require("./assets/Nunito-Bold.ttf"),
            "Nunito-Light": require("./assets/Nunito-Light.ttf"),
            "Nunito-Regular": require("./assets/Nunito-Regular.ttf")
        });
        this.setState({
            fontLoaded: true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.fontLoaded ? (
                    <WelcomeScreen navigation={this.props.navigation} />
                ) : (
                    <ActivityIndicator size="large" />
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
    }
});
