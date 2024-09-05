import axios from 'axios';


const URL = "http://114.119.187.58/"

export const API = axios.create({
    baseURL: URL,
});

API.interceptors.request.use(
    async config => {
        // const token = await AsyncStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        // config.headers.referer = 'thecare'
        return config
    },
    error => {
        return Promise.reject(error)
    }
);