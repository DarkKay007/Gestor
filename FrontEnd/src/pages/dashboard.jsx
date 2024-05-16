import React from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import DashboardNav from "./components/dashboard-nav";
import Login from "./login";
import UserProfile from "./components/userProfile";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
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
            ></Tabs.Item>
            <Tabs.Item
              className="Tabs-Item"
              title="Perfil"
              icon={HiUserCircle}
            >
              <UserProfile/>
            </Tabs.Item>
            <Tabs.Item
              className="Tabs-Item"
              title="Settings"
              icon={HiAdjustments}
            ></Tabs.Item>
            <Tabs.Item
              className="Tabs-Item"
              title="Contacts"
              icon={HiClipboardList}
            ></Tabs.Item>
            <Tabs.Item className="Tabs-Item" title="Marco" icon={IoLogIn}>
           
            </Tabs.Item>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
