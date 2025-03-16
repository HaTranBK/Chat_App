import { Navigate, useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import SettingPage from "../pages/SettingPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useEffect } from "react";

const customRoute = () => {
  const { authUser, checkAuth } = useAuthStore();
  console.log("out of useEffect");
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
      path: "/setting",
      element: <SettingPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);
  return route;
};

export default customRoute;
