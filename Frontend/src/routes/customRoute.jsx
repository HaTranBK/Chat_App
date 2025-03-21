import { Navigate, useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import SettingPage from "../pages/SettingPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const CustomRoute = () => {
  console.log("out of useEffect");
  const { checkAuth, authUser } = useAuthStore();
  useEffect(() => {
    console.log("in useEffect");
    checkAuth();
  }, [checkAuth]); // không bị lặp  vô hạn do zudstand nó trả về tham chiếu lúc khởi tạo cho checkAuth nên mỗi lần re render nó trả về tham chiếu của checkAuth

  let route = useRoutes([
    {
      path: "/",
      element: authUser ? <HomePage /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !authUser ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: "/signup",
      element: !authUser ? <SignUpPage /> : <Navigate to="/" />,
    },
    {
      path: "/settings",
      element: <SettingPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);
  return route;
};

export default CustomRoute;
