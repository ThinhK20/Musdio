// import React from 'react';
// import { Button, Center, PresenceTransition, NativeBaseProvider } from 'native-base';

// const AboutUs = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   return <Center>
//       <Button shadow={2} onPress={() => setIsOpen(!isOpen)}>
//         {isOpen ? 'Hide' : 'Show'}
//       </Button>
//       <PresenceTransition visible={isOpen} initial={{
//       opacity: 0
//     }} animate={{
//       opacity: 1,
//       transition: {
//         duration: 250
//       }
//     }}>
//         <Center mt="7" bg="teal.500" rounded="md" w="200" h="100" _text={{
//         color: 'white'
//       }} shadow={2}>
//           Fade
//         </Center>
//       </PresenceTransition>
//     </Center>;
// };

//     export default () => {
//         return (

//           <NativeBaseProvider>
//             <Center flex={1} px="10">
//                 <AboutUs />
//                 <AboutUs />
//                 <AboutUs />
//             </Center>
//           </NativeBaseProvider>
//         );
//     };

import React, { useState, useRef } from 'react'
import { SafeAreaView, View, ScrollView, Text, Dimensions, TouchableOpacity, Animated, StyleSheet, ToastAndroid, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";



const AboutUs = () => {

  return (
    <LinearGradient
      colors={["#27153E", "#27153E"]
      }
      style={styles.LinearGradient}
    >
      <ImageBackground source={{ uri: "https://media.discordapp.net/attachments/977411778671677471/1000027427046694942/unknown.png?width=400&height=701" }} resizeMode="cover" style={styles.image}>
        <View >
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={styles.iconBack}>
              <Ionicons name="ios-chevron-back" size={40} color="white" fontWeight='bold' />
            </TouchableOpacity>
            <View style={{ paddingTop: '1%', alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingLeft: '10%' }}>
              <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'white',
              }}> ABOUT US</Text>
            </View>
          </View>

          <View style={styles.location} >
            <View style={styles.item}>
              <Text style={styles.group} > MUSDIO APP</Text>
            </View>
          </View>
          <View style={styles.location} >
            <View style={styles.item2}>
              <Text style={styles.group4} >Member</Text>
              <View style={{ paddingTop: '30%' }}>
                <Text style={styles.group2} > 1. Trần Tuấn Minh</Text>
              </View>
              <Text style={styles.group2} > 2. Nguyễn Đăng Minh</Text>
              <Text style={styles.group2} > 3. Nguyễn Phát Thịnh</Text>
              <Text style={styles.group2} > 4. Nguyễn Sanh Tài</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  location: {
    //alignContent: 'center',
    alignItems: 'center',
    //justifyContent: 'center',
    // paddingTop:'30%',
    //backgroundColor: 'blue',

  },
  iconBack: {
    width: '30%',
    paddingRight:"10%"
  },
  group: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    padding: 30,
    backgroundColor: '#A821FF',
    borderRadius: 30,
  },
  group4: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    padding: 30,
    backgroundColor: '#A821FF',
    borderRadius: 30,
    paddingLeft:'27%',
  },
  group2: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    width: '100%',
    height: '35%',
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    width: '100%',
    height: '65%',
    borderRadius: 30,
  },
  LinearGradient: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40
  },
});
export default AboutUs