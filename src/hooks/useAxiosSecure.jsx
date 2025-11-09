import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'https://smart-deals-server-three-alpha.vercel.app',
})



const useAxiosSecure = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    // set token in the header for all the api call  using axiosSecure hook
    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use((config) => {
            console.log(config);
            // config.headers.authorization = `Bearer ${user.accessToken}`
            config.headers.authorization = `Bearer ${user.accessToken}`
            return config
        })

        const responseInterceptor =  instance.interceptors.response.use(res => {
            return res
        }, err => {
            const status = err.status
            if(status === 401 || status === 403){
                console.log('logged out user for bad req');
                logout()
                .then(() => {
                    // navigate user to login page
                    navigate('login')
                })
            }
            console.log('error inside the interceptor', err);
        })
        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor)
        }
    }, [user.accessToken, logout, navigate])

    return instance
};

export default useAxiosSecure;