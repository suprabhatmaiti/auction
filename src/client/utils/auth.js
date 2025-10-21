import {jwtDecode} from 'jwt-decode';


export function isUserLoggedIn(){
    const token = localStorage.getItem("token");
    if(!token) return false;

    try{
        const decoded = jwtDecode(token);
        const currentTime = Date.now()/1000;

        if(decoded.exp && decoded.exp<currentTime){
            logoutUser();
            return false;
        }

        return true;
    }catch(error){
        console.log(error);
        logoutUser();
        return false;
    }
}


export function getUser(){
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user):null;
}

export function logoutUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}
