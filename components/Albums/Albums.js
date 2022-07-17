import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { color } from 'react-native-elements/dist/helpers';

const DATA = [
  {
    id: '2Q4ITzM0aLxpwZugrHKC',
    name: 'First Itemaaaaaaaaa', // max 10
    img :  'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    singer: 'Bich Phuong', // max 11
  },
  {
    id: 'CfjB8BRRS4Xv7BjxpuT7',
    name: 'Second',
    img : 'https://i1.sndcdn.com/artworks-fJKzeLgbi1zHBOyz-JSsHfw-t500x500.jpg',
    singer: 'G-Dragon',
  },
];



function Albums({navigation,nameAlbum,Data}) {
  const renderItem = ({ item }) =>  <Item id ={item.id} name={item.name}  img = {item.img} singer = {item.singer} navigation={navigation} />
  const Item = ({id,name, img, singer}) => (
    <TouchableOpacity onPress={() => navigation.navigate("NowPlaying", {
      playID: [id]
    })}>
      <View style={styles.item}>
        <Image style={styles.cdImage} source={{uri: img}}/>
        <View style = {styles.singer}>
          <Text style={styles.nameSong} numberOfLines= {1}>{name}</Text>
          <Text style={styles.namesinger} numberOfLines= {1}>{singer}</Text>
        </View>
        <View style = {styles.iconPlay}>
          <View style={styles.iconPlay}>
            <Ionicons name="md-play-circle-sharp" size={50} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
    <View style={styles.container}>
        <View style={styles.header}>
       <TouchableOpacity style={styles.iconHeader}>
              <Ionicons name= "ios-chevron-back" size={40} color="white" fontWeight = 'bold' />
         </TouchableOpacity>
              <Text style={styles.textHeader} >Albums</Text>
        </View>
    
        <View style={styles.Bottom}>
          <View style={styles.Bar}></View>
         
          <View style={styles.Mid}> 
          <View style={{marginTop:5}}></View>
            <Image style={styles.imageAlbums} source={require('../../assets/images/Login.png')}></Image>
          </View>
          <View style={styles.Mid}>
            <Text style={styles.nameAlbums}> {nameAlbum} </Text>
            <TouchableOpacity onPress={() => navigation.navigate("NowPlaying", {
          playID: DATA.map((_id)=>{
          return _id.id
          })
        })}>
              <View style={styles.playAlbums}>
                <Text style={styles.textPlay}>
                  Play
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{marginTop:20}}></View>
          <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
          
        </View> 
        <View style={styles.Footer}></View>
        {/* <View style={styles.imageAlbums}></View> */}

     
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
    flex: 7,
    flexDirection : 'row',
  },
  iconHeader:{
    width: '40%'
  },
  textHeader:{
    paddingTop: 10,
    color: 'white',
    fontWeight:'bold',
    fontSize : 24,
    width : '100%'
  },
  Footer:{
    flex: 5,
  },
  Bottom:{
    
    flex: 93,
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
    //borderRadius : 100, 
    backgroundColor: 'blue',
    marginLeft : '-43%',
  },
  Mid:{
    alignItems:'center',
    justifyContent: 'center',
  },
  nameAlbums:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  
  },
  playAlbums:{
    marginTop:'3%',
    backgroundColor:'#7DD0F6',
    borderRadius:30,
    width:150,
    height:50,
    //alignContent:'center',
    alignItems:'center',
   // justifyContent: 'center',
  },
  textPlay:{
   //size:30,
    fontSize:25,
    fontWeight:'bold',
    marginTop:'3%',
    color:'white',
  },
  imageAlbums:{
    marginTop:'1%',
    width:150,
    height:150,
    borderRadius:10,

  },
  item: {
    flex : 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    borderRadius : 20,
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 10,
    alignItems: 'center',
    height : '80%',
    width:'100%',
  },
  nameSong: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    flex : 1,
  },
  namesinger: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: '#928989',
    fontSize: 15,
    opacity : 100,
    flex : 1,
  },
  cdImage: {
    width: '20%',
    height: '100%',
    borderRadius: 100,
  },
  singer:{
    flex : 1,
    flexDirection : 'column',
    paddingLeft : '3%',
    width : '100%',
  },
  iconPlay:{
   
    paddingLeft : '15%',
    
  },
});

export default Albums;