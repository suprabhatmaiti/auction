import React, { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminHomePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex h-screen relative">
      <Header />
      <div className="flex-1 bg-gray-50">
        <Body />
      </div>
    </div>
  );
}
