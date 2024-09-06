import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Login";
import Dashboard from "../Home";
import Presensi from '../Presensi';
import Form from '../Form';
import Camera from '../../component/Camera';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createStackNavigator();


const Application = () => {

    return (
        <SafeAreaProvider>
            <App />
        </SafeAreaProvider>
    )
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: null }}
                />
                <Stack.Screen
                    name="Home"
                    component={Dashboard}
                    options={{ headerShown: null }}
                />
                <Stack.Screen
                    name="Presensi"
                    component={Presensi}
                    options={{ headerShown: null }}
                />
                <Stack.Screen
                    name="Form"
                    component={Form}
                    options={{ headerShown: null }}
                />
                <Stack.Screen
                    name="Camera"
                    component={Camera}
                    options={{ headerShown: null }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Application