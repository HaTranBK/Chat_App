import { Router } from "express";
import { AuthRoute } from "./auth.route.js";
import { MessageRoute } from "./message.route.js";

const root = Router();

root.use("/api/auth", AuthRoute);
root.use("/api/message", MessageRoute);
export default root;
