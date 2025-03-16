import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // bật true vì mới vào trang nó phải đợi gọI API checkAuth

  checkAuth: async () => {
    try {
      const result = await axiosInstance.get("/auth/check");
      set({ authUser: result.data });
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
  setAuthUser: () => {
    set({ authUser: true });
  },
}));
