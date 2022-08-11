import React, { useState } from "react";
import {
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Facebook from "expo-facebook";
import { useDispatch, useSelector } from "react-redux";
import { setImageAvatarStatus, setLogginStatus, setUser } from "../Redux/facebookSlider";
import { auth } from "../Firebase";
import axios from 'axios'

export default function LoginFacebook({ navigation }) {
  // Listen for authentication state to change.
  onAuthStateChanged(auth, () => { 
    console.log("Facebook state: ", facebookState.userData) 
    if (facebookState.userData != null) {
      axios.post(`https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/post/${auth.currentUser.uid}`, {
        avatar: facebookState.userData.picture.data.url,
        email: facebookState.userData.email,
        gender: "NC", 
        username: facebookState.userData.name
      })
        .then(() => {
          console.log("We are authenticated now!");
          navigation.navigate("LoadingSongs");
        })
        .catch(error => {
          console.log("Message: ", error)
        })
    }
  });

  const dispatch = useDispatch()
  const facebookState = useSelector(state => state.facebook)

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "545155573899991", // enter app id here
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            dispatch(setLogginStatus(true))
            dispatch(setUser(data))
            const credential = new FacebookAuthProvider.credential(token);
            signInWithCredential(auth, credential).catch((error) => {
              console.log(error);
            });

          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const facebookLogOut = () => {
    dispatch(setLogginStatus(false))
    dispatch(setUser(null))
    dispatch(setImageAvatarStatus(false))
  };

  return (
    <TouchableOpacity onPress={facebookLogIn}>
      <Image
        source={require("../../assets/images/facebook.jpg")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    margin: 20,
    marginTop: 5,
  },
});
