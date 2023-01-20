import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

import { Link } from "react-router-dom";
import MyTextField from "../../componenets/TextField/TextField";
import MyButton from "../../componenets/Button/Button";

import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import useRequestHook from "../../hooks/fetch.hook";
import ENDPOINTS from "../../constants/endpoints.constant";
import { sessionStorageKey } from "../../constants/index.constant";

const loginSchema = yup.object().shape({
  email: yup.string().required("is required").email("Provide a valid email"),
  password: yup.string().required("is required"),
});

const Login = () => {
  const makeRequest = useRequestHook();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { values, handleSubmit, errors, handleChange } = useFormik({
    initialValues: form,
    validationSchema: loginSchema,
    async onSubmit(values) {
      setLoading(true);
      try {
        const res = await makeRequest.post(ENDPOINTS.login, values);
        const user = res.data;
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(user));

        toast("Successfully logged in");
      } catch (e: any) {
        const error = e.response.data;

        if (error?.error) return toast.error(error.error);

        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });

  const { email, password } = values;

  return (
    <div className="app-full bg-primaryLight flex flex-col items-center justify-center">
      <img src={logo} alt="logo" className="w-[140px]" />
      <form
        className="bg-white w-[90%] sm:w-[50%] lg:w-[40%] rounded-lg shadow flex flex-col items-center py-4 px-6 sm:py-8 sm:px-12"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[22px] font-semibold text-[#424876] pb-3">
          Welcome Back
        </h1>
        <p className="text-[#D1D3E6] font-light text-[16px] pb-[12%]">
          Enter your credentials to access your account.
        </p>

        <MyTextField
          icon={MailIcon}
          placeholder={"Enter your email"}
          name="email"
          id="email"
          value={email}
          error={errors.email}
          onChange={handleChange}
        />
        <MyTextField
          icon={LockIcon}
          placeholder={"Enter your password"}
          type="password"
          name="password"
          id="password"
          value={password}
          error={errors.password}
          onChange={handleChange}
        />

        <MyButton
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          <p className="font-[400px] font-['Poppins'] text-[18px]">Sign In</p>
        </MyButton>
      </form>

      <p className="text-lg text-gray-400 pt-10">
        Dont have an account&nbsp;
        <Link to="/signup" className="links text-blue-400">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
