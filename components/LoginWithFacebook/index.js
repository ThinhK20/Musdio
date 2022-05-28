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

export default function LoginFacebook({ navigation }) {
  // Listen for authentication state to change.
  onAuthStateChanged(auth, () => {
    if (facebookState.userData != null) {
      console.log("We are authenticated now!");
      navigation.navigate('Home')
    }
    // Do other things
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
            alert("Loggin in !");
            const credential = new FacebookAuthProvider.credential(token);
            console.log("Firebase !!!", credential);
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
