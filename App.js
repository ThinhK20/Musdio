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
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <View style={styles.content}>
        {/* <NowPlaying /> */}
        <Sleep/>
      </View>
      <View  style={styles.footer}>
         <Footer></Footer>
      </View>
    {/* <ChatScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    flex: 8,
  },
  content:{
    flex: 92,
  }
})




