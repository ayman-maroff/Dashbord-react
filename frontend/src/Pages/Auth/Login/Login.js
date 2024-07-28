import { useContext, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import './Login.css';
import Header from "../../../Component/Header/Header";
import { User } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const cookie = new Cookies();
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [accept, setAccept] = useState(false)
  const userNow = useContext(User);
  async function Submit(e) {

    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });


      const token = res.data.data.token;
      const userdetails = res.data.data.user;
      userNow.setAuth({ token, userdetails });
      cookie.set("Bearer", token,{ path: '/' })
      if (res.status === 200) {



        const result = await Swal.fire({
          title: "SUCCESS!",
          text: "successfully login welcome " + res.data.data.user.name,
          icon: "success",
          button: "oK",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok"
        });
        if (result.isConfirmed) {

          nav("/dashbord");

        }
      }




    } catch (err) {

      if (err.response) {
        // Check if "err.response" exists before accessing its properties
        await swal({
          title: "Failure!",
          text: err.response.data.message,
          icon: "error",
          button: "OK",
        });
      } else {
        // Handle other errors (e.g., network issues, server not reachable)
        console.error("An error occurred:", err);
      }
    }
  }
  return (
    <div><Header />

      <div className="login1">
        <h2>Login</h2><br></br>
        <img className="icon" src={require("../../../Assets/imags/user-Icon.jpg")} alt="logo" />
        <div id="error"></div>
        <form id="form1" onSubmit={Submit}>
          <div>


            <div className="inputContainer">
              <input type="email" className="input" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="" className="label">Email</label>
            </div>
            {email.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>Email field is empty!</p>}
          </div>
          <div>

            <div className="inputContainer">
              <input type="text" className="input" placeholder="" value={password} onChange={(e) => setPass(e.target.value)} />
              <label htmlFor="" className="label">Password</label>

            </div>
            {password.length === 0 && accept && <p style={{ fontSize: 13, color: "red" }}>Password field is empty!</p>}
          </div>
          <button className="btn" name="btn2" type="submit" value="" >
            login
          </button>
        </form>

      </div>

    </div>
  );
}