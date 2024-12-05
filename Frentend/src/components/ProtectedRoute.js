import { useSelector } from "react-redux";
import {  Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const token = useSelector((state)=>state.auth.token)
    if (!token) return <Navigate to="/registration" />
    return children;
   

}
