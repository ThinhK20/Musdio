import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { setSongs } from "../Redux/musicSlider";
import { useDispatch } from "react-redux";
import { SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
function Setting({ navigation }) {
  const [user, setUser] = useState([]);
  const [isLoadingUser, setisLoadingUser] = useState(true);
  const getUsers = async () => {
    try {
      const response = await fetch('https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/SaM1QW1nc2XwTIHAY5Cx');
      const json = await response.json().then(data => {
        setUser(data.data);
      })
    } catch (error) {
      console.error(error);
    } finally {
      setisLoadingUser(false);
    }
  }
  useEffect(() => {
    if (user.length == 0) {
      getUsers();
    }
  }, []);
  return (


    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Ionicons style={styles.iconHeader} name="ios-chevron-back" size={28} color="white" />
            <Text style={styles.textHeader} >Setting</Text>
          </View>
          <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75 }} />
          <View style={styles.body}>
            <View style={styles.basicInfo}>
              <View style={styles.avatar}>
                <Image
                  style={{ height: '100%', width: '100%', borderRadius: 100 }}
                  source={{ uri: user.uri }} />
              </View>
              <View style={styles.name}>
                <Text style={{ color: 'white', fontWeight: "bold", fontSize: 28 }}> {user.username}</Text>
              </View>
            </View>
            <View style={styles.option}>
              <View style={styles.formOption}
                onStartShouldSetResponder={() => {
                  navigation.navigate('Profile')
                  console.log('change')
                }}
              >
                <Feather name="tool" size={24} color="white" style={{ left: distance.icon }}
                />
                <Text style={{
                  color: 'white',
                  fontSize: 25,
                  fontWeight: '500',
                  left: distance.icon + 30,
                }}> Profile </Text>
              </View>
        
              <View style={styles.formOption}>
                <Feather name="sun" size={24} color="white" style={{ left: distance.icon }} />
                <Text style={{
                  color: 'white',
                  fontSize: 25,
                  fontWeight: '500',
                  left: distance.icon + 30,
                }}> Light Mode </Text>
              </View>
              <View style={styles.formOption}>
                <FontAwesome5 name="users" size={24} color="white" style={{ left: distance.icon }} />
                <Text style={{
                  color: 'white',
                  fontSize: 25,
                  fontWeight: '500',
                  left: distance.icon + 30,
                }}> About Us </Text>
              </View>
              <View style={styles.formOption}>
              <Feather name="tool" size={24} color="white" style={{ left: distance.icon }}
                />
                <Text style={{
                  color: 'white',
                  fontSize: 25,
                  fontWeight: '500',
                  left: distance.icon + 30,
                }}> Change Password </Text>
              </View>
              <View style={styles.formOption}>
                <MaterialCommunityIcons name="logout" size={24} color="white" style={{ left: distance.icon }} />
                <Text style={{
                  color: 'white',
                  fontSize: 25,
                  fontWeight: '500',
                  left: distance.icon + 30,
                }}> Log Out </Text>
              </View>
            </View>
          </View>
        </ScrollView>

      </View>
    </LinearGradient>


  );
}

let distance = {
  topSB: StatusBar.currentHeight,
  header: 25,
  icon: 30
};

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,

  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  textHeader: {

    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconHeader: {
    width: '42%',
  },
  body: {
    flex: 1,

  },
  basicInfo: {
    flex: 1,
    flexDirection: 'row',

    marginBottom: 10,
    marginTop: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    backgroundColor: 'red',
    borderRadius: 100,
    left: '10%'
  },
  name: {
    left: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    flex: 1,
    paddingHorizontal: 20,
    top: 10,
    marginBottom: 10,
  },
  formOption: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 29,
    backgroundColor: '#201E21',
    borderRadius: 14,
  },
  cdImage: {
    width: '20%',
    height: '150%',
    borderRadius: 100,
  },
});




export default Setting;