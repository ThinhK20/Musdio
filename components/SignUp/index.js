import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { checkActionCode, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { auth } from "../Firebase";
function SignUp({ navigation }) {
  const [cpassword, setCassword] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const writeToData = (Id, email) => {
    console.log("call");
    const db = getDatabase();
    const reference = ref(db, "User/" + Id);
    set(reference, {
      mail: email,
    });
  };

  const handleSubmit = () => {
    let checkEmail = validateEmail(email);
    if (checkEmail === true && password === cpassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User account created & signed in!");
          const userId = auth.currentUser.uid;
          writeToData(userId, email);
          navigation.navigate("Home");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            alert("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            alert("That email address is invalid!");
          }
          alert(error);
        });
    } else {
      if (password === cpassword) alert("Valid Format");
      else alert("Invalid Password and Confirm Password");
    }
  };

  return (
    <LinearGradient style={styles.container} colors={["#FBFBFB", "#588CDA"]}>
      <TouchableOpacity style={styles.prevBtn}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.box}>
        <Text style={styles.textHeader}>Sign Up</Text>
        <Image
          source={require("../../assets/images/SignUp.png")}
          style={styles.img}
        />
        <View style={styles.boxInput}>
          <TextInput
            placeholder="Enter email..."
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Enter password..."
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Enter confirm password..."
            style={styles.input}
            onChangeText={(value) => setCassword(value)}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 30, width: "80%" }}
          onPress={handleSubmit}
        >
          <Text style={styles.btn}>SignUp</Text>
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
    left: "2.5%",
  },
  box: {
    marginTop: "10%",
    width: "80%",
    marginBottom: "10%",
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
    fontWeight: "400",
  },
  img: {
    width: "80%",
    height: "40%",
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
    textAlign: "center",
  },
});
