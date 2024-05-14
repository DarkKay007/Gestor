import "./styles/App.css";
import HomePage from "./pages/pagesHome.jsx";
import AboutPage from "./pages/PagesAbout.jsx";
import Login from "./pages/login.jsx";
import { Router } from "./pages/components/routes.jsx";
import Page404 from "./pages/404.jsx";
import UserList from "./pages/components/userGetList.jsx";
import Dashboard from "./pages/dashboard.jsx"
import Search from "./pages/search.jsx";
import CreateUserForm from "./pages/components/userPost.jsx";
import ProjectComponent from "./pages/components/projectShow.jsx";
import calendar from "./pages/calendarPage.jsx";
import TasksComponent from "./pages/tasks.jsx";
import DashboardAssignment from "./pages/dashboard-asignaciones.jsx";
import DashboardProjectsManagement from "./pages/DashboardProjectsManagement.jsx";

const routes = [
  { path: "/",                      component: HomePage},
  { path: "/about",                 component: AboutPage,},
  { path: "/login",                 component: Login,},
  { path: "/dashboard/UserList",    component: UserList,},
  { path: "/dashboard",             component: Dashboard,},
  { path: "/dashboard:query",       component: Dashboard,},
  { path: "/search",                component: Search },
  { path: "/dashboard/UserFormPost",component: CreateUserForm},
  { path: "/dashboard/Projects",    component: ProjectComponent},
  { path: "/dashboard/calendar",    component: calendar},
  { path: "/dashboard/tasks",       component: TasksComponent},
  { path: "/dashboard/asignaciones",    component: DashboardAssignment},
  { path: "/dashboard/ProjectsManagement",    component: DashboardProjectsManagement},
  { path: "*",                       component: Page404,}
];

function App() {
  return <Router routes={routes} defaultComponent={Page404} />;
}

export default App;
