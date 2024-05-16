import React from 'react';
import DashboardNav from './components/dashboard-nav';
import UserList from './components/userGetList';
const DashboardUserGetList = () => {
    return (
        <div className="dashboard">
            
            <nav className='dashboard-nav'>
                <DashboardNav />
            </nav>
            <main className='dashboard-main'>
               <UserList></UserList>
            </main>
        </div>
    );
}

export default DashboardUserGetList;