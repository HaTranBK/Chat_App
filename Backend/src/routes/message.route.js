import { Router } from "express";
import { isUserAuthenticated } from "../controllers/VerifyToken.js";
import {
  GetMessage,
  GetUserForSidebar,
  SendMessage,
} from "../controllers/Message.controller.js";

const route = Router();

route.get("/users", isUserAuthenticated, GetUserForSidebar);
route.get("/:id", isUserAuthenticated, GetMessage);

route.post("/send/:id", isUserAuthenticated, SendMessage);
export const MessageRoute = route;
