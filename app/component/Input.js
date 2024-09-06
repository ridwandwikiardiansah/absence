import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Color from '../constant/color'
import Icon from 'react-native-vector-icons/Entypo';


const Input = (props) => {
    const [secure, setSecure] = useState(true)
    const [isTextInputFocused, setTextInputFocused] = useState(false)
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>{props.label}</Text>
                {
                    props.required ? <Text style={{ color: 'red' }}>*</Text> : null
                }

            </View>
            <View style={[styles.input, { borderColor: Color.Primary }]}>
                {
                    props.icon ? (
                        <Icon style={styles.icon} name={props.name} size={props.size} color={props.color} />
                    ) : null
                }
                <TextInput
                    placeholder={props.placeholder}
                    value={props.value}
                    onChangeText={props.handleChange}
                    numberOfLines={props.line}
                    secureTextEntry={props.type === 'password' ? secure : false}
                    placeholderTextColor={'grey'}
                    inputMode={props.mode}
                    style={styles.inputs}
                    editable={props.disabled}
                    onPressIn={props.onPress}
                    onFocus={() => setTextInputFocused(false)}
                    onSubmitEditing={() => setTextInputFocused(false)}
                    onEndEditing={() => setTextInputFocused(false)}
                />
                {
                    props.type === 'password' ? (
                        <TouchableOpacity style={styles.iconPassword} onPress={() => setSecure(!secure)}>
                            <Icon name={secure ? 'eye' : 'eye-with-line'} color={props.color} size={20} />
                        </TouchableOpacity>
                    ) : null
                }
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        marginTop: 10,
        color: '#000'
        // padding: 10,
    },
    input: {
        width: '100%',
        paddingRight: 10,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Color.Grey,
        flexDirection: 'row',
        // padding: 10,
        alignItems: 'center',
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 20
    },
    placeholder: {
        color: 'grey',
    },
    icon: {
        marginLeft: 10,
        marginRight: 10
    },
    iconPassword: {
        position: 'absolute',
        right: 10
    },
    inputs: {
        width: '103%',
        paddingLeft: 10,
        color: '#000'
    }
})

export default Input