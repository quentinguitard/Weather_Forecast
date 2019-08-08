import { createStackNavigator, createAppContainer } from "react-navigation";
import HourlyWeather from "./components/HourlyWeather";
import WeatherDaily from "./components/WeatherDaily";
import WelcomeScreen from "./components/WelcomeScreen";
import MeteoView from "./components/MeteoView";
import AppBis from "./AppBis";

const MainNavigator = createStackNavigator({
    AppBis: { screen: AppBis },
    WelcomeScreen: { screen: WelcomeScreen },
    MeteoView: { screen: MeteoView },
    WeatherDaily: { screen: WeatherDaily },
    HourlyWeather: { screen: HourlyWeather }
});

const App = createAppContainer(MainNavigator);

export default App;
