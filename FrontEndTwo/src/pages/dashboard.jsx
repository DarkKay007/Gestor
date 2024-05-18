import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";

import "../styles/dashboard.css"
function Dashboard() {

    return (
      <>
        <div className="container-dashboard">
            <div className="header-dashboard">
        
                <div className="ico-dashboard"></div>
                <h1>Dashboard</h1>
                <div className="settings-dashboard"><h1><IoSettings /></h1></div>
            </div>
            <div className="nav-dashboard">
                <NavLinks></NavLinks>
            </div>
            <div className="main-dashboard">
              <center>datos</center>
            </div>
        </div>
      </>
    )
  }
  
  export default Dashboard
  