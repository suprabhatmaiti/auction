// src/components/Auth/AuthForm.jsx
import { useReducer, useEffect } from "react";
import Input from "../../components/Input/Input";

import useAuth from "../../hooks/useAuth";
import {
  formReducer,
  initialState,
  UPDATE_FIELD,
  RESET_FORM,
  SET_ERROR,
} from "./reducers/authReducer";
import { toast } from "react-toastify";
import RoleCheckBox from "./RoleCheckBox";

import { useNavigate } from "react-router-dom";

function AuthForm({ isLoginPageOpen, onClose }) {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      dispatch({ type: SET_ERROR, value: "Passwords do not match" });
    } else {
      dispatch({ type: SET_ERROR, value: "" });
    }
  }, [formData.password, formData.confirmPassword, isLoginPageOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: UPDATE_FIELD, field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoginPageOpen && formData.password !== formData.confirmPassword) {
      dispatch({ type: SET_ERROR, value: "Passwords do not match" });
      return;
    }
    const role = Object.keys(formData.role || {})[0] || null;

    const payload = isLoginPageOpen
      ? { email: formData.email, password: formData.password, role: role }
      : {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: role,
        };

    try {
      const response = isLoginPageOpen
        ? await login(payload)
        : await register(payload);
      dispatch({ type: RESET_FORM });

      onClose();
      navigate("/");
    } catch (error) {
      if (error.response?.data?.error) {
        dispatch({ type: SET_ERROR, value: error.response.data.error });
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {!isLoginPageOpen && (
        <Input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      )}

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

      {!isLoginPageOpen && (
        <div>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {formData.error && (
            <p className="text-sm text-red-600">{formData.error}</p>
          )}
        </div>
      )}

      <RoleCheckBox />

      {isLoginPageOpen && (
        <p className="text-violet-600 cursor-pointer hover:text-violet-800">
          Forget your password?
        </p>
      )}

      <button
        disabled={loading}
        type="submit"
        className="bg-violet-600 text-white w-full rounded-lg h-10 font-bold hover:bg-violet-800 cursor-pointer my-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {loading && isLoginPageOpen
          ? "Logging in..."
          : loading && !isLoginPageOpen
          ? "Signing up..."
          : isLoginPageOpen
          ? "Login"
          : "Sign Up"}
      </button>
    </form>
  );
}

export default AuthForm;
