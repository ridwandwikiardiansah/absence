import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { map } from 'lodash'
import color from "../../constant/color";
import Icon from  "react-native-vector-icons/FontAwesome"


const Home = (props) => {
    const [menu, setMenu] = useState([
        { title: 'Chat', logo: 'comments', color: color.Primary},
        { title: 'Presensi', logo: 'map-marker', color: 'green' },
        { title: 'Dashboard', logo: 'home', color: 'orange'},
        { title: 'Call', logo: 'headphones', color: 'purple'},
        { title: 'Data', logo: 'folder', color: 'aqua'},
        { title: 'Exit', logo: 'sign-out', color: 'red'},
    ])

    const onPressMenu = (data) => {
        console.log(data);
        
        if(data.title === 'Presensi'){
            props.navigation.navigate('Presensi')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Image style={styles.avatar} source={require('../../asset/1.png')} resizeMode="contain" />
                </View>
                <Text style={styles.username}>Cameron Williamson</Text>
                <Text style={styles.job}>Agent Staff</Text>
            </View>
            <View style={styles.menuContainer}>
                {
                    map(menu, (a,i) => (
                        <TouchableOpacity key={i} style={styles.cardMenu} onPress={()=> onPressMenu(a)}>
                            <Icon name={a.logo} style={styles.icon} size={50} color={a.color}/>
                        <Text style={styles.title}>{a.title}</Text>
                    </TouchableOpacity>
                    ))
                }
            </View>
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
    }
})