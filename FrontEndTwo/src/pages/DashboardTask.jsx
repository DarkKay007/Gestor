import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import TaskForm from '../components/taskform';
import TaskList from "../components/tasklist";
import "../styles/dashboard.css"
function DashboardTask() {

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
            <div className="main-dashboard-settings">
              <TaskForm/>
            </div>
            <div className="main-dashboard">
              <TaskList></TaskList>
            </div>
        </div>
      </>
    )
  }
  
  export default DashboardTask
  