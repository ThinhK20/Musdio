import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import NowPlaying from "../NowPlaying";

export default function LoadingSongs({ navigation }) {
  const [songs, setSongs] = useState();

  useEffect(() => {
    fetch(
      "https://denzqfapjoywlunugtbe.supabase.co/rest/v1/Music?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbnpxZmFwam95d2x1bnVndGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1Njc2MTAsImV4cCI6MTk2OTE0MzYxMH0.phhqYflVrlaS3Lb9lsxe21sgJH2ZSW1HKDHN8RQqy1Y"
    )
      .then((response) => response.json())
      .then((responseSongs) => setSongs(responseSongs));
  }, []);

  return (
    <>
      {songs ? <NowPlaying songs={songs} navigation={navigation} /> :
      <LinearGradient
      colors={["#1565C0", "#000"]}
      end={[0.05, 0.5]}
      style={styles.LinearGradient}
    >
          <Image source={require('../../assets/images/Loading.jpg')} style={styles.image}/>
          <Text style={styles.text}>Loading...</Text>
    </LinearGradient>
      
      }
    </>
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
    color: "#fff"
  },
  image: {
    width: 250,
    height: 250
  }
});
