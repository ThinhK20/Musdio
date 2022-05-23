import { LinearGradient } from "expo-linear-gradient";
import { Button, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
function SignUp() {
  return (
    <LinearGradient style={styles.container} colors={["#FBFBFB", "#588CDA"]}>
        <TouchableOpacity style={styles.prevBtn}>
            <AntDesign name="left" size={24} color="black"  />
        </TouchableOpacity>

      <View style={styles.box}>
          <Text style={styles.textHeader}>Sign Up</Text>
          <Image source={require('../../assets/images/SignUp.png')} style={styles.img} />
          <View style={styles.boxInput}>
            <TextInput placeholder="Enter username..."  style={styles.input} />
            <TextInput placeholder="Enter password..."  style={styles.input} />
            <TextInput placeholder="Enter password again..."  style={styles.input} />
          </View>
          <TouchableOpacity style={{marginTop: 50, width: "80%"}}>
              <Text style={styles.btn}>Login</Text>
          </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  prevBtn: {
    position: "absolute",
    top: "5%",
    left: "5%"
  },
  box: {
    marginTop: "20%",
    width: "80%",
    marginBottom: "20%",
    backgroundColor: "#fff",
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  textHeader: {
    fontSize: 30,
    right: "30%",
    top: "5%",
    zIndex: 1,
    fontWeight: '400'
  },    
  img: {
      width: "80%",
      height: "40%"
  },
  boxInput: {
    width: "80%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#000",
    minWidth: 270,
    textAlignVertical: "center",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
  },
  btn: {
    backgroundColor: "#00B0FF",
    padding: 10,
    fontSize: 20,
    color: "#000",
    borderRadius: 20,
    textAlign: "center"
}
});
