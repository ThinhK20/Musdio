import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Button, Header } from 'react-native-elements';
import { SafeAreaView, StatusBar, Platform, ScrollView,TouchableOpacity,ToastAndroid} from 'react-native';
import styled from "styled-components";
const showToastSetSuccessTime = () =>{
  ToastAndroid.show("The set was successful.",ToastAndroid.SHORT,ToastAndroid.CENTER);
};
const showToastTurnOff = () =>{
  ToastAndroid.show("Turn off was successful.",ToastAndroid.SHORT,ToastAndroid.CENTER);
};
function Sleep(){ 
    return (
    <View>       
        <Header
            centerComponent={{text: "Sleep Timer",style : {color: '#fff',fontSize:20,fontWeight: '500' }  }}
            leftComponent = {
                <TouchableOpacity>
                <Ionicons style={styles.headerLeft} name= "ios-chevron-back" size={28} color="white" />
                </TouchableOpacity>
            }
          ></Header>
        <View>
            <Text style={styles.container}>
              Stop Audio In
            </Text>
        </View>
        <View style={styled.firstTime} >
          <Button
          titleStyle={{
            fontSize:20,
            fontWeight:"bold",
          }}
          title={"5 Minutes"}
          type="clear"
          containerStyle={{
            marginTop:"5%",
          }}
          onPress ={()=>showToastSetSuccessTime()}
          />
          <Button
          titleStyle={{
            fontSize:20,
            fontWeight:"bold",
          }}
          title={"10 Minutes"}
          type="clear"
          containerStyle={{
            marginTop:"3%",
          }}
          onPress ={()=>showToastSetSuccessTime()}
          />

          <Button
          titleStyle={{
            fontSize:20,
            fontWeight:"bold",
          }}
          containerStyle={{
            marginTop:"3%",
          }}
          title={"20 Minutes"}
          type="clear"
          onPress ={()=>showToastSetSuccessTime()}
         />
          <Button
          containerStyle={{
            marginTop:"3%",
          }}          
          titleStyle={{
            fontSize:20,
            fontWeight:"bold",
          }}
          title={"30 Minutes"}
          type="clear"
          onPress ={()=>showToastSetSuccessTime()}
          />
        
          <Button
          containerStyle={{
            marginTop:"3%",
          }}          
          titleStyle={{
            fontSize:20,
            fontWeight:"bold",
          }}
          title={"45 Minutes"}
          type="clear"
          onPress ={()=>showToastSetSuccessTime()}
          />
        
          <Button
           containerStyle={{
            marginTop:"3%",
          }}         
          titleStyle={{
            fontSize:20,
            fontWeight:"bold",
          }}
          title={"1 Hour"}
          type="clear"
          onPress ={()=>showToastSetSuccessTime()}
          />
         
          <Button
          containerStyle={{
            marginTop:"3%",
          }}          
          titleStyle={{
            fontSize:20,
            fontWeight:"bold",
          }}
          title={"Turn Off Timer"}
          type="clear"
          onPress ={()=>showToastTurnOff()}
          />
         
        </View>
    </View>
    );

}

const styles = StyleSheet.create({
  container:{
    marginLeft:"30%",
    fontWeight:"bold",
    fontSize: 25,
  },
  firstTime: {
    marginTop:"50%",
    marginLeft:"5%",
    fontSize: 25,
    color: 'red',
  },
  Time:{
    marginTop:"3%",
    marginLeft:"5%",
    fontSize:25,
  }
  });

export default Sleep;
