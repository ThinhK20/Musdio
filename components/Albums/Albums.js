import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Button, Header } from 'react-native-elements';
import { SafeAreaView, StatusBar, Platform, ScrollView,TouchableOpacity,Image} from 'react-native';
import styled from "styled-components";

function Albums(){ 
    return (
    <View style={{flex:1}}>       
        <View style={{flex:9}}>
            <Header
                centerComponent={{text: "Albums",style : {color: '#fff',fontSize:20,fontWeight: '500' }  }}
                leftComponent = {
                    <TouchableOpacity>
                    <Ionicons style={styles.headerLeft} name= "ios-chevron-back" size={28} color="white" />
                    </TouchableOpacity>
                }
            ></Header>
        </View>
        <View style={{flex:91,backgroundColor:'red'}}>
         <Image source={require('../../assets/images/Login.png')} style={styles.image} />
         <View>
             <Text style={styles.nameAlbums}>
                 CHIPU
             </Text>
         </View>
        </View>
        {/* <View style={styled.firstTime} >
        </View> */}
    </View>
    );

}

const styles = StyleSheet.create({
  container:{
    marginLeft:"30%",
    fontWeight:"bold",
    fontSize: 25,
  },
  image:{
    width:'100%',
    height:'50%'

  },
  nameAlbums:{
    width:'30%',
    height:'40%',
    fontWeight:"bold",
    fontSize: 24,
  }
  });

export default Albums;
