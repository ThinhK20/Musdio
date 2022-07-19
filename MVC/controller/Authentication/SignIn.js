import { getAuth, signInWithEmailAndPassword,onAuthStateChanged,signOut, isSignInWithEmailLink  } from "firebase/auth";
import { auth } from "../../../components/Firebase/index"; 
import { user } from '../../Model/user'

import * as Facebook from "expo-facebook";
import { useDispatch, useSelector } from "react-redux";
import { setImageAvatarStatus, setLogginStatus, setUser } from "../Redux/facebookSlider";

export const setemail = (setEmail,value) =>{
    setEmail(value)
}

export const setpassword = (setPassword,value) =>{
    setPassword(value)
}

export const checkpassword = (password,setCheckPassword) => {
    setCheckPassword(password.length < 6)
}
export const checkemail = (email, setCheckEmail) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    setCheckEmail(!email.match(validRegex))
}
export const isEmail = (checkEmail) => {
    return checkEmail
}
export const isPassword = (checkPassword) => {
    return checkPassword
}

 const setUpUser = () => {
    
}

export const handleSubmit = (navigation, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUpUser()
            navigation.navigate("LoadingSongs");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + "\n" + errorMessage)
        });
}
