import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Slider from "react-native-slider";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { songs } from "../Database";

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

function NowPlaying() {
  const [activeRandomBtn, setActiveRandomBtn] = useState(false);
  const [activeRepeatBtn, setActiveRepeatBtn] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
  const [playbackStatus, setPlaybackStatus] = useState();
  const [currentDuration, setCurrentDuration] = useState(0);

  const sound = useRef(new Audio.Sound());

  const handleRandomSong = () => {
    if (!activeRandomBtn) {
      let randomNumber;
      setActiveRandomBtn(!activeRandomBtn);
      do {
        randomNumber = Math.floor(Math.random() * songs.length);
      } while (randomNumber === currentIndex);
      setCurrentIndex(randomNumber);
    } else {
      setActiveRandomBtn(!activeRandomBtn);
    }
  };

  const handleNextSong = () => {
    if (currentIndex + 1 > songs.length - 1) {
      setCurrentIndex(0);
      setCurrentSong(songs[currentIndex])
      
    } else {
      setCurrentIndex(currentIndex + 1);
      setCurrentSong(songs[currentIndex])

    }
  };

  const handlePrevSong = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(songs.length - 1);
      setCurrentSong(songs[currentIndex])

    } else {
      setCurrentIndex(currentIndex - 1);
      setCurrentSong(songs[currentIndex])

    }
  };

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

  useEffect(() => {
      console.log("Current index: ", currentIndex);
      sound.current.loadAsync(currentSong.path);
      console.log(currentSong.name)
      return () => sound.current.unloadAsync();
  }, [currentIndex]);


  // useEffect(() => {
  //   return sound && !playing
  //     ? () => {
  //         console.log("Unloading sound...");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  async function updateSliderValue() {
    if (sound) {
      await sound.setOnPlaybackStatusUpdate((onPlaybackStatusUpdate) => {
        if (!onPlaybackStatusUpdate.didJustFinish) {
          let sliderValue =
            Number(
              onPlaybackStatusUpdate.positionMillis /
                onPlaybackStatusUpdate.durationMillis
            ) - "0";
          setCurrentDuration(sliderValue);
        } else {
          console.log("Finish !!!");
          console.log("Status: ", onPlaybackStatusUpdate);
          setCurrentDuration(0);
          setPlaying(!playing);
        }
      });
    }
  }
  useEffect(() => {
    // updateSliderValue()
  });

  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <View style={styles.pageStatusBar}>
        <TouchableOpacity style={styles.iconHeader}>
          <Ionicons name="ios-chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.pageName}>Musdio</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.playlistText}>Playlist</Text>
        <Text style={styles.artistName}>{currentSong.singer}</Text>
        <Image style={styles.cdImage} source={currentSong.image} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#f3a952"
          maximumTrackTintColor="#fff"
          thumbTintColor="#fff"
          value={currentDuration}
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
        <View style={styles.musicControl}>
          <TouchableOpacity style={styles.random} onPress={handleRandomSong}>
            <FontAwesome
              name="random"
              size={20}
              color={activeRandomBtn ? "#1db954" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stepbackward}
            onPress={handlePrevSong}
          >
            <FontAwesome name="step-backward" size={24} color="#fff" />
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
            <FontAwesome name="step-forward" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.repeat}
            onPress={() => setActiveRepeatBtn(!activeRepeatBtn)}
          >
            <Feather
              name="repeat"
              size={20}
              color={activeRepeatBtn ? "#1db954" : "#fff"}
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
