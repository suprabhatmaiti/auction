import { useState } from "react";

import { BiEdit } from "react-icons/bi";
import Tabs from "./Tabs";
import ProfileInformation from "./ProfileInformation";
import PaymentMethods from "./PaymentMethods";
import Address from "./Address";



function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs=[
    {id: 'profile',label:'Profile'},
    {id: 'payment',label:'Payment'},
    {id: 'address',label:'Address'},
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-6 " >

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-12 py-6 mb-16 w-3/5">

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs}/>

        <div>
          {activeTab === "profile" && (
           <ProfileInformation/>
          )}
          {activeTab === "payment-methods" && (
            <PaymentMethods/>
          )}
          {activeTab === "address" && (
            <Address/>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
