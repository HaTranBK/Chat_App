import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Loader2, MessageSquare } from "lucide-react";
import * as yup from "yup";
import CustomInput from "../components/InputCustome.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { NotificationContext } from "../App.jsx";
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleNotification } = useContext(NotificationContext);
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        fullName: "",
        password: "",
      },
      onSubmit: async (values) => {
        console.log("values in useformik: ", values);
        const result = await signup(values);
        if (result.success) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          handleNotification(result.message, "success");
        } else handleNotification(result.message, "error");
      },
      validationSchema: yup.object({
        fullName: yup
          .string()
          .required()
          .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Full name must be at least 6 characters, 1 UpperCase char, 1 Speacial Char"
          ),
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
                <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                <p className="text-base-content/60">
                  Get Started with your free account
                </p>
              </div>
              <form action="" onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col gap-3">
                  <CustomInput
                    contentLabel={"Full Name"}
                    placeholder={"Type Your full name"}
                    name={"fullName"}
                    onBlur={handleBlur}
                    touched={touched.fullName}
                    error={errors.fullName}
                    onChange={handleChange}
                    value={values.fullName}
                  />

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
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="size-5 animate-spin"></Loader2>
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <p>
                  Already have an account?
                  <Link to={"/login"} className="link link-primary">
                    Sign in
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

export default SignUpPage;
