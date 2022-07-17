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
            "https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/music/get/",
            {
              signal: controller.signal,
            }
          )
          .then((response) => {
            dispatch(setSongs(response.data.data));
          })
          .then(() => {
            navigation.navigate("Home");
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
      navigation.navigate("Home");
    }
    return () => controller.abort();
  }, []);

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: '#000' }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
        Loading API...
      </Text>
    </View>
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
