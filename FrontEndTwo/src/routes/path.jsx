import Dashboard from "../pages/dashboard";
import DashboardUsers from "../pages/dashboardUsers";
import DashboardProject from "../pages/dashboardProjects";
import Login from "../pages/login";
const routes = [
    { path: "/",    componte: Login},
    { path: "/dashboard",                      component: Dashboard},
    { path: "/dashboard/UserList",    component: DashboardUsers},
    { path: "/dashboard/ProjectManagement",             component: DashboardProject},

   
    
  ];

  export default routes