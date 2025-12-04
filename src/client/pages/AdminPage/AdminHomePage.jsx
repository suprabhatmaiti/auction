import React from "react";
import Header from "./Header";
import Body from "./Body";

export default function AdminHomePage() {
  return (
    <div className="flex">
      <div>
        <Header />
      </div>
      <div>
        <Body />
      </div>
    </div>
  );
}
