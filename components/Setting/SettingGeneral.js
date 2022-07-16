import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

function SettingGeneral({ navigation }) {
    const [user, setUser] = useState([]);
    const [isLoadingUser, setisLoadingUser] = useState(true);
    const getUsers = async () => {
        try {
            const response = await fetch('https://us-central1-musdio-6ec90.cloudfunctions.net/app/api/user/SaM1QW1nc2XwTIHAY5Cx');
            const json = await response.json().then(data => {
                setUser(data.data);
            })
        } catch (error) {
            console.error(error);
        } finally {
            setisLoadingUser(false);
        }
    }
    useEffect(() => {
        if (user.length == 0) {
            getUsers();
        }
    }, []);
    return (
        <LinearGradient
            colors={["#1565C0", "#000"]}
            end={[0.05, 0.5]}
            style={styles.LinearGradient}
        >
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Ionicons style={styles.iconHeader} name="ios-chevron-back" size={28} color="white"
                            onPress={() => {
                                navigation.navigate('Setting')
                                console.log('go back')
                            }}
                        />
                        <Text style={styles.textHeader} >Setting General</Text>
                    </View>
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75 }} />
                    <View style={styles.body}>
                        <View style={styles.info}>
                            <View style={styles.Avatar}>
                                <Image
                                    style={{ height: '100%', width: '100%', borderRadius: 100 }}
                                    source={{ uri: user.uri }} />
                            </View>
                            <View style={{ marginLeft: '100%', justifyContent: 'center' }}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio}>{user.bio}</Text>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Name</Text>
                                <Text style={styles.textCol2}>{user.username}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <FontAwesome name="edit" size={24} color="white" />
                                    <Text style={styles.textCol3}>Edit</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75, marginTop: 4, marginBottom: 10 }} />
                            {/* ============================ */}
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Email</Text>

                                <Text style={styles.textCol1}>{user.email}</Text>
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
                                <Text style={styles.textCol1}>Sex</Text>
                                <Text style={styles.textCol2}>{user.gender}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <FontAwesome name="edit" size={24} color="white" />
                                    <Text style={styles.textCol3}>Edit</Text>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1.75, marginTop: 4 }} />
                            {/* ============================ */}
                            {/* ============================ */}
                            <View style={styles.form}>
                                <Text style={styles.textCol1}>Birth date</Text>
                                <Text style={styles.textCol2}>{user.birthdate}</Text>
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
        marginLeft: '28%'
    },
    body: {
        flex: 1,
    },
    info: {
        marginTop: '5%',
        marginLeft: '30%',
        flex: 1,
        flexDirection: 'row',
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
    },
    Avatar: {
        width: '50%',
        height: '200%',
        borderRadius: '100%',
        paddingLeft: '10%'
      },
      option:{
        paddingTop: '10%'
      }
})

export default SettingGeneral;
