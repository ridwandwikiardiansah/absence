import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "../../component/Input";
import color from "../../constant/color";
import { API } from "../../util/api";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onPressLogin = async () => {
        const body = {
            username: username,
            password: password,
            page: 'login'
        }
        const signin = await API.post('fahim/login.php', body)
        if (signin.data.status !== 'failed') {
            Alert.alert(signin.data.msg)
            await AsyncStorage.setItem('username', username)
            props.navigation.navigate("Home")
        } else {
            Alert.alert(signin.data.msg)
        }

    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.title}>Login to your account</Text>
                    <View style={styles.card}>
                        <Image style={styles.images} source={require('../../asset/1.png')} resizeMode="contain" />
                        <Input placeholder={'Masukkan Username'} label={'Username'} handleChange={(a) => setUsername(a)} />
                        <Input placeholder={'Masukkan Password'} label={'Password'} type={'password'} handleChange={(a) => setPassword(a)} color={'#000'} />
                        <TouchableOpacity style={styles.button} onPress={onPressLogin}>
                            <Text style={styles.textButton}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.Primary
    },
    content: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginVertical: 20,
        textAlign: 'center',
        color: color.White
    },
    card: {
        padding: 40,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: color.White,
        elevation: 10
    },
    button: {
        backgroundColor: color.Primary,
        marginVertical: 20,
        borderRadius: 10
    },
    textButton: {
        color: color.White,
        textAlign: 'center',
        padding: 10,
    },
    images: {
        alignSelf: 'center',
        width: 200,
        height: 200
    }
})

export default Login