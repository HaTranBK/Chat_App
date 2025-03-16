import React, { useContext, useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, MessageSquare } from "lucide-react";
import CustomInput from "../components/InputCustome.jsx";
import { useFormik } from "formik";
import { useAuthStore } from "../store/useAuthStore.js";
import { NotificationContext } from "../App.jsx";
import * as yup from "yup";
import { axiosInstance } from "../lib/axios.js";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleNotification } = useContext(NotificationContext);
  const { setAuthUser, isSigningIn } = useAuthStore();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        console.log("values in useformik: ", values);
        try {
          const result = await axiosInstance.post("/auth/login", values);
          console.log("result in signIn useformik: ", result);
          handleNotification(result.data.message, "success");
          setAuthUser();
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          console.log("error in signin in useformik: ", error);
          handleNotification(error.response.data.message, "error");
        }
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .required("Email is required") // Bắt buộc nhập
          .email("Invalid email format"),
        password: yup
          .string()
          .required("Password is required!")
          .min(6, "Password must be at least 6 characters"),
      }),
    });

  return (
    <div>
      <div className="container">
        <div className="content min-h-screen grid lg:grid-cols-2 ">
          <div className="left_side flex flex-col justify-center items-center">
            <div className="detailed_left_side flex flex-col justify-center items-center w-full max-w-md">
              <div className="left_side_title flex flex-col justify-center items-center space-y-4 mb-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
                  <MessageSquare className="text-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">
                  Sign In Your Account
                </h1>
                <p className="text-base-content/60">
                  Get Started with your free account
                </p>
              </div>
              <form action="" onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col gap-3">
                  <CustomInput
                    contentLabel={"Email"}
                    placeholder={"Type Your Email"}
                    name={"email"}
                    onBlur={handleBlur}
                    touched={touched.email}
                    error={errors.email}
                    onChange={handleChange}
                    value={values.email}
                  />

                  <CustomInput
                    contentLabel={"Password"}
                    placeholder={"Type Your Password"}
                    name={"password"}
                    onBlur={handleBlur}
                    touched={touched.password}
                    error={errors.password}
                    type={!showPassword ? "password" : "text"}
                    onChange={handleChange}
                    value={values.password}
                    setShowPassword={setShowPassword}
                    showPassword={showPassword}
                  />
                </div>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    onClick={handleSubmit}
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? (
                      <>
                        <Loader2 className="size-5 animate-spin"></Loader2>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <p>
                  You don't have an account?
                  <Link to={"/signup"} className="link link-primary">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <AuthImagePattern
            title={"Join our community"}
            subtitle={
              "Connect with friends, share moments and stay in touch with your loves ones"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
