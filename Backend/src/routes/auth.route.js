import { Router } from "express";
import {
  CheckAuth,
  Login,
  Logout,
  SignUp,
  UpdateProfile,
} from "../controllers/Auth.controller.js";
import { validateSignUp } from "../Middlewares/ValidateSignUp.js";
import { validateSignIn } from "../Middlewares/ValidateSignIn.js";
import { isUserAuthenticated } from "../controllers/VerifyToken.js";

const route = Router();

route.post("/login", validateSignIn, Login);
route.post("/signup", validateSignUp, SignUp);
route.post("/logout", Logout);
route.post("/update-profile", isUserAuthenticated, UpdateProfile);

route.get("/check", isUserAuthenticated, CheckAuth);
export const AuthRoute = route;
