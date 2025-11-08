import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DropdownPage from './pages/DropdownPage';
import AddAuctionPage from './pages/AddAuctionPage/AddAuctionPage';
import AuctionListPage from './pages/AuctionListPage/AuctionListPage';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoutes from './ProtectedRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        ),
      },
      { path: 'dropdown', element: <DropdownPage /> },
      {
        path: 'add-auction',
        element: (
          <ProtectedRoutes>
            <AddAuctionPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'auction-list',
        element: (
          <ProtectedRoutes>
            <AuctionListPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
