import express from "express";
import dotenv from "dotenv";
import root from "./routes/root.route.js";
import cors from "cors";
import { dbConnect } from "./dataBase/db.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
import path from "path";
import { errorMiddleWare } from "./Middlewares/ErrorMiddleware.js";
dotenv.config({ path: "./../Backend/config/.env" });

const __dirname = path.resolve();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://app.ohstem.vn/"],
    method: ["POST", "PUT", "DELETE", "GET"],
    credentials: true, //allow cookie be sent with request.
  })
);
app.use(cookieParser());
app.use(root);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.use(errorMiddleWare);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on the PORT ${process.env.PORT}`);
  dbConnect();
});
