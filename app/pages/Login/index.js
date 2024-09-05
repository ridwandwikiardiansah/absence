import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "../../component/Input";
import color from "../../constant/color";
import { API } from "../../util/api";



const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onPressLogin = async () => {
        const body = {
            usernamelogin: username,
            passwordlogin: password,
            page: 'login'
        }
        const signin = await API.post('fahim/login.php', body)
        console.log(signin);
        
        if(signin.data.status !== 'failed'){
            Alert.alert(signin.data.msg)
            props.navigation.navigate("Home")
        }else{
            Alert.alert(signin.data.msg)
        }
        
    }


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Login to your account</Text>
                <View style={styles.card}>
                    <Image style={styles.images} source={require('../../asset/1.png')} resizeMode="contain"/>
                    <Input placeholder={'Masukkan Username'} label={'Username'} handleChange={(a)=> setUsername(a)}/>
                    <Input placeholder={'Masukkan Password'} label={'Password'} type={'password'} handleChange={(a)=>setPassword(a)}/>
                    <TouchableOpacity style={styles.button} onPress={onPressLogin}>
                        <Text style={styles.textButton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
        marginVertical: 50,
        textAlign: 'center',
        color: color.White
    },
    card: {
        padding: 40,
        elevation: 5,
        borderRadius: 20,
        backgroundColor: color.White
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
        width: 300,
        height: 300
    }
})

export default Login