// src/components/UserList.jsx
import React, { useEffect } from 'react';
import { ProfileCard } from './ProfileCard';
import useUserStore from '../store/userStore';

const UserList = () => {
  const { userList, fetchUserList, loading, error } = useUserStore();

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userList.map(user => (
          <ProfileCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
