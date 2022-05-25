import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

function SettingGeneral() {
    const [profile, setProfile] = useState({
        avataURL: 'https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-1/92493693_1056085851445464_3482286615181656064_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=L05-MUmxVWsAX8SiE_z&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT9DrZSeH6h9pO2XVL4-DH9l7NMQmvdOCgkOWNogSZpcNQ&oe=62B4E465',
        name: 'Minh đơm',
        bio: 'Mr Quang Tèo',
        mail: 'minhnhox792@gmail.com',
        birthDate: '30/2/2002'
    })
    return (
        <LinearGradient
            colors={["#1565C0", "#000"]}
            end={[0.05, 0.5]}
            style={styles.LinearGradient}
        >
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Ionicons style={styles.iconHeader} name="ios-chevron-back" size={28} color="white" />
                        <Text style={styles.textHeader} >Setting General</Text>
                    </View>
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75 }} />
                    <View style={styles.body}>
                        <View style={styles.info}>
                            <Image style={styles.avata}
                                source={{
                                    uri: profile.avataURL
                                }}
                            />
                            <View style={{ marginLeft: '10%', justifyContent: 'center' }}>
                                <Text style={styles.name}>{profile.name}</Text>
                                <Text style={styles.bio}>{profile.bio}</Text>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Name</Text>
                                <Text style={styles.textCol2}>{profile.name}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <FontAwesome name="edit" size={24} color="white" />
                                    <Text style={styles.textCol3}>Edit</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75, marginTop: 4, marginBottom: 10 }} />
                            {/* ============================ */}
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Mail</Text>
                                <Text style={styles.textCol2}>{profile.mail}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <FontAwesome name="edit" size={24} color="white" />
                                    <Text style={styles.textCol3}>Edit</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75, marginTop: 4, marginBottom: 10 }} />
                            {/* ============================ */}
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Password</Text>
                                <Text style={styles.textCol2}>*************</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <FontAwesome name="edit" size={24} color="white" />
                                    <Text style={styles.textCol3}>Edit</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75, marginTop: 4, marginBottom: 10 }} />
                            {/* ============================ */}
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Bio</Text>
                                <Text style={styles.textCol2}>{profile.bio}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <FontAwesome name="edit" size={24} color="white" />
                                    <Text style={styles.textCol3}>Edit</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75, marginTop: 4, marginBottom: 10, }} />
                            {/* ============================ */}
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Birth date</Text>
                                <Text style={styles.textCol2}>{profile.birthDate}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <FontAwesome name="edit" size={24} color="white" />
                                    <Text style={styles.textCol3}>Edit</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75, marginTop: 4 }} />
                            {/* ============================ */}
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
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textHeader: {
        
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: '25%'
    },
    body: {
        flex: 1,
    },
    info: {
        marginTop: 30,
        marginLeft: 30,
        flex: 1,
        flexDirection: 'row',
    },
    avata: {
        height: 100,
        width: 100,
        borderRadius: 100
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    bio: {
        color: 'white',
        fontWeight: '300',
        fontSize: 20,
    },
    form: {
        flexDirection: 'row',
        marginTop: 40,

        width: '100%',
        justifyContent: 'space-between'
    },
    textCol1: {
        marginLeft: 10,
        color: 'white',
        fontSize: 20,
    },
    textCol2: {
        color: 'white',
        fontSize: 20,
    },
    textCol3:
    {
        marginRight: 10,
        color: 'white',
        fontSize: 20,
    }
})

export default SettingGeneral;
