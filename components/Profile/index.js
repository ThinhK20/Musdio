import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from 'react';
import { setSongs } from "../Redux/musicSlider";
import { useDispatch } from "react-redux";
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoadingUser, setisLoadingUser] = useState(true);
  const [songsUsers, setsongsUsers] = useState([]);
  const getMusics = async () => {
    try {
      const response = await fetch('https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/music/get');
      const json = await response.json().then(data => {
        dispatch(setSongs(data.data));
        setData(data.data)
      })
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
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
    if (data.length == 0) {
      getMusics();
    }
    if (data.length == 0) {
      getUsers();
    }


  }, []);

  useEffect(() => {
    if (data.length != 0 && user.length != 0) {
      data.forEach((m) => {
        user['favoriteMusics'].forEach((n) => {
          if (n == m['id']) {
            setsongsUsers(previous => {
              const newData = [...previous, m]
              return newData
            })
          }
        });
      });
    }
  }, [data, user]);
  const renderRightView = (id) => {
    return (
      <View style={styles.swipe}>
        <TouchableOpacity
          onPress={() => {
            axios.put('https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/delete/favoriteSong/SaM1QW1nc2XwTIHAY5Cx', {
              musicId: id
            })
              .then(response => {
                setsongsUsers(oldData => {
                    const newData = oldData.filter(song => {
                    return song.id != id;
                  });
                  return newData
                })
              })
          }
          }
        >
          <View style={styles.ButtonDelete}>

            <AntDesign name="delete" size={27} color="white" />

          </View>
        </TouchableOpacity>
      </View>
    )
  };
  const Item = ({ id, title, img, single, navigation }) => (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => renderRightView(id)}
      >
        <TouchableOpacity onPress={() => navigation.navigate("NowPlaying", {
          playID: [id]
        })}>
          <View style={styles.item}>
            <Image style={styles.cdImage} source={{ uri: img }} />
            <View style={styles.Single}>
              <Text style={styles.nameSong} numberOfLines={1}>{title}</Text>
              <Text style={styles.nameSingle} numberOfLines={1}>{single}</Text>
            </View>
            
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
  const renderItem = ({ item }) => <Item id={item.id} title={item.name} img={item.img} single={item.singer} navigation={navigation} />;
  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconHeader} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-chevron-back" size={28} color="white" fontWeight='bold' />
          </TouchableOpacity>
          <Text style={styles.textHeader} >Profile</Text>
        </View>
        <View style={styles.Bottom}>
          <View style={styles.Bar}>
          </View>
          <View style= {styles.Avatar}>
          <Image
      style = {{height : '100%', width: '100%', borderRadius: 100}}
      source={{uri: user.uri}}/>
          </View>
          <View style={styles.SquareContent}>
            <Text style={styles.Content}> {user.username}</Text>
          </View>
          <View style={styles.SquareContact}>
            <Text style={styles.ContentContact} numberOfLines={1}>Email: {user.email}</Text>
          </View>
          <View style={styles.SquareContent}>
            <Text style={styles.Content}>Birthdate: {user.birthdate}</Text>
          </View>
          <View style={styles.SquareContent}>
            <Text style={styles.Content}>Sex: {user.gender}</Text>
          </View>
          <View style={styles.SquareContent}>
            <Text style={styles.ContentNickname}>My Playlist</Text>
          </View>

          <FlatList data={songsUsers} renderItem={renderItem} keyExtractor={item => item.id} />

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
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  iconHeader: {
    width: '40%',
    paddingLeft: '5%',
    paddingTop: '2%',
  },
  textHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    width: '100%',
    paddingTop: '2%',
    paddingLeft: '3%',

  },
  Bottom: {

    flex: 14,
    // backgroundColor: 'pink',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5

  },
  Bar: {
    paddingTop: 2,
    backgroundColor: 'white'
  },
  Avatar: {
    marginTop: '1.5%',
    width: '30%',
    height: '20%',
    borderRadius: 100,
    //backgroundColor: 'red',
    left: '35%',
  },
  SquareContent: {
    marginTop: '2.5%',
    //    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Content: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  ContentNickname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.6,
  },
  ContentContact: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  SquareContact: {
    marginLeft: '15%',
    marginTop: '5%',
    width: '70%',
    height: '10%',
    borderRadius: 10,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
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
  ContentMusic: {
    marginLeft: '10%',
    marginTop: '7%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.6
  },
  Opposite: {
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
  nameSong: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  nameSingle: {
    paddingLeft: '10%',
    fontWeight: 'bold',
    color: '#928989',
    fontSize: 15,
    opacity: 100,
    flex: 1,
  },
  ButtonDelete: {
    top: '15%',
    left: '28%',
    width: '80%',
    height: '70%',
    backgroundColor: 'red',
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  swipe: {
    margin: 0,
    alignContent: 'center',
    justifyContent: 'center',
    width: 90,
  },
});
