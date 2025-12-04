import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import DropdownPage from "./pages/DropdownPage";
import AddAuctionPage from "./pages/AddAuctionPage/AddAuctionPage";
import AuctionListPage from "./pages/AuctionListPage/AuctionListPage";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoutes from "../client/components/ProtectedRoutes";
import AuctionDescPage from "./pages/AuctionDescPage/AuctionDescPage";
import { AuctionProvider } from "./pages/AuctionListPage/context/useAuctionListContext";
import LoginPage from "./pages/AdminPage/LoginPage";
import AdminRoute from "./components/AdminRoute";
import AdminHomePage from "./pages/AdminPage/AdminHomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        ),
      },
      { path: "dropdown", element: <DropdownPage /> },
      {
        path: "add-auction",
        element: (
          <ProtectedRoutes>
            <AddAuctionPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "auction-list",
        element: (
          <ProtectedRoutes>
            <AuctionProvider>
              <AuctionListPage />
            </AuctionProvider>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/auction-desc/:id",
        element: (
          <ProtectedRoutes>
            <AuctionDescPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin-login",
        element: <LoginPage />,
      },

      {
        path: "/admin-home",
        element: (
          <AdminRoute>
            <AdminHomePage />
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
