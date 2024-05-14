import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import React from "react";
import DashboardNav from "./components/dashboard-nav";
import Login from "./login";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Kuro</h1>
      </header>
      <nav className="dashboard-nav">
        <DashboardNav />
      </nav>
      <main className="dashboard-main">
        <div className="tabs-list">
          <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item
              className="Tabs-Item"
              active
              title="Dashboard"
              icon={MdDashboard}
            >
              <span className="font-medium text-gray-800 dark:text-white item-dashboard">
                Dashboard tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item className="Tabs-Item" title="Perfil" icon={HiUserCircle}>
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white item-dashboard">
                Profile tab's associated content
              </span>
            </Tabs.Item>
            <Tabs.Item
              className="Tabs-Item"
              title="Settings"
              icon={HiAdjustments}
            >
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white item-dashboard">
                Settings tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item
              className="Tabs-Item"
              title="Contacts"
              icon={HiClipboardList}
            >
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white  item-dashboard">
                Contacts tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item className="Tabs-Item" title="SingIn" icon={IoLogIn}>
              <span className="font-medium text-gray-800 dark:text-white item-dashboard">
                Inicie sección con un usuario registrado o cree una cuenta para
                el Inicio de sección
              </span>
              <Login />
            </Tabs.Item>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
