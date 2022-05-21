import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NowPlaying from './components/NowPlaying';
import Constants from 'expo-constants';
import ChatScreen from './components/Firebase';
import Setting from './components/Setting/Setting';
import Sleep from './components/Sleep/sleep';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      {/* <NowPlaying /> */}
      {/* <Setting></Setting>  */}
      {/* <Sleep></Sleep> */}
      <Footer></Footer>
    {/* <ChatScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});