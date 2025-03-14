import { useRoutes } from "react-router-dom";
import Login from "../pages/Login.jsx";

const customRoute = () => {
  let route = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return route;
};

export default customRoute;
