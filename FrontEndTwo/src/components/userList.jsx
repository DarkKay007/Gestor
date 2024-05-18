import React from 'react';
import { useUser } from '../context/UserContext';
import { ProfileCard } from './profilecard';

const UserList = () => {
  const { userList,  } = useUser();

  return (
    <div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userList.map(user => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
