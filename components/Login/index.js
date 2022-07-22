import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LoginFacebook from "../LoginWithFacebook";
import LoginGoogle from "../LoginWithGoogle";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/index";

function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [checkPassword, setCheckPassword] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const checkpassword = () => {
    if (password.length === 0) {

    }
    setCheckPassword(password.length < 6)
  }
  const checkemail = () => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    setCheckEmail(!email.match(validRegex))
  }
  const handleSubmit = () => {
    console.log("run ")
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("run ")

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
        <View style={{ flexDirection: 'row', backgroundColor: 'rgb(76, 94, 192)', height: '28%' }}>
          <View style={{ flexDirection: 'column', marginTop: '18%' }}>
            <Text style={styles.textHeader}>Musdio 🎧</Text>
            <Text style={[styles.textHeader, { fontSize: 15 }]}>Welcome</Text>
          </View>
          <View style={{ marginTop: StatusBar.currentHeight}}>
            <Image
              source={require("../../assets/images/listen.png")}
              style={{ height: 165, width: 210 }}
            />
          </View>
        </View>

        <View style={styles.boxInput}>
          <View style={{ flexDirection: 'row', backgroundColor: 'rgb(223,223,223)', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>

            <Text style={[styles.textContent, styles.Active]}>Sign In</Text>
            <TouchableOpacity style ={{width: '50%',alignItems: 'center'}} onPress = {() =>{ navigation.navigate('SignUp')}} >
            <Text style={[styles.textContent, styles.nonActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                placeholder="Enter username..."
                style={styles.input}
                onChangeText={(value) => {
                  setEmail(value)
                }}
                onBlur={() => { checkemail() }}
              />
              {
                checkEmail ?
                  <Text style={{ color: 'red', width: '80%' }}>This field must be email</Text>
                  : null
              }
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter password..."
                style={styles.input}
                onChangeText={(value) => {
                  setPassword(value)
                }}
                onBlur={() => { checkpassword() }}
              />
              {
                checkPassword ?
                  <Text style={{ color: 'blue', width: '80%' }}>Length of password limit is 6</Text>
                  : null
              }
            </View>
            <View style = {{width: '80%'}}>
            <Text style = {{textAlign: 'right',fontSize:15}}>Forgot your password?</Text>
            </View>
          </View>
        <TouchableOpacity style={{ marginTop: 30,justifyContent:'center',alignItems:'center' }} onPress={() => { handleSubmit() }}>
          <Text style={styles.btn}>Login</Text>
        </TouchableOpacity>
        </View>

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
  },
  boxSocial: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    fontSize: 24,
    width: '50%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
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
    // alignItems: "center",
    backgroundColor: 'white',
    flex: 1
  },
  textHeader: {
    fontSize: 26,
    zIndex: 1,
    fontWeight: "400",
    color: 'white',
    marginLeft: '15%',
  },
  nonActive: {
    backgroundColor: 'rgb(223,223,223)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12
  },
  Active: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white'
  },
  img: {
    width: "80%",
    height: "40%",
  },
  boxInput: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: '-3%'
  },
  input: {
    borderWidth: 2,
    borderColor: "#000",
    width: '80%',
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
    width: '40%',

  },
});
