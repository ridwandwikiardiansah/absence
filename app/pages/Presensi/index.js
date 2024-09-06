import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { API } from "../../util/api";
import color from "../../constant/color";
import {map} from 'lodash';
import Icon from 'react-native-vector-icons/Feather'
import Header from "../../component/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";


const Presensi = (props) => {
    const [list, setList] = useState([])
    console.log(list);
    

    const getList = async () => {
        const username = await AsyncStorage.getItem('username')
        const body = {
            page: 'listpresensi', 
            username: username
        }
        const getNotif = await API.post('fahim/getlistpresensi.php', body)
        setList(getNotif.data.data)
    }

    useEffect(()=> {
        getList();
    },[])

    const onPressPresensi = () => {
        props.navigation.navigate('Form')
    }

    return (
        <View style={styles.container}>
           <Header title={'List Presensi'} back={()=> props.navigation.goBack()}/>
            <ScrollView contentContainerStyle={styles.scroll}>
                {
                    map(list,(a,i) => (
                        <View style={styles.card} key={i}>
                        <View style={styles.avatarContainer}>
                            <Image source={{uri: a.linkfoto}} resizeMode="contain" style={styles.avatar} />
                            <View style={styles.usernameContainer}>
                                <Text style={styles.text}>{a.username}</Text>
                                <Text style={styles.text}>{a.job}</Text>
                            </View>
                        </View>
                        <View style={styles.rows}>
                        <View style={styles.row}>
                            <Icon style={styles.icon} name={'calendar'} size={20} color={'red'}/>
                            <Text style={styles.text}>{moment(a.tanggal).format('DD-MM-YYYY') + ' | ' + moment(a.tanggal).format('HH:mm:a')}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon style={styles.icon} name={'map-pin'} size={20} color={'green'}/>
                            <Text style={styles.lokasi}>{a.lokasi}</Text>
                        </View>
                        </View>
                    </View>
                    ))
                }
               
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={onPressPresensi}>
                <Icon name={'plus'} size={18} color={color.White}/>
                <Text style={styles.textButton} numberOfLines={1}>Presensi</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    images: {
        marginRight: 20
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: color.Primary,
        height: 120,
        alignItems: 'center',
        paddingHorizontal: 40,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60
    },
    usernameContainer: {
        marginLeft: 20
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
        paddingHorizontal: 10,
        elevation: 10,
        alignSelf: 'center',
        backgroundColor: color.White,
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: color.Primary
    },
    scroll: {
        padding: 20,
        marginVertical: 20
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
        borderRadius: 10
    }, 
    textButton: {
        color: color.White,
        textAlign: 'center',
        padding: 12,   
        marginLeft: 5,
        fontSize: 18
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 5
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    text:{ 
        color:'#000',
    },
    lokasi: {
        color: '#000',
        width: 100
    }
})

export default Presensi