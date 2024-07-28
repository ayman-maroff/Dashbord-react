import './Header.css';
import Swal from "sweetalert";
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { User } from '../../Pages/Context/UserContext';
import Cookies from 'js-cookie';
//import SingUp from "../../View/SIgnUP/SignUp";
export default function Header() {
	const userNow = useContext(User);
	console.log(userNow);
	const nav = useNavigate();

	async function handleLogout() {


		await Swal({
			title: "SUCCESS!",
			text: "You are LogOut",
			icon: "success",
			button: "oK",
		})
		Cookies.remove('Bearer');
		userNow.setAuth({});
		nav('/');
	}
	return <div>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
		<div className="container">
			<div className="header-bar">
				<h1 className="logo">E</h1>
				<ul className="slider-menu">


					<li>About</li>
					<li>Services</li>
					{userNow.auth.token ?
						<>
							<li>< Link onClick={handleLogout} style={{ fontSize: 16, color: 'white', fontWeight: "bold", textDecoration: "none" }}>Logout</Link></li>
							<li>< Link style={{ fontSize: 16, color: 'white', fontWeight: "bold", textDecoration: "none" }} to='/dashbord'> DashbBord</Link></li>
						</>
						:
						<>
							<li>< Link style={{ fontSize: 16, color: 'white', fontWeight: "bold", textDecoration: "none" }} to='/'> Home</Link></li>
							<li>< Link style={{ fontSize: 16, color: 'white', fontWeight: "bold", textDecoration: "none" }} to='/SignUP'> SignUp</Link></li>
							<li>< Link style={{ fontSize: 16, color: 'white', fontWeight: "bold", textDecoration: "none" }} to='/LogIn'> LogIn</Link></li>
						</>
					}
				</ul>
			</div>
		</div>

	</div>
}