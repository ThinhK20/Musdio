import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./components/Redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Setting, SettingGeneral, HomeScreen, Profile, Playlist, Login, LoadingSongs, NowPlaying} from './components/'
import Albums from "./components/Albums/Albums"
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import TopTreding from "./components/TopTrending/TopTreding";
import Sleep from "./components/Sleep/Sleep";
import ChangePassword from "./components/Setting/ChangePassword";
import { SignUp,FormInput } from "./components/SignUp";
export default function App() {
  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Footer" component={Footer} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="SettingGeneral" component={SettingGeneral} />
          <Stack.Screen name="NowPlaying" component={NowPlaying} initialParams={{ playID: '2Q4ITzM0aLxpwZugrHKC' }}/>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Playlist" component={Playlist} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LoadingSongs" component={LoadingSongs} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="TopTreding" component={TopTreding} />
          <Stack.Screen name="Sleep" component={Sleep}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Albums" component={Albums} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="FormInput" component={FormInput} initialParams={{ playID: '9XOr8Yi7cWYLnSDwfSJibjExJ7d2' }} />

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: "center",
  },
  footer: {
    flex: 8,
  },
  content: {
    flex: 92,
  },
});