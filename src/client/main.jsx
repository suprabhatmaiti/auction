import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import DashboardPage from "./pages/DashboardPage/DashboardPage"
import DropdownPage from "./pages/DropdownPage";
import AddAuctionPage from "./pages/AddAuctionPage";
import AuctionListPage from "./pages/AuctionListPage/AuctionListPage";


const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [
      { index:true, element: <HomePage/> },
      { path: 'profile', element: <ProfilePage/> },
      { path: 'dashboard', element: <DashboardPage/> },
      { path: 'dropdown', element: <DropdownPage/> },
      { path: 'add-auction', element: <AddAuctionPage/> },
      { path: 'auction-list', element: <AuctionListPage/> },

    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
