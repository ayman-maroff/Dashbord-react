

import TopBar from "../../Component/TopBar/TopBar";
import { Outlet } from "react-router-dom";

export function Dashbord() {

  return <div>

    <TopBar />
    <div >

      <Outlet />
    </div>

  </div>
}