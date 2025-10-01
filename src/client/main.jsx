import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage"
import DashboardPage from "./pages/DashboardPage"


const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [
      { index:true, element: <HomePage/> },
      { path: 'profile', element: <ProfilePage/> },
      { path: 'dashboard', element: <DashboardPage/> }

    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
