import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,ScrollView
} from "react-native";
import Slider from "react-native-slider";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";
import { setTheme } from "../Redux/generalSlider";
import { Easing } from "react-native";


function NowPlaying({ navigation, route }) {
  const { playID } = route.params;
  const songs = (() => {
    const source_songs = useSelector((state) => state.musics);
    const listSongs = [];
    for (let value of playID) {
      const song = source_songs.find((obj) => obj.id == value);
      if (song) {
        listSongs.push(song);
      }
    }
    return listSongs;
  })();
  
  const [activeRandomBtn, setActiveRandomBtn] = useState(false);
  const [activeRepeatBtn, setActiveRepeatBtn] = useState(false);

  const [activeSwipe, setActiveSwipe] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isChangeProgress, setIsChangeProgess] = useState(false);

  const [randomNumber, setRandomNumber] = useState();

  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.general);

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
      try {
        await sound.current.loadAsync({ uri: currentSong.uri });
        if (playing) {
          await sound.current.playAsync();
        }
      } catch {
        console.log("Loading available...");
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
            setActiveSwipe(!activeSwipe);
          }}
        >
          <View style={styles.ButtonDelete}>
            <View>
              <MaterialIcons
                name="playlist-add"
                size={30}
                color={activeSwipe ? "#1db954" : "#fff"}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const stopWhenBack = async () => {
    if (playing) {
      await sound.current.unloadAsync().then((resolve) => {
        setPlaying(!playing);
        navigation.navigate("Home");
      });
    } else {
      navigation.goBack();
    }
  };

  // Rotate CD Animation
  let rotateValueHolder = useRef(new Animated.Value(0)).current;

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    try {
      if (playing) {
        Animated.loop(
          Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
            easing: Easing.linear,
            isInteraction: false,
          })
        ).start();
      } else {
        rotateValueHolder.stopAnimation(() => {
          rotateValueHolder.extractOffset();
        });
      }
    } catch (e) {
      console.log(e);
      console.log("Setting CD animated...");
    }
  }, [playing]);
  //-------------------------------------------------------------------

  const handleTheme = () => {
    if (theme == "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };

  return (
    <LinearGradient
      colors={
        theme === "dark" ? ["#2f2b53", "#2f2b53"] : ["#f5f6fd", "#f5f6fd"]
      }
      end={[1, 0.8]}
      style={styles.LinearGradient}
    >
      <View style={styles.pageStatusBar}>
        <TouchableOpacity
          style={styles.iconHeader}
          onPress={stopWhenBack}
        >
          <Ionicons name="ios-chevron-back" size={28} color="white" style={theme === 'light' && styles.blackColor} />
        </TouchableOpacity>
        <Text style={[styles.pageName, theme === 'dark' && styles.whiteColor]}>Musdio</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Sleep")}
          style={styles.sleep}
        >
          <FontAwesome5 name="cloud-moon" size={28} style={[{ position: 'absolute', right: 20, top: "-70%" }, theme === 'light' && styles.blackColor]} color="white" />
        </TouchableOpacity>
      </View>


      <View style={styles.container}>
        <Text
          style={[styles.playlistText, theme === "dark" && styles.whiteColor]}
        >
          Playlist
        </Text>
        <Text
          style={[styles.artistName, theme === "dark" && styles.whiteColor]}
        >
          {currentSong.singer}
        </Text>
        <Animated.Image
          style={[styles.cdImage, { transform: [{ rotate: rotateData }] }]}
          source={{ uri: currentSong.img }}
        />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#f3a952"
          maximumTrackTintColor={theme === "dark" ? "#fff" : "#000"}
          thumbTintColor={theme === "dark" ? "#fff" : "#000"}
          value={currentDuration}
          onSlidingStart={() => setIsChangeProgess(true)}
          onSlidingComplete={handleDraggingSlider}
        />
        <Text style={[styles.songName, theme === "dark" && styles.whiteColor]}>
          {currentSong.name}
        </Text>
        <ScrollView style={styles.lyricsBox}>
            <View style={{ flexDirection: 'row', paddingLeft :'10%', paddingRight:'10%'}}>
              <Text style={{ flex: 1, flexWrap: 'wrap', marginVertical:'2%', color:'white'}}>

              </Text>
            </View>
        </ScrollView>
        <View style={styles.musicControl}>
          <TouchableOpacity
            style={styles.random}
            onPress={() => setActiveRandomBtn(!activeRandomBtn)}
          >
            <FontAwesome
              name="random"
              size={20}
              color={
                activeRandomBtn ? "#1db954" : theme === "dark" ? "#fff" : "#000"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stepbackward}
            onPress={handlePrevSong}
          >
            <FontAwesome
              name="step-backward"
              size={24}
              color={theme === "dark" ? "#fff" : "#000"}
            />
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
                color={theme === "dark" ? "#fff" : "#000"}
              />
            ) : (
              <FontAwesome
                name="play-circle"
                size={80}
                style={styles.playIcon}
                onPress={playSound}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.stepforward} onPress={handleNextSong}>
            <FontAwesome
              name="step-forward"
              size={24}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.repeat} onPress={handleRepeatSong}>
            <Feather
              name="repeat"
              size={20}
              color={
                activeRepeatBtn ? "#1db954" : theme === "dark" ? "#fff" : "#000"
              }
            />
          </TouchableOpacity>
        </View>
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
  blackColor: {
    color: "#000",
  },
  whiteColor: {
    color: "#fff",
  },
  pageStatusBar: {
    color: "#fff",
    flexDirection: "row",
    padding: 5,
    width: "100%",
    alignItems: "center",
    borderColor: "#000",
    borderBottomWidth: 2,
  },
  iconHeader: {
    position: "absolute",
    left: "5%",
    top: '5%',
    color: '#FFFFFF',
    zIndex: 99
  },
  pageName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  playlistText: {
    opacity: 0.8,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  artistName: {
    fontSize: 18,
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
    fontSize: 23,
    fontWeight: "bold",
  },
  lyricsBox: {
    width: "100%",
    flex: 1,
    //backgroundColor: 'pink',
  },
  lyricText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  musicControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
});
