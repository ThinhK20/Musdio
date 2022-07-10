import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Slider from "react-native-slider";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Swipeable } from 'react-native-gesture-handler';
const LYRICS = [
  {
    id: 1,
    text: "Umbala alabatrap",
  },
  {
    id: 2,
    text: "Ta cùng khiêu vũ như điệu manbo",
  },
  {
    id: 3,
    text: "...",
  },
];

function NowPlaying({ navigation, route }) {
  const { playID } = route.params
  const songs = useSelector(state => state.musics)
  let selectedID = 0
  for (let i in songs) {
    if (songs[i].id == playID) {
      selectedID = i
    }
  }
  
  const [activeRandomBtn, setActiveRandomBtn] = useState(false);
  const [activeRepeatBtn, setActiveRepeatBtn] = useState(false);

  const [activeSwipe, setActiveSwipe] = useState(false)
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(selectedID);
  const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isChangeProgress, setIsChangeProgess] = useState(false);

  const [randomNumber, setRandomNumber] = useState();

  const sound = useRef(new Audio.Sound());
  // Handle event when user clicked repeat button
  const handleRepeatSong = () => {
    if (!activeRepeatBtn) {
      setActiveRepeatBtn(!activeRepeatBtn);
      sound.current.setIsLoopingAsync(true);
    } else {
      setActiveRepeatBtn(!activeRepeatBtn);
      sound.current.setIsLoopingAsync(false);
    }
  };

  // Handle event when user clicked when user clicked random button ==> Set random number and active button
  useEffect(() => {
    if (activeRandomBtn) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * songs.length);
      } while (randomNumber === currentIndex);
      setRandomNumber(randomNumber);
    }
  });

  // Handle event when user clicked the next button ==> Set new current index & new current song
  const handleNextSong = () => {
    if (!activeRandomBtn) {
      if (currentIndex + 1 > songs.length - 1) {
        setCurrentIndex((prevIndex) => {
          setCurrentSong(songs[0]);
          return 0;
        });
      } else {
        setCurrentIndex((prevIndex) => {
          setCurrentSong(songs[prevIndex + 1]);
          return prevIndex + 1;
        });
      }
    } else {
      setCurrentIndex((prevIndex) => {
        setCurrentSong(songs[randomNumber]);
        return randomNumber;
      });
    }
  };

  // Handle event when user clicked the prev button
  const handlePrevSong = () => {
    if (!activeRandomBtn) {
      if (currentIndex - 1 < 0) {
        setCurrentIndex((prevIndex) => {
          setCurrentSong(songs[songs.length - 1]);
          return songs.length - 1;
        });
      } else {
        setCurrentIndex((prevIndex) => {
          setCurrentSong(songs[currentIndex - 1]);
          return prevIndex - 1;
        });
      }
    } else {
      setCurrentIndex((prevIndex) => {
        setCurrentSong(songs[randomNumber]);
        return randomNumber;
      });
    }
  };
  // Change duration song when user is dragging the slider
  const handleDraggingSlider = (value) => {
    sound.current.getStatusAsync().then((result) => {
      sound.current.setPositionAsync(value * result.durationMillis);
      setIsChangeProgess(false);
    });
  };

  // Handle event when user clicked the play/pause button
  const playSound = async () => {
    if (!playing) {
      setPlaying(!playing);
      console.log("Playing sound");
      await sound.current.playAsync();
    } else {
      setPlaying(!playing);
      console.log("Pausing sound...");
      await sound.current.pauseAsync();
    }
  };

  // stream mode 
  // Handle event when current index change ==> Unload old and load new song
  useEffect(() => {
    (async () => {
      await sound.current.loadAsync({ uri: currentSong.uri });
      if (playing) {
        await sound.current.playAsync();
      }
    })();

    return () => sound.current.unloadAsync();
  }, [currentIndex]);

  // Handle event when user is dragging slider
  sound.current.setOnPlaybackStatusUpdate((onPlaybackStatusUpdate) => {
    let sliderValue =
      Number(
        onPlaybackStatusUpdate.positionMillis /
        onPlaybackStatusUpdate.durationMillis
      ) - "0";
    if (!sliderValue) sliderValue = 0;
    if (!isChangeProgress) {
      setCurrentDuration(sliderValue);
    }
    // Handle event when the current song has been finished ==> Next song or just open random song
    if (onPlaybackStatusUpdate.didJustFinish && !activeRepeatBtn) {
      handleNextSong();
    }
  });
  const renderRightView = (onDeleteHandler) => {
    return (
      <View style={styles.swipe}>
        <TouchableOpacity
          onPress={(e) => {
            setActiveSwipe(!activeSwipe)
          }
          }
        >
          <View style={styles.ButtonDelete}>
            <View>
          <MaterialIcons name="playlist-add" size={30} color={activeSwipe ? "#1db954" : "#fff"} />
          </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  };
  const stopWhenBack = async () => {
    if (playing) {
      await sound.current.unloadAsync().then((resolve) => {
        setPlaying(!playing);
        navigation.navigate("Home");
      });
    } else {
      navigation.navigate("Home");
    }
  };



  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <View style={styles.pageStatusBar}>
        <TouchableOpacity
          style={styles.iconHeader}
          onPress={stopWhenBack}
        >
          <Ionicons name="ios-chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.pageName}>Musdio</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Sleep")}
          style={styles.sleep}
        >
          <FontAwesome5 name="cloud-moon" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.playlistText}>Playlist</Text>
        <Text style={styles.artistName}>{currentSong.singer}</Text>
        <Image style={styles.cdImage} source={{ uri: currentSong.img }} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#f3a952"
          maximumTrackTintColor="#fff"
          thumbTintColor="#fff"
          value={currentDuration}
          onSlidingStart={() => setIsChangeProgess(true)}
          onSlidingComplete={handleDraggingSlider}
        />
        <Text style={styles.songName}>{currentSong.name}</Text>
        <View style={styles.lyricsBox}>
          <FlatList
            data={LYRICS}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Text style={styles.lyricText}>{item.text}</Text>
            )}
          />
        </View>
        <Swipeable
            renderRightActions={renderRightView}
        >
          <View style={styles.musicControl}>
            <TouchableOpacity
              style={styles.random}
              onPress={() => setActiveRandomBtn(!activeRandomBtn)}
            >
              <View style = {styles.backward}>
              <FontAwesome
                name="random"
                size={20}
                color={activeRandomBtn ? "#1db954" : "#fff"}
              />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stepbackward}
              onPress={handlePrevSong}
            >
              <View style = {styles.backward}>
              <FontAwesome name="step-backward" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playBtn}
              onPress={() => setPlaying(!playing)}
            >
              
              {playing ? (
                <FontAwesome
                  name="pause-circle"
                  size={80}
                  style={styles.playIcon}
                  onPress={playSound}
                  color="#fff"
                />
              ) : (
                <FontAwesome
                  name="play-circle"
                  size={80}
                  style={styles.playIcon}
                  onPress={playSound}
                  color="#fff"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.stepforward} onPress={handleNextSong}>
            <View style = {styles.backward}>
              <FontAwesome name="step-forward" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.repeat} onPress={handleRepeatSong}>
              <View style = {styles.backward}>
                <Feather
                  name="repeat"
                  size={20}
                  color={activeRepeatBtn ? "#1db954" : "#fff"}
                />
              </View>
            </TouchableOpacity>
          </View>
          </Swipeable>
      </View>

    </LinearGradient>
  );
}

export default NowPlaying;

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  pageStatusBar: {
    color: "#fff",
    padding: 5,
    width: "100%",
    alignItems: "center",
    borderColor: "#000",
    borderBottomWidth: 2,
  },
  iconHeader: {
    position: "absolute",
    left: "5%",
    top: '5%'
  },
  pageName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  playlistText: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  artistName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    opacity: 0.9,
  },
  cdImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 20,
  },
  slider: {
    width: "80%",
    height: 60,
    marginTop: 10,
    marginBottom: 10,
  },
  songName: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
  },
  lyricsBox: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  lyricText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  musicControl: {
    //backgroundColor: 'red',
    flexDirection: "row",
    width: '100%',
    paddingHorizontal: '20%',
  },
  playBtn: {
    opacity: 0.8,
  },
  playIcon: {
    opacity: 1,
  },
  stepbackward: {
    marginRight: 30,
  },
  stepforward: {
    marginLeft: 30,
  },
  repeat: {
    marginLeft: 40,
  },
  random: {
    marginRight: 40,
  },
  sleep: {
    position: "absolute",
    right: "5%",
  },
  swipe: {
    margin: 0,
    alignContent: 'center',
    justifyContent: 'center',
    width: 90,
  },
  ButtonDelete: {
    width: '100%',
    height: '80%',
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop: '6%',
  },
  TextDelete:{
    paddingHorizontal: 20,
    paddingRight: '45%',
    fontSize: 17,
    color: 'white'
  },
  backward:{
    paddingTop: '130%',
  },
});
