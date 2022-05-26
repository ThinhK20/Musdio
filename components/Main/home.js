import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, {useState} from 'react';
import { SafeAreaView, StatusBar, Platform, ScrollView,Image } from 'react-native';
export default function HomeScreen() {
    const [musicplayed, setMusic] = useState([
        {name: 'quang tèo đi qua đèo',img: require('../../assets/images/Recently/qtdqd.jpg')},
        {name: 'buông hàng', img: require('../../assets/images/Recently/bh.jpg')},
        {name: 'một điếu',img: require('../../assets/images/Recently/1d.jpg')},
        {name: 'Youngz',img: require('../../assets/images/Recently/youngz.jpg')},
        {name: 'côn đồ trên con đò',img: require('../../assets/images/Recently/hqdefault.jpg')},
        {name: 'bát quái', img: require('../../assets/images/Recently/bq.jpg')}
    ]);
    const [trend, trendMusic] = useState([
        {name: '',img: require('../../assets/images/Recently/qtdqd.jpg')},
        {name: 'buông hàng', img: require('../../assets/images/Recently/bh.jpg')},
        {name: 'một điếu',img: require('../../assets/images/Recently/1d.jpg')},
        {name: 'Youngz',img: require('../../assets/images/Recently/youngz.jpg')},
        {name: 'côn đồ trên con đò',img: require('../../assets/images/Recently/hqdefault.jpg')},
        {name: 'bát quái', img: require('../../assets/images/Recently/bq.jpg')}
    ]);
    const [hot, hotMusic] = useState([
        {name: '',img: require('../../assets/images/Recently/qtdqd.jpg')},
        {name: 'buông hàng', img: require('../../assets/images/Recently/bh.jpg')},
        {name: 'một điếu',img: require('../../assets/images/Recently/1d.jpg')},
        {name: 'Youngz',img: require('../../assets/images/Recently/youngz.jpg')},
        {name: 'côn đồ trên con đò',img: require('../../assets/images/Recently/hqdefault.jpg')},
        {name: 'bát quái', img: require('../../assets/images/Recently/bq.jpg')}
    ]);
    return (
        <LinearGradient
            colors={["#171518", "#171518"]}
            end={[0.05, 0.5]}
            style={styles.LinearGradient}
        >
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                <View style={styles.header}>
            
                    <Text style={styles.textHeader}>Home</Text>
                </View>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75 }} />
                <View style={styles.body}>
                    <View style = {styles.option}>
                        <View style = {styles.formOption}>
                            <Text style = {styles.textForm}>Recently Played</Text>
                            <ScrollView style = {styles.scrollHorizontal}
                            horizontal = {true}>
                            { musicplayed.map((music, index) => {
                                return (
                                    
                                    <View key={index}>
                                        <Image style = {styles.img}
                                            source = {music.img}
                                        />
                                        <Text style = {styles.textDivForm}>{music.name}</Text>
                                    </View>
                                )
                            })}
                            </ScrollView>
                        </View>
                        {/* ========================================= */}
                        <View style = {styles.formOption}>
                            <Text style = {styles.textForm}>Trend</Text>
                            <ScrollView style = {styles.scrollHorizontal}
                            horizontal = {true}>
                            { musicplayed.map((music, index)=> {
                                return (
                                    
                                    <View key={index}>
                                        <Image style = {styles.img}
                                            source = {music.img}
                                        />
                                        <Text style = {styles.textDivForm}>{music.name}</Text>
                                    </View>
                                )
                            })}
                            </ScrollView>
                        </View>
                        {/* ====================================== */}
                        <View style = {styles.formOption}>
                            <Text style = {styles.textForm}>Hot Music</Text>
                            <ScrollView style = {styles.scrollHorizontal}
                            horizontal = {true}>
                            { musicplayed.map((music, index) => {
                                return (
                                    
                                    <View key ={index}>
                                        <Image style = {styles.img}
                                            source = {music.img}
                                        />
                                        <Text style = {styles.textDivForm}>{music.name}</Text>
                                    </View>
                                )
                            })}
                            </ScrollView>
                        </View>
                        {/* ====================================== */}
                        <View style = {styles.formOption}>
                            <Text style = {styles.textForm}>Category</Text>
                            <ScrollView style = {styles.scrollHorizontal}
                            horizontal = {true}>
                            { musicplayed.map((music, index) => {
                                return (
                                    
                                    <View key={index}>
                                        <Image style = {styles.img}
                                            source = {music.img}
                                        />
                                        <Text style = {styles.textDivForm}>{music.name}</Text>
                                    </View>
                                )
                            })}
                            </ScrollView>
                        </View>
                        {/* ====================================== */}
                    </View>
                </View>
                </ScrollView>
                
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    LinearGradient: {
        flex: 1,

    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    header: {
        flex: 1,
    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        left: '2%'
    },
    body: {
        flex: 1,
    },
    option: {
        flex: 1,
    },
    textForm: {
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    scrollHorizontal: {
        flexDirection: 'row'
        
    },
    img: {
        width: 100,
        height: 100,
        marginLeft: 14,
        marginRight: 20,
    },
    textDivForm: {
        color: 'white',
        marginLeft: 14,
        width: 100,
        justifyContent: 'center',
        textAlign: 'center'
    },
    formOption: {
        flex: 1,
        backgroundColor: 'yellow',
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#201E21',
    }
});