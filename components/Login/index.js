import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LoginFacebook from "../LoginWithFacebook";
import LoginGoogle from "../LoginWithGoogle";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged,signOut  } from "firebase/auth";
import { auth } from "../Firebase/index"; 

function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const checkpassword = () => {
    if (password.length === 0) {
      
    }
    setCheckPassword(password.length<6)
  }
  const checkemail = () => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    setCheckEmail(!email.match(validRegex))
  }
  const handleSubmit = () => {
    signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        navigation.navigate("LoadingSongs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + "\n" + errorMessage)
      });
  }
  return (
      <LinearGradient style={styles.container} colors={["#FBFBFB", "#588CDA"]}>
        <View style={styles.box}>
          <Text style={styles.textHeader}>Login</Text>
          <Image
            source={require("../../assets/images/Login.png")}
            style={styles.img}
          />
            <View style={styles.boxInput}>
              <TextInput
               placeholder="Enter username..." 
               style={styles.input}
               onChangeText={(value) => {
                setEmail(value)
               }}
               onBlur = {() => {checkemail()}}
                />
              {
                checkEmail ?
                <Text style={{color: 'red'}}>This field must be email</Text>
                :null
              }
              <TextInput 
               secureTextEntry={true}
               placeholder="Enter password..."
               style={styles.input}
               onChangeText={(value) => {
                  setPassword(value)
                  }}
                onBlur = {() => {checkpassword()}}
                  />
               {
                checkPassword ?
                <Text style={{color: 'red'}}>Length of password limit is 6</Text>
                :null
               }
            </View>
            <TouchableOpacity style={{ marginTop: 30, width: "60%" }} onPress = {() => {handleSubmit()}}>
              <Text style={styles.btn}>Login</Text>
            </TouchableOpacity>
         
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ borderBottomWidth: 1, height: 1, flex: 1 }} />
            <Text style={{ margin: 20, fontSize: 17 }}>Or continue with</Text>
            <Text style={{ borderBottomWidth: 1, height: 1, flex: 1 }} />
          </View>
          <View style={styles.boxSocial}>
            <LoginFacebook navigation={navigation} />
            <LoginGoogle navigation={navigation} />
          </View>
        </View>
      </LinearGradient>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  boxSocial: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSocial: {
    width: 50,
    height: 50,
    margin: 20,
    marginTop: 5,
  },
  prevBtn: {
    position: "absolute",
    top: "5%",
    left: "2.5%",
  },
  box: {
    marginTop: "10%",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
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
    alignItems: "center",
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
    fontSize: 15,
    color: "#000",
    borderRadius: 20,
    textAlign: "center",
  },
});
