import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://muktijoddha-hall-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;