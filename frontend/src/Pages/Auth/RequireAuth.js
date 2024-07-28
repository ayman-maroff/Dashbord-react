import { useContext } from "react";
import { User } from "../Context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export default function RequireAth() {
    const userNow = useContext(User)
    const location = useLocation();
    return (
        userNow.auth.userdetails ? (<Outlet />) : (<Navigate state={{ from: location }} replace to="/LogIn" />)
    );
}