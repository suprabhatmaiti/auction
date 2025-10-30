import axios from "axios";

let accessToken = null;

const api= axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true,
});

export const setAccessToken = (token) => {
    accessToken = token;
};  

api.interceptors.request.use((config)=>{
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(response=>{
    return response;
},

    async(error)=>{
        return Promise.reject(error);
    }
);

export default api;