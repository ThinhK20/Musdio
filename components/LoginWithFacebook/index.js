import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Facebook from "expo-facebook";
import { useDispatch, useSelector } from "react-redux";
import { setImageAvatarStatus, setLogginStatus, setUser } from "../Redux/facebookSlider";

export default function LoginFacebook({ navigation }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCoX-FtTXOHj_IcZ6riFi3vjLc9LLw8fqo",
    authDomain: "musdio-6ec90.firebaseapp.com",
    projectId: "musdio-6ec90",
    storageBucket: "musdio-6ec90.appspot.com",
    messagingSenderId: "475042913625",
    appId: "1:475042913625:web:838e09d87446e0d7660048",
    measurementId: "G-KWVQE6ZDZE",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
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
  container: {
    flex: 1,
    backgroundColor: "#e9ebee",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    backgroundColor: "#4267b2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutBtn: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    marginBottom: 200,
  },
  image: {
    width: 50,
    height: 50,
    margin: 20,
    marginTop: 5,
  },
});
