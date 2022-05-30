import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../Redux/musicSlider";

export default function LoadingSongs({ navigation }) {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.musics);

  useEffect(() => {
    const controller = new AbortController();
    const fetchAPI = async () => {
      try {
        console.log("Running axios...");
        await axios
          .get(
            "https://denzqfapjoywlunugtbe.supabase.co/rest/v1/Music?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbnpxZmFwam95d2x1bnVndGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1Njc2MTAsImV4cCI6MTk2OTE0MzYxMH0.phhqYflVrlaS3Lb9lsxe21sgJH2ZSW1HKDHN8RQqy1Y",
            {
              signal: controller.signal,
            }
          )
          .then((response) => {
            dispatch(setSongs(response.data));
          })
          .then(() => {
            navigation.navigate("NowPlaying");
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancel");
        } else {
          console.log(error);
        }
      }
    };
    if (songs.length === 0) {
      console.log("Fetching API....");
      fetchAPI();
    } else {
      console.log("Unnecessary to fetch API");
      navigation.navigate("NowPlaying");
    }
    return () => controller.abort();
  }, []);

  return (
    <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
      <Image
        source={require("../../assets/images/Loading.jpg")}
        style={styles.image}
      />
      <Text style={styles.text}>Loading...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
  },
  LinearGradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  text: {
    fontSize: 20,
    marginTop: 30,
    color: "#fff",
  },
  image: {
    width: 250,
    height: 250,
  },
});
