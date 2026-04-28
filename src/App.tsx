import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const Categories = React.lazy(() => import('./pages/Categories'));
const Services = React.lazy(() => import('./pages/Services'));
const BusinessDetails = React.lazy(() => import('./pages/BusinessDetails'));
const AddBusiness = React.lazy(() => import('./pages/AddBusiness'));
const News = React.lazy(() => import('./pages/News'));
const Jobs = React.lazy(() => import('./pages/Jobs'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary">Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: 'business/:id',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <BusinessDetails />
          </Suspense>
        ),
      },
      {
        path: 'add-business',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <AddBusiness />
          </Suspense>
        ),
      },
      {
        path: 'news',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <News />
          </Suspense>
        ),
      },
      {
        path: 'jobs',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <Jobs />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'notifications',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <Notifications />
          </Suspense>
        ),
      },
      {
        path: 'admin',
        element: (
          <Suspense fallback={<div className="p-8 text-center text-primary">Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      }
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
