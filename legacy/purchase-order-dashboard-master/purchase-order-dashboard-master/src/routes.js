import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const AdminDashboard = React.lazy(() => import('./views/AdminDashboard'));
const CreateOrder = React.lazy(() => import('./views/CreateOrder'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin', name: 'Admin Dashboard', component: AdminDashboard },
  { path: '/create', name: 'Create Purchase Order', component: CreateOrder}
];

export default routes;
