import Dashboard from "../pages/dashboard";
import DashboardUsers from "../pages/dashboardUsers";
import DashboardProject from "../pages/dashboardProjects";
import LoginPage from "../pages/pageLogin";
const routes = [
    { path: "/", component: LoginPage},
    { path: "/dashboard",                      component: Dashboard},
    { path: "/dashboard/UserList",    component: DashboardUsers},
    { path: "/dashboard/ProjectManagement",             component: DashboardProject},

   
    
  ];

  export default routes