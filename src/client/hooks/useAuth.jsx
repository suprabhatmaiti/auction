import { jwtDecode } from "jwt-decode";
import { useState,useEffect, createContext, Children, useContext } from "react";
import { logoutUser} from '../utils/auth.js'

const AuthContext = createContext();

export const AuthProvider= ({children})=>{
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if(token && storedUser){
            try{
                const decoded = jwtDecode(token);
                const currentTime = Date.now()/1000;

                if(decoded.exp && decoded.exp>currentTime){
                    setUser(JSON.parse(storedUser));
                    
                    const remainingTime = (decoded.exp - currentTime)*1000;
                    const logoutTimer = setTimeout(()=>{
                        logoutUser();
                        setUser(null);
                        alert("Session expaired please login again.");
                        window.location.reload();
                
                    },remainingTime);
                    return clearTimeout(logoutTimer);
                }else{
                    logoutUser();
                }
            }catch(error){
                console.log(error);
                logoutUser();
            }
        }
    },[]);

    const logout = ()=>{
        logoutUser();
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
   



export default function useAuth(){
    return useContext(AuthContext);
}