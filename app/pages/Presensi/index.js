import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { API } from "../../util/api";
import color from "../../constant/color";
import Icon from 'react-native-vector-icons/Feather'
import Header from "../../component/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Presensi = (props) => {
    const [list, setList] = useState([])

    const getList = async () => {
        const username = await AsyncStorage.getItem('username')
        const body = {
            page: 'listpresensi', 
            username: username
        }
        const getNotif = await API.post('fahim/getlistpresensi.php', body)
        setList(getNotif.data)
    }

    useEffect(()=> {
        getList();
    },[])

    const onPressPresensi = () => {
        props.navigation.navigate('Form')
    }

    return (
        <View style={styles.container}>
           <Header title={'List Presensi'}/>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.card}>
                    <View style={styles.avatarContainer}>
                        <Image source={require("../../asset/1.png")} resizeMode="contain" style={styles.avatar} />
                        <View>
                            <Text>Cameron Williamson</Text>
                            <Text>Agent Staff</Text>
                        </View>
                    </View>
                    <View style={styles.rows}>
                    <View style={styles.row}>
                        <Icon style={styles.icon} name={'calendar'} size={20} color={'red'}/>
                        <Text>23-09-2023 | 08:23 Am</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon style={styles.icon} name={'map-pin'} size={20} color={'green'}/>
                        <Text>Jalan Pegangsaan...</Text>
                    </View>
                    </View>
                   
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={onPressPresensi}>
                <Icon name={'plus'} size={20} color={color.White}/>
                <Text style={styles.textButton}>Presensi</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: color.Primary,
        height: 160,
        alignItems: 'center',
        paddingHorizontal: 40,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60
    },
    titleHeader: {
        fontSize: 25,
        color: color.White,
        marginLeft: 20
    },
    content: {
        paddingVertical: 20
    },
    card: {
        width: '100%',
        padding: 20,
        elevation: 10,
        alignSelf: 'center',
        backgroundColor: color.White,
        borderRadius: 10
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    scroll: {
        padding: 20
    },
    button: {
        position: 'absolute',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent : 'center',
        alignItems: 'center',
        backgroundColor: color.Primary,
        marginVertical: 20,
        borderRadius: 10
    }, 
    textButton: {
        color: color.White,
        textAlign: 'center',
        padding: 12,   
        marginLeft: 5,
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})

export default Presensi