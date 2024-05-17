import Dashboard from "../pages/dashboard";
import DashboardUsers from "../pages/dashboardUsers";
import DashboardProject from "../pages/dashboardProjects";
const routes = [
    { path: "/",                      component: Dashboard},
    { path: "/dashboard/UserList",    component: DashboardUsers},
    { path: "/dashboard/ProjectManagement",             component: DashboardProject},

   
    
  ];

  export default routes