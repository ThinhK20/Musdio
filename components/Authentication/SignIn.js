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
import LoginFacebook from "./LoginFacebook";
import { LinearGradient } from "expo-linear-gradient";
import LoginGoogle from "./LoginGoogle";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/index"
import ImageLogIn from '../../assets/adaptive-icon.png'

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
    <LinearGradient style={styles.container} colors={["#242526", "#242526"]}>
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', backgroundColor: '#242526', height: '28%' }}>
          <View style={{ flexDirection: 'column', marginTop: '18%' }}>
            <Text style={styles.textHeader}>Musdio 🎧</Text>
            {/* <Text style={[styles.textHeader, { fontSize: 15 }]}>Welcome</Text> */}
          </View>
          <View style={{ paddingTop: StatusBar.currentHeight }}>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}
              style={{ height: 165, width: 210 }}
            />
          </View>
        </View>

        <View style={styles.boxInput}>
          <View style={{ flexDirection: 'row', backgroundColor: '#242526', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <Text style={[styles.textContent, styles.Active]}>Sign In</Text>
            <TouchableOpacity style={{ width: '50%', alignItems: 'center', backgroundColor: '#303134' }} onPress={() => { navigation.navigate('SignUp') }} >
              <Text style={[styles.textContent, styles.nonActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                placeholder="Enter email..."
                placeholderTextColor="white"
                style={styles.input}
                onChangeText={(value) => {
                  setEmail(value)
                }}
                onBlur={() => { checkemail() }}
              />
              {
                checkEmail ?
                  <Text style={{ color: 'yellow', width: '80%' }}>This field must be email</Text>
                  : null
              }
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter password..."
                placeholderTextColor="white"

                style={styles.input}
                onChangeText={(value) => {
                  setPassword(value)
                }}
                onBlur={() => { checkpassword() }}
              />
              {
                checkPassword ?
                  <Text style={{ color: 'yellow', width: '80%' }}>Length of password limit is 6</Text>
                  : null
              }
            </View>
            <TouchableOpacity style={{ width: '80%' }} onPress={() => { navigation.navigate('Forgot') }}>
              <Text style={{ textAlign: 'right', fontSize: 15, color: 'white' }}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleSubmit() }}>
            <Text style={styles.btn}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#242526'
          }}
        >
          <Text style={{ borderBottomWidth: 1, height: 1, flex: 1, backgroundColor: 'white' }} />
          <Text style={{ margin: 20, fontSize: 17, color: 'white' }}>Or continue with</Text>
          <Text style={{ borderBottomWidth: 1, height: 1, flex: 1, backgroundColor: 'white' }} />
        </View>
        <View style={[styles.boxSocial, { backgroundColor: '#242526' }]}>
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
    paddingBottom: 10,
    color: 'white'
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
    backgroundColor: '#242526',
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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12
  },
  Active: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#242526'
  },
  img: {
    width: "80%",
    height: "40%",
  },
  boxInput: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: '-3%',
    backgroundColor: '#242526'
  },
  input: {
    width: '80%',
    textAlignVertical: "center",
    padding: 18,
    paddingLeft: 20,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    color: 'white',
    backgroundColor: '#38304c',
  },
  btn: {
    backgroundColor: "#7a56d4",
    padding: 10,
    fontSize: 23,
    color: "white",
    borderRadius: 20,
    textAlign: "center",
    width: '40%',
  },
});
