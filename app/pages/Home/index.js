import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { map } from 'lodash'
import { API } from "../../util/api";
import color from "../../constant/color";
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = (props) => {
    const [menu, setMenu] = useState([
        { title: 'Chat', logo: 'comments', color: color.Primary },
        { title: 'Presensi', logo: 'map-marker', color: 'green' },
        { title: 'Dashboard', logo: 'home', color: 'orange' },
        { title: 'Call', logo: 'headphones', color: 'purple' },
        { title: 'Data', logo: 'folder', color: 'aqua' },
        { title: 'Exit', logo: 'sign-out', color: 'red' },
    ])
    const [notif, setNotif] = useState({})
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)


    const getNotif = async () => {
        const username = await AsyncStorage.getItem('username')
        const body = {
            page: 'lonceng',
            username: username
        }
        const getNotif = await API.post('fahim/lonceng.php', body)
        setNotif(getNotif.data)
    }

    const getDetail = async () => {
        const username = await AsyncStorage.getItem('username')
        const body = {
            page: 'detailuser',
            username: username
        }
        const getNotif = await API.post('fahim/detailuser.php', body)
        setUser(getNotif.data)
    }

    const onPressRefresh = () => {
        setLoading(true)
        getNotif();
        getDetail();

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }


    useEffect(() => {
        getNotif();
        getDetail();
    }, [])

    const onPressMenu = async (data) => {
        if (data.title === 'Presensi') {
            props.navigation.navigate('Presensi')
        } if (data.title === 'Exit') {
            Alert.alert('Berhasil Logout!')
            props.navigation.navigate('Login')
            await AsyncStorage.clear();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.notifContainer}>
                    <Image style={styles.avatar} source={require('../../asset/1.png')} resizeMode="contain" />
                    <View style={styles.notif}>
                        <Icon name={'bell'} size={25} />
                        <Text style={styles.textNotif}>{notif.data}</Text>
                    </View>

                </View>
                <Text style={styles.username}>Cameron Williamson</Text>
                <Text style={styles.job}>Agent Staff</Text>
            </View>
            <View style={styles.menuContainer}>
                {
                    map(menu, (a, i) => (
                        <TouchableOpacity key={i} style={styles.cardMenu} onPress={() => onPressMenu(a)}>
                            <Icon name={a.logo} style={styles.icon} size={50} color={a.color} />
                            <Text style={styles.title}>{a.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <TouchableOpacity style={styles.buttonRefresh} onPress={onPressRefresh}>
                <Icon name={'refresh'} size={50} color={color.White} />
            </TouchableOpacity>
            {
                loading ? <Image style={styles.loading} source={{ uri: 'https://media.tenor.com/hlKEXPvlX48AAAAj/loading-loader.gif' }} /> : null
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: color.Primary,
        height: '45%',
        borderBottomRightRadius: 60,
        borderBottomLeftRadius: 60,
        paddingTop: 70
    },
    avatar: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: color.White
    },
    username: {
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 40,
        color: color.White
    },
    job: {
        color: color.White,
        textAlign: 'center',
        fontSize: 20
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignSelf: 'center',
        width: '80%',
        marginTop: -100,


    },
    cardMenu: {
        backgroundColor: color.White,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 180,
        elevation: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '800'
    },
    icon: {
        marginBottom: 10,
    },
    notifContainer: {
        // flexDirection: 'row',
        alignSelf: 'center',
        // justifyContent: 'space-between',
        width: '100%'
    },
    notif: {
        backgroundColor: color.White,
        // height: 20,
        padding: 10,
        height: 45,
        // marginLeft: 70,
        borderRadius: 100,
        position: 'absolute',
        right: 50
    },
    textNotif: {
        backgroundColor: 'red',
        textAlign: 'center',
        color: color.White,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        position: 'absolute',
        right: -10,
        top: -10
    },
    buttonRefresh: {
        backgroundColor: color.Primary,
        padding: 20,
        position: 'absolute',
        right: 30,
        bottom: 50,
        borderRadius: 50
    },
    loading: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})