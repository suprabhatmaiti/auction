import { useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import Input from "../components/Input/Input";
import { BiEdit } from "react-icons/bi";


function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-16">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === "profile"
                ? "border-violet-500 text-violet-500"
                : "border-transparent text-gray-600 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === "payment-methods"
                ? "border-violet-500 text-violet-500"
                : "border-transparent text-gray-600 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("payment-methods")}
          >
            Payment Methods
          </button>
          <button
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === "address"
                ? "border-violet-500 text-violet-500"
                : "border-transparent text-gray-600 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("address")}
          >
            Address
          </button>
        </div>

        <div>
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>

              <div className="flex gap-4 w-full mb-12">
                <div className="flex flex-col w-full">
                  <Input type='text' label='Email' />
                </div>
                <div className="flex flex-col w-full">
                  <Input type='text' label='Phone Number' />
                </div>
              </div>

              <div className="border-b border-gray-400 pb-8">
                  <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                    <div className="flex gap-4 w-full mb-4">
                      <div className="flex flex-col w-full">
                        <Input label='Full Name' type='text' />
                      </div>
                      <div className="flex flex-col w-full">
                        <Input label='User Name ' type='text' />
                      </div>
                    </div>
                    <div className="flex gap-4 w-full">
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                        <input type="date" name="DOB" id="DOB" className="bg-gray-100 rounded h-8 w-full focus:outline-none px-3" />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                        <select className="bg-gray-100 rounded h-8 w-full focus:outline-none px-3">
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
              </div>
              <div className="flex gap-4 my-4 justify-end">
                  <button className="bg-white hover:bg-gray-100 text-violet-600 px-6 py-3 rounded-lg font-semibold shadow-md transition">
                      Cancel
                  </button>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                      Save Changes
                  </button>
              </div>
            </div>
          )}
          {activeTab === "payment-methods" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Settings</h2>
            </div>
          )}
          {activeTab === "address" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Address</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
