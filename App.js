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
import Album from "./components/Albums/Albums";
import Profile from "./components/Playlist/Playlist";
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="inverted" />
        <View style={styles.content}>
           {/* <Album/> */}
           <Profile/>
          {/* <NowPlaying /> */}
          {/* <HomeScreen/> */}
          {/* <SignUp /> */}
          {/* <Login/> */}
        </View>
        {/* <View  style={styles.footer}>
         <Footer></Footer>
      </View> */}
        {/* <ChatScreen/> */}
      </View>
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
