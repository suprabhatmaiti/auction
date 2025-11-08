import { useState } from "react";
import Input from "../../components/Input/Input";
import useAuth from "../../hooks/useAuth";
import { FiEdit3 } from "react-icons/fi";
import { LiaEditSolid } from "react-icons/lia";
import tiger from "../../assets/tiger.svg";

import Dropdown from "../../components/Dropdown/Dropdown";

function ProfileInformation() {
  const { user } = useAuth();

  const [selection, setSelection] = useState(null);

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];
  const date = new Date(user.created_at);

  return (
    <div className="px-4 md:px-0 md:py-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-8">
        <div className="relative">
          <img
            src={tiger}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-violet-600"
          />
          <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200">
            <FiEdit3 className="size-5 text-gray-600" />
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{user?.name || "Username"}</h1>
            <LiaEditSolid className="size-5 text-gray-600 cursor-pointer hover:text-violet-600" />
          </div>
          <p className="text-gray-600 mb-1">{user?.email || "email"}</p>
          <p className="text-gray-600">Member since: {date.toLocaleString()}</p>
        </div>
      </div>

      <hr className="border-gray-300 mb-8" />

      <div className="max-w-2xl mx-auto space-y-6">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
        />
        <Dropdown
          options={options}
          placeholder="Select Gender"
          onSelect={setSelection}
          selection={selection}
          label="Gender"
        />
        <Input label="Address" type="text" placeholder="Enter your address" />
        <Input label="City" type="text" placeholder="Enter your city" />
        <Input label="Country" type="text" placeholder="Enter your country" />
      </div>
    </div>
  );
}

export default ProfileInformation;
