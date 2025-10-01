import { useState } from "react";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
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
              activeTab === "settings"
                ? "border-violet-500 text-violet-500"
                : "border-transparent text-gray-600 hover:text-violet-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
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
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                <label>Email</label>
                <input type="email" name="email" id="email" className="bg-gray-100 ml-4 rounded h-8 w-1/3" />
                <p>Here you can update your profile details.</p>
              </div>
              <div>
                  <h2 className="text-xl font-bold mb-2">Profile Information</h2>
                  <p>Here you can update your profile details.</p>
              </div>
            </div>
          )}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p>Update your account settings here.</p>
            </div>
          )}
          {activeTab === "address" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Address</h2>
              <p>Manage your saved addresses here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
