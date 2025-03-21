import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // bật true vì mới vào trang nó phải đợi gọI API checkAuth
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const result = await axiosInstance.get("/auth/check");
      //mỗi lần refresh trang thì cần gọi kết nối lại socket
      set({ authUser: result.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const result = await axiosInstance.post("/auth/signup", data);

      return result.data;
    } catch (error) {
      return error.response.data;
    } finally {
      set({ isSigningUp: false });
    }
  },

  setAuthUser: (data) => {
    set({ authUser: data }); // tác vụ set là đồng bộ => gọi giá trị của state sau đó là hợp lý
    console.log("authUser: ", useAuthStore.getState().authUser);
  },

  setIsSigningInOff: () => {
    set({ isLoggingIn: false });
  },

  setIsSigningInOn: () => {
    set({ isLoggingIn: true });
  },

  logout: async () => {
    try {
      const result = await axiosInstance.post("/auth/logout");
      console.log("logout successfully: ", result);
      set({ authUser: false });
      get().disconnectSocket();
    } catch (error) {
      console.log("error in logout: ", error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log("data: ", data);
      const res = await axiosInstance.put("/auth/update-profile", data);
      console.log("kết quả từ res trong updateProfilePic: ", res);
    } catch (error) {
      console.log("lỗi trong updateProfilePic: ", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    console.log("authUser in connectSocket: ", authUser);
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
