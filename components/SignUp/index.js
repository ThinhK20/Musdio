import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
  StatusBar
} from "react-native";
import Checkbox from 'expo-checkbox';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { auth } from "../Firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from "expo-document-picker";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase";
export const FormInput = ({ navigation, route }) => {
  const { email } = route.params
  const [username, setUsername] = useState(email)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [img, setImg] = useState('https://firebasestorage.googleapis.com/v0/b/musdio-6ec90.appspot.com/o/User%2FDefaultAvata%2Fdefault.png?alt=media&token=229c6f28-2544-4477-a5b4-4714234d3d8a');
  const [male, setMale] = useState(true)
  const [female, setFemale] = useState(false)
  const [dataImg, setDataImg] = useState([])
  const [avatarUrl, setAvatarUrl] = useState('https://firebasestorage.googleapis.com/v0/b/musdio-6ec90.appspot.com/o/User%2FDefaultAvata%2Fdefault.png?alt=media&token=229c6f28-2544-4477-a5b4-4714234d3d8a')
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'image/*'
    });
    return result
  };

  const onChange = (event, selectedDate, show) => {
    console.log(event)
    console.log(selectedDate)
    console.log(show)
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleSubmit = async () => {
    console.log(email)
    const userId = auth.currentUser.uid;
    console.log(userId);
    dataImg.name = `${userId}.jpg`
    const response = await fetch(dataImg.uri)
    const blob = await response.blob();
    const storageRef = ref(storage, `User/Avatar/${dataImg.name}`);
    console.log("AAA")
    const uploadTask = uploadBytesResumable(storageRef, blob);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setAvatarUrl(downloadURL)
            console.log(downloadURL)
            let USER = {
              "username": username,
              "email": email,
              "avatar": downloadURL,
              "birthdate": date.toLocaleDateString(),
              "gender": male == true ? "Male" : "Female",
            }
            let url = "https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/post/" + userId
            console.log(url)
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(USER),
            })
              .then((res) => res.json())
              .then((result) => console.log("done"))
              .then(() => {
                navigation.navigate('LoadingSongs')
              })
              .catch((err) => console.log(err))
          })

      }

    );

  }

  return (
    <LinearGradient style={styles.container} colors={["#FBFBFB", "#588CDA"]}>
      <View style={[styles.box, { top: StatusBar.currentHeight }]}>
        <View style={{ flexDirection: 'row', backgroundColor: 'rgb(76, 94, 192)', height: '5%' }}>
          <Text style={[styles.textHeader,{marginLeft: '5%'}]}>Personal Info</Text>
        </View>
        <View style={[styles.boxInput, { top: '0%' }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>

            <TouchableOpacity onPress={() => {
              pickDocument()
                .then((data) => {
                  setDataImg(data)
                  setImg(data.uri)
                })
            }} >

              <Image style={{ height: 150, width: 150, borderRadius: 100, marginTop: 10 }} source={{ uri: img }} />
            </TouchableOpacity>
            <Text style={{ paddingTop: 20 }}>Tap to change your avata</Text>
          </View>

          <View style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ width: '80%' }} >Enter your username</Text>
              <TextInput
                placeholder="Enter username..."
                style={[styles.input]}
                onChangeText={(value) => setUsername(value)}
              />
            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <Text style={{ width: '80%' }}>Choose your birthdate</Text>
              <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text>
                  {
                    date.toLocaleDateString()
                  }
                </Text>
                <AntDesign name="calendar" size={24} color="black" style={{}} onPress={showDatepicker} />
              </View>
              {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                display={"spinner"}
                onChange={(event, value) => {
                  console.log(event, value)
                  onChange(event, value, show)
                }}
              />
            )}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Checkbox value={male} onValueChange={() => {
                setMale(!male)
                setFemale(false)
              }} />
              <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 30 }}>Male</Text>
              <Checkbox value={female} onValueChange={() => {
                setMale(false)
                setFemale(!female)
              }} />
              <Text style={{ fontSize: 18, marginLeft: 10 }}>Female</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={styles.btn} onPress={() => handleSubmit()}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export function SignUp({ navigation }) {
  const [cpassword, setCassword] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };



  const handleSubmit = () => {
    let checkEmail = validateEmail(email);
    let e = email
    if (checkEmail === true && password === cpassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User account created & signed in!");
          console.log("1:", e)
          navigation.navigate('FormInput', { email: e })
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
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', backgroundColor: 'rgb(76, 94, 192)', height: '28%' }}>
          <View style={{ flexDirection: 'column', marginTop: '18%' }}>
            <Text style={styles.textHeader}>Musdio 🎧</Text>
            <Text style={[styles.textHeader, { fontSize: 15 }]}>Welcome</Text>
          </View>
          <View style={{ marginTop: StatusBar.currentHeight }}>
            <Image
              source={require("../../assets/images/listen.png")}
              style={{ height: 165, width: 210 }}
            />
          </View>
        </View>
        <View style={styles.boxInput}>
          <View style={{ flexDirection: 'row', backgroundColor: 'rgb(223,223,223)', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <TouchableOpacity style={{ width: '50%', alignItems: 'center' }} onPress={() => { navigation.navigate('Login') }} >
              <Text style={[styles.textContent, styles.nonActive]}>Sign In</Text>
            </TouchableOpacity>
            <Text style={[styles.textContent, styles.Active]}>Sign Up</Text>
          </View>
          <View style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                placeholder="Enter email..."
                style={styles.input}
                onChangeText={(value) => setEmail(value)}
              />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter password..."
                style={styles.input}
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter confirm password..."
                style={styles.input}
                onChangeText={(value) => setCassword(value)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleSubmit}
          >
            <Text style={styles.btn}>SignUp</Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  box: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  boxInput: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: '-3%'
  },
  textHeader: {
    fontSize: 26,
    zIndex: 1,
    fontWeight: "400",
    color: 'white',
    marginLeft: '15%',
  },
  img: {
    width: "80%",
    height: "40%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#000",
    width: '80%',
    textAlignVertical: "center",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
  },
  textContent: {
    fontSize: 24,
    width: '50%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
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
  btn: {
    backgroundColor: "#00B0FF",
    padding: 10,
    fontSize: 20,
    color: "#000",
    borderRadius: 20,
    textAlign: "center",
    width: '40%',
  },
});
