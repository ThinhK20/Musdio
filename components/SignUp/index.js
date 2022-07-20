import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import Checkbox from 'expo-checkbox';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { auth } from "../Firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from "expo-document-picker";
import { ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
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

  const onChange = (event, selectedDate) => {
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
              .then(()=> {
                navigation.navigate('LoadingSongs')
              })
              .catch((err) => console.log(err))
          })
          
      }

    );

  }

  return (
    <LinearGradient style={styles.container} colors={["#FBFBFB", "#588CDA"]}>

      <View style={styles.box}>
        <Text style={styles.textHeader}>Personal Info</Text>
        <View style={styles.boxInput}>
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

          <Text style={{ marginTop: 40 }}>Enter your username</Text>
          <TextInput
            placeholder="Enter username..."
            style={styles.input}
            onChangeText={(value) => setUsername(value)}
          />
          <Text style={{ marginTop: 20 }}>Choose your birthdate</Text>
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
              onChange={onChange}
            />
          )}
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
          style={{ marginTop: 30, width: "80%" }}
        >
          <Text style={styles.btn} onPress={() => handleSubmit()}>Submit</Text>
        </TouchableOpacity>
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
          console.log("1:",e)
          navigation.navigate('FormInput',{email: e})
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
      <TouchableOpacity style={styles.prevBtn} onPress = {() => {navigation.navigate('Login')}}>
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
    paddingTop: "10%",
    position: 'relative',
  },
  textHeader: {
    fontSize: 26,
    left: 10,
    paddingTop: 10,
    zIndex: 1,
    fontWeight: "400",
    position: "absolute",
  },
  img: {
    width: "80%",
    height: "40%",
  },
  boxInput: {
    width: "80%",
    marginTop: 30,
  },
  input: {
    borderWidth: 2,
    borderColor: "#000",
    minWidth: 270,
    textAlignVertical: "center",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
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
