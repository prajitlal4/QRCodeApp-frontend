import React from 'react';
import BusinessDashboardComponent from '../components/BusinessDashboardComponent';
import NavigationBarComponent from '../components/NavigationBarComponent';

function BusinessDashboardPage() {
  return (
    <div>
      <NavigationBarComponent />
      <BusinessDashboardComponent />
    </div>
  )
}

export default BusinessDashboardPage;