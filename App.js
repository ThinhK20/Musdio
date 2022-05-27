import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./components/Redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Setting, SettingGeneral, HomeScreen, Profile, Playlist, Login, LoadingSongs } from './components/'
import NowPlaying from "./components/NowPlaying/index"
import Sleep from "./components/Sleep/Sleep";
export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoadingSongs" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="SettingGeneral" component={SettingGeneral} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Playlist" component={Playlist} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LoadingSongs" component={LoadingSongs} />
          <Stack.Screen name="Sleep" component={Sleep} />
        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
  );
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
