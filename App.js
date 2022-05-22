import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NowPlaying from './components/NowPlaying';
import ChatScreen from './components/Firebase';
import Footer from './components/Footer/Footer'
import Sleep from './components/Sleep/Sleep';
import { Provider } from 'react-redux';
import store from './components/Redux/store';
export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <NowPlaying />
      {/* <Sleep></Sleep> */}
      {/* <Footer></Footer> */}
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
    justifyContent: 'center',
  },
});
