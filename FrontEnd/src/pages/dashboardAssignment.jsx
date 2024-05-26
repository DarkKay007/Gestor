import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import AssignmentTable from "../components/assignmentTable";
import "../styles/dashboard.css"
import "../styles/assignment.css"
function DashboardAssignment() {

    return (
      <>
        <div className="container-dashboard">
            <div className="header-dashboard">
        
                <div className="ico-dashboard"></div>
                <h1>Asignaciones</h1>
                <div className="settings-dashboard"><h1><IoSettings /></h1></div>
            </div>
            <div className="nav-dashboard">
                <NavLinks></NavLinks>
            </div>
            <div className="main-dashboard-settings"></div>
            <div className="main-dashboard">
                <AssignmentTable/>
            </div>
        </div>
      </>
    )
  }
  
  export default DashboardAssignment
  