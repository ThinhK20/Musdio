import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Itemaaaaaaaaa', // max 10
    img: 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'Bich Phuong', // max 11
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second',
    img: 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'G-Dragon',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f68',
    title: 'Gửi Anh',
    img: 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'Chi Pu',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    title: 'Second ',
    img: 'https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/6/2/4/9/62498fa513ccd6abdd5a373117353e16.jpg',
    single: 'Quang Teo',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f60',
    title: 'Second',
    img: 'https://i1.sndcdn.com/artworks-fJKzeLgbi1zHBOyz-JSsHfw-t500x500.jpg',
    single: 'Tai Dom',
  },
];

const Item = ({ title, img, single, index }) => (
  <View style={styles.item}>
    <Text style={styles.index}> #{index} </Text>
    <Image style={styles.cdImage} source={{ uri: img }} />
    <View style={styles.Single}>
      <Text style={styles.nameSong} numberOfLines={1}>{title}</Text>
      <Text style={styles.nameSingle} numberOfLines={1}>{single}</Text>
    </View>
    <View style={styles.iconPlay}>
      <TouchableOpacity style={styles.iconPlay}>
        <Ionicons name="md-play-circle-sharp" size={50} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

function TopTrending() {
  const renderItem = ({ item, index }) => <Item title={item.title} img={item.img} single={item.single} index = {index + 1}/>;
  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconHeader}>
            <Ionicons name="ios-chevron-back" size={28} color="white" fontWeight='bold' />
          </TouchableOpacity>
          <Text style={styles.textHeader} >Top Treding</Text>
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
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  iconHeader: {
    width: '40%',
    paddingTop: '2%',
    paddingLeft: '3.5%'
  },
  textHeader: {
    paddingTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: '100%',
    right: '20%'
  },
  Bottom: {

    flex: 14,
    // backgroundColor: 'pink',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5

  },
  Bar: {
    paddingTop: 2,
    backgroundColor: 'white',
  },
  Song: {
    flexDirection: 'row',
    marginTop: '5%',
    width: '80%',
    height: '10%',
    borderRadius: 32,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',

  },
  avatarmini: {
    width: '20%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: 'blue',
    marginLeft: '-43%',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#201E21',
    borderRadius: 2,
    padding: 27,
    marginVertical: 25,
    marginHorizontal: 10,
    alignItems: 'center',
    height: '80%',
  },
  nameSong: {
    paddingLeft: '2%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  index: {
    paddingLeft: '-10%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    opacity: 20,
    paddingRight : '3%'
  },
  nameSingle: {
    paddingLeft: '2%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
    opacity: 100,
  },
  cdImage: {
    width: '30%',
    height: '150%',
    borderRadius: 10,
  },
  Single: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '3%',
    width: '100%',
  },
  iconPlay: {
    paddingLeft: 5,
    right: '-10%'
  },
});

export default TopTrending;