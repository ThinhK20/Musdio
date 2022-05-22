import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { SafeAreaView, StatusBar, Platform, ScrollView,TouchableOpacity} from 'react-native'
import { StyleSheet, Text, View } from 'react-native';

function Header(content=Text){ 
    return (
    <View>
        <Text></Text>
       
        <Header
            centerComponent={{text: content,style : {color: '#fff',fontSize:20,fontWeight: '500' }  }}
            leftComponent = {
                <TouchableOpacity>
                <Ionicons style={styles.headerLeft} name= "ios-chevron-back" size={28} color="white" />
                </TouchableOpacity>
            }
          ></Header>
    </View>
    );

}
