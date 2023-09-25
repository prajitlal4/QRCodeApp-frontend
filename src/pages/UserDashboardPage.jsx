import React from 'react';
import UserDashboardComponent from '../components/UserDashboardComponent';
import NavigationBarComponent from '../components/NavigationBarComponent';

function UserDashboardPage() {
  return (
    <div>
      <NavigationBarComponent />
      <UserDashboardComponent />
    </div>
  )
}

export default UserDashboardPage;