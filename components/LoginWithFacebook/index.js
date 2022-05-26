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

export default function LoginFacebook() {
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

  console.log("Auth: ", auth)

  // Listen for authentication state to change.
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("We are authenticated now!");
    }

    // Do other things
  });

  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "545155573899991", // enter app id here
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", 'email'],
      });
      if (type === "success") {
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoggedinStatus(true);
            setUserData(data);
            alert("Loggin in !");
            const credential = new FacebookAuthProvider.credential(token)
            console.log("Firebase !!!", credential)
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
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  };

  return isLoggedin ? (
    userData ? (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 50 }}
          source={{ uri: userData.picture.data.url }}
          onLoadEnd={() => setImageLoadStatus(true)}
        />
        <ActivityIndicator
          size="large"
          color="#0000ff"
          animating={!isImageLoading}
          style={{ position: "absolute" }}
        />
        <Text style={{ fontSize: 22, marginVertical: 10 }}>
          Hi {userData.name}!
        </Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={facebookLogOut}>
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    ) : null
  ) : (
    <View style={styles.container}>
      <Image
        style={{
          width: 200,
          height: 200,
          borderRadius: 50,
          marginVertical: 20,
        }}
        source={{ uri: "https://www.facebook.com/images/fb_icon_325x325.png" }}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={facebookLogIn}>
        <Text style={{ color: "#fff" }}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
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
});
