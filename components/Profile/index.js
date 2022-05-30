import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    img :  'https://i1.sndcdn.com/artworks-fJKzeLgbi1zHBOyz-JSsHfw-t500x500.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    img : 'https://i1.sndcdn.com/artworks-fJKzeLgbi1zHBOyz-JSsHfw-t500x500.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f68',
    title: 'Second Item',
    img : 'https://i1.sndcdn.com/artworks-fJKzeLgbi1zHBOyz-JSsHfw-t500x500.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    title: 'Second Item',
    img : 'https://i1.sndcdn.com/artworks-fJKzeLgbi1zHBOyz-JSsHfw-t500x500.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f60',
    title: 'Second Item',
    img : 'https://i1.sndcdn.com/artworks-fJKzeLgbi1zHBOyz-JSsHfw-t500x500.jpg'
  },
];
const Item = ({title, img, navigation }) => (
  <View style={styles.item}>
    <Image style={styles.cdImage} source={{uri: img}}/>
    <TouchableOpacity onPress={() => navigation.navigate('Playlist')}><Text style={styles.title}>{title}</Text></TouchableOpacity>
  </View>
);

function Profile({ navigation }) {
  const renderItem = ({ item }) => <Item title={item.title}  img = {item.img}  navigation={navigation}/>;
  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
    <View style={styles.container}>
        <View style={styles.header}>
       <TouchableOpacity style={styles.iconHeader} onPress={() => navigation.navigate('Home')}>
              <Ionicons name= "ios-chevron-back" size={28} color="white" fontWeight = 'bold' />
         </TouchableOpacity>
              <Text style={styles.textHeader} >Profile</Text>
        </View>
        <View style={styles.Bottom}>
          <View style={styles.Bar}>
          </View>
          <View style={styles.Avatar}> 
          </View>
          <View style={styles.SquareContent}> 
          <Text style = {styles.Content}>NGUYỄN SANH TÀI</Text>
          </View>
          <View style={styles.SquareContent}> 
          <Text style = {styles.ContentNickname}>TÀI PRO</Text>
          </View>
          <View style={styles.SquareContact}> 
          <Text style = {styles.ContentContact}>Contact Me</Text>
          </View>
          <View style={styles.SquareContent}> 
          <Text style = {styles.ContentNickname}>666 Playlists</Text>
          </View>
          <View style={styles.SquareContent}> 
          <Text style = {styles.Content}>Your Albums</Text>
          </View>

         <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
          
        </View> 

        <View style={styles.ToolBar}>

        </View>
      </View>
     

    </LinearGradient>

  );
}

export default Profile



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
    width: '40%',
    paddingLeft: '5%',
    paddingTop : '2%',
  },
  textHeader:{
    color: 'white',
    fontWeight:'bold',
    fontSize : 20,
    width : '100%',
    paddingTop: '2%',
    paddingLeft: '3%',

  },
  Bottom:{
    
    flex: 14,
   // backgroundColor: 'pink',
    borderBottomColor: 'white', 
    borderBottomWidth:  0.5

  },
  Bar:{
    paddingTop: 2, 
    backgroundColor: 'white'
  },
  Avatar:{
    marginTop: '1.5%',
    width : '30%',
    height : '20%',
    borderRadius : 100, 
    backgroundColor: 'red',
    left: '35%',
  },
  SquareContent:{
    marginTop: '2.5%',
//    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems :'center',
  },
  Content:{
    fontSize: 20, 
    fontWeight : 'bold',
    color : 'white',
  },
  ContentNickname:{
    fontSize: 20, 
    fontWeight : 'bold',
    color : 'white',
    opacity: 0.6,
  },
  ContentContact:{
    fontSize: 20, 
    fontWeight : 'bold',
    color : 'black',
  },
  SquareContact:{
    marginLeft: '15%',
    marginTop: '5%',
    width: '70%',
    height: '10%',
    borderRadius: 10,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems :'center',
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
  ContentMusic:{
    marginLeft : '10%',
    marginTop : '7%',
    fontSize: 20, 
    fontWeight : 'bold',
    color : 'white',
    opacity: 0.6
  },
  Opposite:{
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingLeft: '5%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
  },
  cdImage: {
    width: '20%',
    height: '150%',
    borderRadius: 100,
  },
});

