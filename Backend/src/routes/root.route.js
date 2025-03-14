import { Router } from "express";
import { AuthRoute } from "./auth.route.js";

const root = Router();

root.use("/api/auth", AuthRoute);

export default root;
