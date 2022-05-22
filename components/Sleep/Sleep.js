import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements';
import { SafeAreaView, StatusBar, Platform, ScrollView,TouchableOpacity} from 'react-native'


function Sleep(){ 
    return (
    <View>       
        <Header
            centerComponent={{text: "Sleep Timer",style : {color: '#fff',fontSize:20,fontWeight: '500' }  }}
            leftComponent = {
                <TouchableOpacity>
                <Ionicons style={styles.headerLeft} name= "ios-chevron-back" size={28} color="white" />
                </TouchableOpacity>
            }
          ></Header>
        <View >
            <TouchableOpacity>
                <Text>

                </Text>
            </TouchableOpacity>
        </View>
    </View>
    );

}

const styles = StyleSheet.create({
    LinearGradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      top: StatusBar.currentHeight,
  
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
      
    }
  });

export default Sleep;
