
import "../../Auth/SIgnUP/signup.css"
import AddUserForm from "../../../Component/Forms/AddUserForm";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../Context/UserContext";
export default function Updateuser() {


    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const id = window.location.pathname.split('/').slice(-1)[0];
    const userNow = useContext(User);
    const token = userNow.auth.token;
    useEffect(() => {
        const res =  axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {

        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
            .then((data) => {
                console.log(data);
                setemail(data.data[0].email);
                setname(data.data[0].name);
            })
    }, [])
    return (
        <div>
            <AddUserForm buttonName="Update" title="Update User" name={name} email={email} kind="update" id={id} />
        </div>

    )

}