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
    
import React, { useState,useRef } from 'react'
import { SafeAreaView, View, ScrollView, Text, Dimensions, TouchableOpacity, Animated,StyleSheet,ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import CountDownTimer from "react-native-countdown-timer-hooks";



const AboutUs = () => {

    const { height, width } = Dimensions.get('window')
    const SCREEN_HEIGHT = Math.round(height)
    const SCREEN_WIDTH = Math.round(width)
    // Animation
    const startValue = new Animated.Value(Math.round(height + height * 0.7))
    const endValue = Math.round(height - height * 0.7)
    const duration = 1000


    const [saveTime,setSaveTime]=useState(false);
    const refTimer = useRef();
    const [timerEnd, setTimerEnd] = useState(0);
    const showToastSetSuccessTime = () => {
        _showBottomView('HIDE')
        refTimer.current.resetTimer()
        ToastAndroid.show(
          "The set was successful.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        _showBottomView('HIDE')
      };
      const showToastTurnOff = () => {
        ToastAndroid.show(
          "Turn off was successful.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      };

    const timerCallbackFunc = () => {
        console.log('minh');
    };

    const _showBottomView = (key) => {
       
        const toValue = key === 'HIDE' ? height : endValue

        Animated.timing(startValue, {
            toValue,
            duration: duration,
            useNativeDriver: true,
        }).start()

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            {/* Header */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'black', margin: 5 }}>
                <Text>
                    Header
                </Text>
            </View>

            <View style={{ flex: 9, borderWidth: 1, borderColor: 'black', margin: 5 }}>
                <ScrollView
                    style={{ flex: 1 }}>

                    {/* Title View */}

                    <View style={{ height: SCREEN_HEIGHT * 0.2, width: '95%', borderColor: 'black', borderWidth: 1, marginLeft: '2.5%', marginTop: SCREEN_HEIGHT * 0.01, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => _showBottomView()}
                            style={{ height: SCREEN_HEIGHT * 0.065, width: '75%', borderRadius: 5, borderWidth: 1, borderColor: 'green', alignItems: 'center', justifyContent: 'center', }}>
                            <Text>
                                SHOW BOTTOM VIEW
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            {/* Bottom view */}
        
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        height: height * 0.7,
                        width: width,
                        backgroundColor: 'blue',
                        alignItems: 'center', justifyContent: 'center',
                        borderTopRightRadius: 23, borderTopLeftRadius: 23,
                        transform: [
                            {
                                translateY: startValue
                            },
                        ],
                    },
                ]} >
                <View>
                  <TouchableOpacity
                      activeOpacity={0.1}
                      onPress={() => _showBottomView('HIDE')}
                      style={{ width: '75%', borderRadius: 5, borderWidth: 1,marginLeft:'70%',marginBottom:'10%'}}>
                      <View>
                        <Ionicons name="chevron-down" size={25} color="white" />
                      </View>
                  </TouchableOpacity>
                  <View style={styles.TimeScreen}>
                    <CountDownTimer
                            ref={refTimer}
                            timestamp={timerEnd}
                            timerCallback={timerCallbackFunc}
                            containerStyle={{
                            height: 56,
                            width: 120,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 35,
                            backgroundColor: "#2196f3",
                            }}
                            textStyle={{
                            fontSize: 25,
                            color: "#FFFFFF",
                            fontWeight: "500",
                            letterSpacing: 0.25,
                            }}
                        />
                    </View>
                </View>
                  <TouchableOpacity style={styles.TimeButton}   onPress={() => {
                    setTimerEnd(5 * 60),showToastSetSuccessTime(),_showBottomView('HIDE')}}>
                    <View >
                      <Text>5p</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.TimeButton} >
                    <View >
                      <Text>15p</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.TimeButton} >
                    <View >
                      <Text>30p</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.TimeButton} >
                    <View >
                      <Text>1h</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.TimeButton} >
                    <View >
                      <Text>Cancel</Text>
                    </View>
                  </TouchableOpacity>

            </Animated.View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
 TimeButton:{
    backgroundColor:'red',
    color:'red',
    height:'10%',
    width:'100%',
    alignItems: 'center', justifyContent: 'center',
    marginBottom:20,
 },
 TimeScreen:{
    alignItems: 'center', justifyContent: 'center',
    marginBottom:20,
 }
});
export default AboutUs