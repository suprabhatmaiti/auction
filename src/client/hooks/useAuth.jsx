import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";
import api,{ setAccessToken} from '../utils/api.js';

const AuthContext = createContext();

export const AuthProvider= ({children})=>{
    const [user,setUser] = useState(null);

    const decodeAndSetUser = (token)=>{
        try{
            const decoded = jwtDecode(token);
            setUser(decoded);
            setAccessToken(token);
            
        }catch(error){
            console.log("Error decoding token:",error);
            setUser(null);
        }

    }
    // useEffect(()=>{
        
    //     if(token && storedUser){
    //         try{
    //             const decoded = jwtDecode(token);
    //             const currentTime = Date.now()/1000;

    //             if(decoded.exp && decoded.exp>currentTime){
    //                 setUser(JSON.parse(storedUser));
                    
    //                 const remainingTime = (decoded.exp - currentTime)*1000;
    //                 const logoutTimer = setTimeout(()=>{
    //                     logoutUser();
    //                     setUser(null);
    //                     alert("Session expaired please login again.");
    //                     window.location.reload();
                
    //                 },remainingTime);
    //                 return clearTimeout(logoutTimer);
    //             }else{
    //                 logoutUser();
    //             }
    //         }catch(error){
    //             console.log(error);
    //             logoutUser();
    //         }
    //     }
    // },[]);

    useEffect(()=>{
        async ()=> {
            try{
                const {accessToken}= await api.post('/api/auth/refresh-token');
                setAccessToken(accessToken);
                decodeAndSetUser(accessToken);
            }catch(error){
                console.log("Error refreshing token:",error);
                setUser(null); 
                setAccessToken(null);

            }
        }
    },[]);

    const register = async(payload)=>{
        try{
            const response = await api.post('/api/auth/register',payload);
            const {accessToken,user} = response.data;
            decodeAndSetUser(accessToken);
            setAccessToken(token);
            setUser(userData);
            return {accessToken,user};
        }catch(err){
            console.log("Error during registration:",err);
            throw err;
        }
    }

    //  const login = (userData, token) => {
    //     setAccessToken(token);
    //     setUser(userData);
    // };

    const login = async(payload)=>{
        try{
            const response = await api.post('/api/auth/login',payload);
            const {accessToken,user} = response.data;
            decodeAndSetUser(accessToken);
            return {accessToken,user};
        }catch(err){
            console.log("Error during login:",err);
            throw err;
        }
    }

    const logout = async()=>{
        try{
            await api.post('/api/auth/logout');
        }catch(error){
            console.log("Error during logout:",error);
        }finally{
            setUser(null);
            setAccessToken(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
    

export const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth;