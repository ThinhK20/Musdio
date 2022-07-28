import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { auth } from "../Firebase/index"
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../Redux/musicSlider";
import { setUser } from "../Redux/userSlider";

export default function LoadingSongs({ navigation }) {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.musics);
  const user = useSelector((state) => state.user)
  const [temp,setTemp] = useState([])
  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      const id =  auth.currentUser.uid;
      try {
        await axios
          .get(
            `https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/${id}`,
            {
              signal: controller.signal,
            }
          )
          .then((response) => {
            console.log(response.data)
            dispatch(setUser(response.data.data));
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
    const fetchAPI = async () => {
      try {
        await axios
          .get(
            "https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/music/get/",
            {
              signal: controller.signal,
            }
          )
          .then((response) => {
            // console.log(response.data)
            setTemp(response.data)
            dispatch(setSongs(response.data.data));
            return response.data.data
          })
          .then((temp) => {
            fetchUser()
            
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
      fetchAPI();
    } else {
      console.log("Unnecessary to fetch API");
      navigation.navigate("Home");
    }
    return () => controller.abort();
  }, []);

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: '#27153E' }}
    >
      <Image
        source={require("../../assets/images/listen.png")}
        style={{ height: 165, width: 210 }}
      />
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20,paddingTop: 20 }}>
        Loading...
      </Text>
    </View>
  );
}
