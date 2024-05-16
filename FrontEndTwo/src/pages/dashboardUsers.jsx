import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import { ProfileCard } from "../components/profilecard";
import UserList from "../components/userList";
import "../styles/dashboard.css"
function DashboardUsers() {

    return (
      <>
        <div className="container-dashboard">
            <div className="header-dashboard">
                <div className="ico-dashboard"></div>
                <h1>Home    </h1>
                <div className="settings-dashboard"><h1><IoSettings /></h1></div>
            </div>
            <div className="nav-dashboard">
                <NavLinks></NavLinks>
            </div>
            <div className="main-dashboard">
                
                <div className="App">
      <UserList />
    </div>
            </div>
        </div>
      </>
    )
  }
  
  export default DashboardUsers
  