import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

import { Link } from "react-router-dom";
import MyTextField from "../../componenets/TextField/TextField";
import MyButton from "../../componenets/Button/Button";

import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useRequestHook from "../../hooks/fetch.hook";
import ENDPOINTS from "../../constants/endpoints.constant";

import * as yup from "yup";
import { useFormik } from "formik";
import { sessionStorageKey } from "../../constants/index.constant";

import { toast } from "react-toastify";

let signupSchema = yup.object().shape({
  username: yup.string().required("is required"),
  email: yup.string().email("is required"),
  password: yup
    .string()
    .required("is required")
    .min(8, "password must be more than 8 characters"),
  confirmPassword: yup
    .string()
    .required("is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const makeRequest = useRequestHook();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { values, handleSubmit, errors, handleChange } = useFormik({
    initialValues: form,
    validationSchema: signupSchema,
    async onSubmit(values) {
      setLoading(true);
      try {
        const res = await makeRequest.post(ENDPOINTS.signup, values);
        const user = res.data;
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(user));

        toast("Successfully Created An account!");
      } catch (e: any) {
        const error = e.response.data;

        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });

  const { username, confirmPassword, email, password } = values;

  return (
    <div className="app-full bg-primaryLight flex flex-col items-center justify-center">
      <img src={logo} alt="" className="w-[140px]" />
      <form
        className="bg-white w-[90%] sm:w-[50%] lg:w-[40%] rounded-lg shadow flex flex-col items-center py-8 px-12"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[22px] font-semibold text-[#424876] pb-3">
          Get started with your Account
        </h1>
        <p className="text-[#D1D3E6] font-light text-[16px] pb-[12%]">
          Welcome to pinnaple create an account to continue
        </p>

        <MyTextField
          icon={AccountCircleIcon}
          placeholder={"Username"}
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          error={errors["username"]}
        />
        <MyTextField
          icon={MailIcon}
          placeholder={"Email"}
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          error={errors["email"]}
        />

        <MyTextField
          icon={LockIcon}
          type="password"
          id="password"
          placeholder={"Password"}
          name="password"
          value={password}
          onChange={handleChange}
          error={errors["password"]}
        />
        <MyTextField
          icon={LockIcon}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          placeholder={"Confirm Password"}
          onChange={handleChange}
          error={errors["confirmPassword"]}
        />

        <MyButton
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          <p className="font-[400px] font-['Poppins'] text-[18px]">Sign up</p>
        </MyButton>
      </form>

      <p className="text-lg text-gray-400 py-10">
        Dont have an account&nbsp;
        <Link to="/login" className="links text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
