import React, { useState } from "react";
import Input from "../../components/Input/Input";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Slider from "../../components/Slider";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const { login, loading } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      setFormData({
        email: "",
        password: "",
        role: "admin",
      });
      toast.success("Logged in successfully");
      navigate("/admin-home");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className=" ">
      <div className="bg-red-200 mt-1 py-2 font-bold text-center text-xl">
        <h1>
          Admin Login Email:{" "}
          <span className="text-xl font-medium">admin@auctions.com</span>,
          Password: <span className="text-xl font-medium">admin</span>
        </h1>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-gray-600 text-2xl">Admin Login Page</h1>
        <div className="border border-gray-600 p-8 mt-8 rounded-xl md:max-w-xl  w-full">
          <form
            action=""
            className="space-y-4 md:space-y-8"
            onSubmit={HandleSubmit}
          >
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-violet-600 text-white w-full rounded-lg h-10 font-bold hover:bg-violet-800 cursor-pointer my-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
