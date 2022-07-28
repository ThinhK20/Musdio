import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase";

WebBrowser.maybeCompleteAuthSession();

export default function LoginGoogle({ navigation }) {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "475042913625-a07k7qpv9a8o5h8dd088cqsssah6ouic.apps.googleusercontent.com",
    expoClientId:
      "475042913625-ade0r58rup5nvdct9pmfgsegfn2rgmpr.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const credential = GoogleAuthProvider.credential(
        response.authentication.idToken,
        response.authentication.accessToken
      );
      signInWithCredential(auth, credential).catch((error) => {
        console.log(error);
      });
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  onAuthStateChanged(auth, () => {
    if (userInfo) {
      alert("Login successfully!!!");
      console.log("Login google: ", userInfo);
      navigation.navigate("LoadingSongs");
    }
    // Do other things
  });

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  };
  const showUserInfo = () => {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={
        accessToken ? getUserData : () => promptAsync({ showInRecents: true })
      }
    >
      <Image
        source={require("../../assets/images/google.jpg")}
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
