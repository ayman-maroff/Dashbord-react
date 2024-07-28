
import { Link } from 'react-router-dom';
import { User } from '../../Pages/Context/UserContext';
import './TopBar.css';

import { useContext } from 'react';

export default function TopBar() {

  const userNow = useContext(User);
  const name = userNow.auth.userdetails.name;
  return (

    <div>

      <div className="container2">
        <div className="header-bar2">
          <h1 className="logo">E</h1>
          <nav>

            <ul >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashbord/users" >Users</Link></li>
              {/*<li>
                <Link to="#0">Clients</Link>
                <ul>
                  <li><Link to="#0">Burger King</Link></li>
                  <li><Link to="#0">Southwest Airlines</Link></li>
                  <li><Link to="#0">Levi Strauss</Link></li>
                </ul>
              </li>
              <li>
                <Link to="#0">Services</Link>
                <ul>
                  <li><Link to="#0">Print Design</Link></li>
                  <li><Link to="#0">Web Design</Link></li>
                  <li><Link to="#0">Mobile App Development</Link></li>
                </ul>
              </li>*/}

              <li><Link to="/dashbord/productions">Production</Link></li>
            </ul>
          </nav>
          <h1 className="logo2">HI Mr.{name}</h1>
        </div>
      </div>

    </div>

  );

}