// src/components/Auth/AuthForm.jsx
import { useReducer, useEffect } from "react";
import Input from "../../components/Input/Input";
import axios from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import {
  formReducer,
  initialState,
  UPDATE_FIELD,
  RESET_FORM,
  SET_ERROR,
} from "./reducers/authReducer";

function AuthForm({ isLoginPageOpen, onClose }) {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const { login,register } = useAuth();

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

    const payload = isLoginPageOpen
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        };

    console.log(payload);

    try {
      const endpoint = isLoginPageOpen ? login(payload) : register(payload) ;
      // // const response = await axios.post(endpoint, payload);
      
      // const {messege,token,user} = response.data;
      // console.log(messege);
      // login(user, token);


    } catch (error) {
      if (error.response?.data?.error) {
        dispatch({ type: SET_ERROR, value: error.response.data.error });
      }
    }

    dispatch({ type: RESET_FORM });
    onClose();
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

      {isLoginPageOpen && (
        <p className="text-violet-600 cursor-pointer hover:text-violet-800">
          Forget your password?
        </p>
      )}

      <button
        type="submit"
        className="bg-violet-600 text-white w-full rounded-lg h-10 font-bold hover:bg-violet-800 cursor-pointer my-2"
      >
        {isLoginPageOpen ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}

export default AuthForm;
