import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from '@react-navigation/native';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Itemaaaaaaaaa', // max 10
    img :  'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'Bich Phuong', // max 11
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second',
    img : 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'G-Dragon',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f68',
    title: 'Gửi An',
    img : 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'Chi Pu',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    title: 'Second ',
    img : 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'Quang Teo',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f60',
    title: 'Second',
    img : 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'Tai Dom',
  },
];

const Item = ({title, img, single}) => (
  <TouchableOpacity>
  <View style={styles.item}>
    <Image style={styles.cdImage} source={{uri: img}}/>
    <View style = {styles.Single}>
      <Text style={styles.nameSong} numberOfLines= {1}>{title}</Text>
      <Text style={styles.nameSingle} numberOfLines= {1}>{single}</Text>
    </View>
    <View style = {styles.iconPlay}>
      <View style={styles.iconPlay}>
        <Ionicons name="md-play-circle-sharp" size={50} color="white" />
      </View>
    </View>
  </View>
  </TouchableOpacity>
);

function Playlist({navigation}) {
  const renderItem = ({ item }) => <Item title={item.title}  img = {item.img} single = {item.single} navigation = {navigation}/>;
  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
    <View style={styles.container}>
        <View style={styles.header}>
       <TouchableOpacity style={styles.iconHeader} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name= "ios-chevron-back" size={40} color="white" fontWeight = 'bold' />
         </TouchableOpacity>
              <Text style={styles.textHeader} >My Playlist</Text>
        </View>
        <View style={styles.Bottom}>
          <View style={styles.Bar}>
          </View>
          

         <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
          


        </View> 

        <View style={styles.ToolBar}>

        </View>
      </View>
     

    </LinearGradient>

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
  header:{
    flex: 1,
    flexDirection : 'row',
  },
  iconHeader:{
    width: '40%'
  },
  textHeader:{
    paddingTop: 10,
    color: 'white',
    fontWeight:'bold',
    fontSize : 20,
    width : '100%'
  },
  Bottom:{
    
    flex: 14,
   // backgroundColor: 'pink',
    borderBottomColor: 'white', 
    borderBottomWidth:  0.5
   
  },
  Bar:{
    paddingTop: 2, 
    backgroundColor: 'white',
  },
  Song:{
    flexDirection: 'row',
    marginTop: '5%',
    width: '80%',
    height: '10%',
    borderRadius: 32,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems :'center',
    marginLeft: '10%',

  },
  avatarmini:{
    width : '20%',
    height : '100%',
    borderRadius : 100, 
    backgroundColor: 'blue',
    marginLeft : '-43%',
  },
  item: {
    flex : 1,
    flexDirection: 'row',
    //backgroundColor: '#201E21',
    borderRadius : 20,
    padding: 27,
    marginVertical: 7,
    marginHorizontal: 10,
    alignItems: 'center',
    height : '80%',
  },
  nameSong: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    flex : 1,
  },
  nameSingle: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: '#928989',
    fontSize: 15,
    opacity : 100,
    flex : 1,
  },
  cdImage: {
    width: '23%',
    height: '150%',
    borderRadius: 0,
  },
  Single:{
    flex : 1,
    flexDirection : 'column',
    paddingLeft : '3%',
    width : '100%',
  },
  iconPlay:{
    flex : 1,
    paddingLeft : '15%',
  },
});

export default Playlist;