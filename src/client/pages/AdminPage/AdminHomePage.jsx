import React from "react";
import Header from "./Header";
import Body from "./Body";

export default function AdminHomePage() {
  return (
    <div className="flex h-screen relative">
      <Header />
      <div className="flex-1 bg-gray-50">
        <Body />
      </div>
    </div>
  );
}
