import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { isEmpty } from 'lodash';
import Header from "../../component/Header";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import color from "../../constant/color";
import moment from "moment";
import Input from "../../component/Input";
import Geolocation from "@react-native-community/geolocation";


const Form = (props) => {
    const { params } = props.route
    const [username, setUsername] = useState('')
    const [infoLoc, setLoc] = useState();
    const [loading, setLoading] = useState(false)

    const onPressCamera = () => {
        props.navigation.navigate('Camera')
    }

    const getLocation = () => {
        Geolocation.getCurrentPosition((info) => {
            setLoc(info)
        });
    }

    useEffect(() => {
        getLocation()
    }, [])

    const onPressAbsen = async () => {
        setLoading(true)
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        const requestBody = new FormData();
        requestBody.append('fileToUpload', {
            uri: props.route.params.photo.uri,
            name: `${moment().format('YYYY-MM-DD HH:mm:ss:SS')}.jpeg`,
            type: 'image/jpeg'
        });
        requestBody.append('usernamefoto', username);
        requestBody.append('long', infoLoc.coords.longitude);
        requestBody.append('lat', infoLoc.coords.latitude);
        requestBody.append('page', 'presensi');
        try {
            const getList = await axios.post('http://114.119.187.58/fahim/presensi.php', requestBody, options)
            if (getList.status === 200) {
                Alert.alert('Absen Berhasil')
                setLoading(false)
                props.navigation.goBack();
            }
        } catch (e) {
            console.log(e, 'error')
            Alert.alert(e.response)
        }
    }

    return (
        <View style={styles.container}>
            <Header title={'Add Presensi'} />
            <View style={styles.content}>
                <Text style={styles.title}>Take a selfie photo</Text>
                <Text style={styles.subText}>Make sure your selfie clearly shows your self</Text>
                {
                    isEmpty(params) ? (
                        <TouchableOpacity style={styles.ImageContainer} onPress={onPressCamera}>
                            <Icon name={"plus"} size={40} />
                        </TouchableOpacity>
                    ) : (
                        <Image style={styles.icon} source={{ uri: props.route.params.photo.uri }} />
                    )
                }
                <Input label={'username'} handleChange={(a) => setUsername(a)} />
                <TouchableOpacity style={styles.button} onPress={onPressAbsen}>
                    <Text style={styles.textButton}>Presensi</Text>
                </TouchableOpacity>
            </View>
            {
                loading ? <Image style={styles.loading} source={{ uri: 'https://media.tenor.com/hlKEXPvlX48AAAAj/loading-loader.gif' }} /> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 40
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    subText: {
        textAlign: 'center'
    },
    ImageContainer: {
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: color.Primary,
        padding: 60,
        borderRadius: 10,
        marginVertical: 40
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: color.Primary,
        marginVertical: 30,
        borderRadius: 10
    },
    textButton: {
        color: color.White,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    icon: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginVertical: 30,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: color.Primary,
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

export default Form