import { useContext, useEffect, useState } from "react";
import { User } from "../Context/UserContext";
import swal from 'sweetalert';
import axios from "axios";
import Cookies from 'universal-cookie';
import { Outlet } from "react-router-dom";
import LoadingScreen from "../../Component/Loading/Loading";
export default function PersistLogin() {
    const userNow = useContext(User);
    const token = userNow.auth.token;
    const [loading, setLoading] = useState(true);
    const cookie = new Cookies(null, { path: '/' });

    const getToken = cookie.get("Bearer");

    useEffect(() => {
        async function Refresh() {
            try {
                await axios.post(`http://127.0.0.1:8000/api/refresh`, null, {
                    headers: {
                        Authorization: "Bearer " + getToken,
                    },
                }).then((data) => {
                    cookie.set('Bearer', data.data.token, { path: '/' });
                    userNow.setAuth((prev) => {
                        return {
                            userdetails: data.data.user,
                            token: data.data.token
                        };
                    })
                });

            } catch (err) {

                swal({
                    title: "Failure!",
                    text: err.response.data.message,
                    icon: "error",
                    button: "OK"
                });
            } finally {
                setLoading(false);
            }
        }
        !token ? Refresh() : setLoading(false)
    }, []);

    return loading ? <LoadingScreen /> : <Outlet />

}