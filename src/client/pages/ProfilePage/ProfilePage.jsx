import { useState } from "react";

import Tabs from "./Tabs";
import ProfileInformation from "./ProfileInformation";
import PaymentInformation from "./PaymentInformation";
import Address from "./Address";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "payment", label: "Payment" },
    { id: "address", label: "Address" },
  ];

  return (
    <div className="min-h-screen md:bg-gray-100 md:py-6 ">
      <div className="max-w-6xl md:mx-auto md:bg-white md:shadow-lg rounded-lg md:px-12 md:py-6 mb-16 md:w-3/4">
        <div className=" w-full ">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        </div>

        <div>
          {activeTab === "profile" && <ProfileInformation />}
          {activeTab === "payment" && <PaymentInformation />}
          {activeTab === "address" && <Address />}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
