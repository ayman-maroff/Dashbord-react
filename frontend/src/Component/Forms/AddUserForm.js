/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import "../../Pages/Auth/SIgnUP/signup.css"
import Swal from "sweetalert2";
import swal from "sweetalert";
import { User } from "../../Pages/Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddUserForm(prop) {
    const cookie = new Cookies();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [Rpassword, setRpass] = useState("")
    const [accept, setAccept] = useState(false)
    const userNow = useContext(User);
    const token = userNow.auth.token;
    const nav = useNavigate();
    if (prop.kind === "update") {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log(prop.name+prop.email);
                    setName(prop.name);
                    setEmail(prop.email); // Update state
                } catch (error) {
                    // Handle any errors
                }
            };
            fetchData();
        }, [ prop.name, prop.email]);
    }
    async function Submit(e) {
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if (Rpassword !== password || password.length < 8 || name.length === 0 ? flag = false : flag = true);

        if (flag) {
            if (prop.kind === "regist") {
                try {
                    let res = await axios.post("http://127.0.0.1:8000/api/register", {
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: Rpassword,

                    });
                    if (res.status === 200) {
                        const token = res.data.data.token;
                        const userdetails = res.data.data.user;

                        userNow.setAuth({ token, userdetails });
                        cookie.set("Bearer", token, { path: '/' })
                        await swal({
                            title: "SUCCESS!",
                            text: "successfully registered! Welcome " + res.data.data.user.name,
                            icon: "success",
                            button: "oK",
                        })

                        nav("/dashbord");
                    }
                } catch (err) {
                    swal({
                        title: "failure!",
                        text: err.response.data.message,
                        icon: "error",
                        button: "oK",
                    })
                }
            }
            if (prop.kind === "update") {
                const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "Save the changes",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!"
                });

                if (result.isConfirmed) {
                    try {
                        const res = await axios.post(`http://127.0.0.1:8000/api/user/update/${prop.id}`, {
                            name: name,
                            email: email,
                            password: password,
                            password_confirmation: Rpassword,

                        }, {
                            headers: {

                                Accept: "application/json",
                                Authorization: "Bearer " + token,

                            },
                        });
                        if (res.status === 200) {
                            await swal({
                                title: "Update!",
                                text: "The info has been updated.",
                                icon: "success"
                            });
                            nav("/dashbord/users");
                        }
                    } catch (err) {
                        swal({
                            title: "failure!",
                            text: err.response.data.message,
                            icon: "error",
                            button: "oK",
                        })
                    }
                }

            }
            if (prop.kind === "add") {
                try {
                    let res = await axios.post("http://127.0.0.1:8000/api/user/create", {
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: Rpassword,

                    }, {
                        headers: {

                            Accept: "application/json",
                            Authorization: "Bearer " + token,

                        },
                    });
                    if (res.status === 200) {

                        await swal({
                            title: "SUCCESS!",
                            text: "User Added",
                            icon: "success",
                            button: "oK",
                        })


                        nav("/dashbord/users");
                    }
                }
                catch (err) {
                    swal({
                        title: "failure!",
                        text: err.response.data.message,
                        icon: "error",
                        button: "oK",
                    })
                }
            }
        }
    }
    return (
        <div>
            <div>
                <div className="signupFrm">
                    <form onSubmit={Submit} className="form">
                        <h1 className="title">{prop.title}</h1>

                        <div className="inputContainer">
                            <input type="email" className="input" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="" className="label">Email</label>
                        </div>

                        <div className="inputContainer">
                            <input type="text" className="input" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="" className="label">Username</label>

                        </div>
                        {name.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>UserName is required </p>}
                        <div className="inputContainer">
                            <input type="text" className="input" placeholder="" value={password} onChange={(e) => setPass(e.target.value)} />
                            <label htmlFor="" className="label">Password</label>

                        </div>
                        {password.length < 8 && accept && <p style={{ fontSize: 13, color: "red" }}>Password mast be more then 8 Char!</p>}
                        <div className="inputContainer">
                            <input type="text" className="input" placeholder="" value={Rpassword} onChange={(e) => setRpass(e.target.value)} />
                            <label htmlFor="" className="label">Confirm Password</label>

                        </div>
                        {Rpassword !== password && accept && <p style={{ fontSize: 13, color: "red" }}>Password dose not match!</p>}
                        <button type="submit" className="submitBtn">{prop.buttonName}</button>
                    </form>
                </div>


            </div>
        </div>
    )
}