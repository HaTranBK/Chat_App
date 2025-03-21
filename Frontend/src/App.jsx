import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useThemeStore } from "./store/useThemeStore.js";
import Navbar from "./components/Navbar.jsx";
import CustomRoute from "./routes/CustomeRoute.jsx";
export const NotificationContext = createContext();
function App() {
  const { theme } = useThemeStore();

  const handleNotification = (message, type) => {
    return toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
    });
  };

  const routes = CustomRoute();

  return (
    <div data-theme={theme}>
      <Navbar />
      <NotificationContext.Provider value={{ handleNotification }}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </div>
  );
}

export default App;
