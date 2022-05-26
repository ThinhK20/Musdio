import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./components/Redux/store";

import Setting from './components/Setting/Setting'
import SettingGeneral from './components/Setting/SettingGeneral'

import Profile from './components/Profile/index'
import HomeScreen from './components/Main/home'
import Playlist from './components/Playlist/Playlist'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginFacebook from "./components/LoginWithFacebook";
export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
          {/* <View style={styles.container}>
            <StatusBar style="inverted" />
          //   <View style={styles.content}> */}
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="SettingGeneral" component={SettingGeneral} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Playlist" component={Playlist} />

          
          {/* <Profile /> */}
          {/* </View> */}
          {/* </View> */}

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
