import { createContext } from "react";
import customRoute from "./routes/customRoute.jsx";
import { toast, ToastContainer } from "react-toastify";
export const NotificationContext = createContext();
function App() {
  const handleNotification = (message, type) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };

  const routes = customRoute();
  return (
    <NotificationContext.Provider value={{ handleNotification }}>
      {routes}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
