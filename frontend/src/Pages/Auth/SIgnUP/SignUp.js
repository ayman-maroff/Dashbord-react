
import "./signup.css"
import Header from "../../../Component/Header/Header";
import AddUserForm from "../../../Component/Forms/AddUserForm";
export default function SingUp() {
  return (
    <div>
      <Header/>
      <AddUserForm buttonName ="Register" title="Sign Up" kind="regist"/>
    </div>
  )
  
}

