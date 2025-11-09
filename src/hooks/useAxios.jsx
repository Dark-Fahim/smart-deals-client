import axios from "axios"


const instance = axios.create({
    baseURL: 'https://smart-deals-server-three-alpha.vercel.app',
})

const useAxios = () => {
    return instance

}

export default useAxios