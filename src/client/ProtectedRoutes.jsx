import {Navigate}from 'react-router-dom'
import useAuth from './hooks/useAuth'

function ProtectedRoutes({children}){
    const {isLoggedIn} = useAuth();

    if(!isLoggedIn){
        return <Navigate to='/' replace/>
    }

    return children;
}

export default ProtectedRoutes;