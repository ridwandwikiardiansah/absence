import React from "react";
import { StyleSheet, View, Text } from "react-native";
import color from "../constant/color";
import Icon from 'react-native-vector-icons/Feather'

const Header = (props) => {
    return (
    <View style={styles.header}>
        <Icon name="arrow-left" size={35} color={color.White} onpress={()=>props.navigation.navigate.goBack()}/>
        <Text style={styles.titleHeader}>{props.title}</Text>
    </View>   
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: color.Primary,
        height: 140,
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
})

export default Header