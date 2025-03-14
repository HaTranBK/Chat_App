import express from "express";
import dotenv from "dotenv";
import root from "./routes/root.route.js";
import cors from "cors";
import { dbConnect } from "./dataBase/db.js";
import { errorMiddleWare } from "./Middlewares/ErrorMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./../Backend/config/.env" });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    method: ["POST", "PUT", "DELETE", "GET"],
    credentials: true, //allow cookie be sent with request.
  })
);
app.use(cookieParser());
app.use(root);

app.use(errorMiddleWare);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on the PORT ${process.env.PORT}`);
  dbConnect();
});
