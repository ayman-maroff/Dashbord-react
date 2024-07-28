import Login from './Pages/Auth/Login/Login';
import SingUp from "./Pages/Auth/SIgnUP/SignUp";

import Home from "./Pages/HomePage/Home";
import { Route, Routes } from "react-router-dom";

import { Dashbord } from './Pages/DashBord/Dashbord';
import Users from './Pages/DashBord/Users/Users';
import AddUser from './Pages/DashBord/Users/AddUser';
import UpdateUser from './Pages/DashBord/Users/UpdateUser';
import RequireAth from './Pages/Auth/RequireAuth';
import PersistLogin from './Pages/Auth/PersistLogin';
import Productions from './Pages/DashBord/Productions/Productions';
import AddProduct from './Pages/DashBord/Productions/NewProduct';
import UpdateProduct from './Pages/DashBord/Productions/UpdateProduct';

function App() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      <Routes>

        <Route path="/SignUP" element={<SingUp />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAth />}>
            <Route path="/dashbord" element={<Dashbord />}>
              <Route path="users" element={<Users />} />
              <Route path="users/adduser" element={<AddUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="productions" element={<Productions />} />
              <Route path="productions/addproduct" element={<AddProduct />} />
              <Route path="productions/:id" element={<UpdateProduct/>} />
            </Route>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
