import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NowPlaying from './components/NowPlaying';
import Constants from 'expo-constants';
import ChatScreen from './components/Firebase';
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      {/* <NowPlaying /> */}
      <Footer></Footer>
    {/* <ChatScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
