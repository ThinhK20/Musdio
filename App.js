import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NowPlaying from "./components/NowPlaying";
import ChatScreen from "./components/Firebase";
import Footer from "./components/Footer/Footer";
import Sleep from "./components/Sleep/Sleep";
import { Provider } from "react-redux";
import store from "./components/Redux/store";
import HomeScreen from "./components/Main/home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Albums from "./components/Albums/Albums";
import Profile from "./components/Profile/index";
import Playlist from "./components/Playlist/Playlist";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
          {/* <View style={styles.container}>
            <StatusBar style="inverted" />
          //   <View style={styles.content}> */}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Home" component={HomeScreen} />
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
