// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Button, View } from "react-native";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc  } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function ChatScreen() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  const sendDataToFirebase = async () => {
    const firestore = getFirestore();

    await setDoc(doc(firestore, "users", "20127334"), {
      phone: "0783877917",
      name: "Thịnh Nguyễn",
      age: "20",
    });
  };

  return (
    <View>
      <Button title="Send data" onPress={sendDataToFirebase} />
    </View>
  );
}

export default ChatScreen;
