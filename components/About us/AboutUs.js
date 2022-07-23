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
import { SafeAreaView, View, ScrollView, Text, Dimensions, TouchableOpacity, Animated, StyleSheet, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import CountDownTimer from "react-native-countdown-timer-hooks";



const AboutUs = () => {

  return (
    <View >
      <View  style={{ flexDirection: 'row', }}>
        <TouchableOpacity style={styles.iconBack}>
          <Ionicons name="ios-chevron-back" size={40} color="white" fontWeight='bold' />
        </TouchableOpacity>
        <View style={{paddingTop:'10%',alignItems: 'center',justifyContent:'center',alignContent:'center',paddingLeft:'10%'}}>
          <Text> ABOUT US</Text>
        </View>
      </View>

      <View style={styles.location} >
        <View style={styles.item}>
          <Text style={styles.group} > MUSDIO APP</Text>
        </View>
      </View>
      <View style={styles.location} >
        <View style={styles.item2}>
          <Text style={styles.group} > Member implemented</Text>
          <View style={{ paddingTop: '30%' }}>
            <Text style={styles.group2} > 1. Trần Tuấn Minh</Text>
          </View>
          <Text style={styles.group2} > 2. Nguyễn Đăng Minh</Text>
          <Text style={styles.group2} > 3. Nguyễn Phát Thịnh</Text>
          <Text style={styles.group2} > 4. Nguyễn Sanh Tài</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  location: {
    //alignContent: 'center',
    alignItems: 'center',
    //justifyContent: 'center',
    // paddingTop:'30%',
    backgroundColor: 'blue',

  },
  iconBack: {
    paddingTop: '10%',
    paddingLeft: '5%',
    width: '30%',
    backgroundColor: "red",
  },
  group: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    padding: 30
  },
  group2: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    width: '80%',
    height: '35%',
    backgroundColor: 'red',
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    width: '80%',
    height: '65%',
    backgroundColor: 'red',
    borderRadius: 30,
  }
});
export default AboutUs