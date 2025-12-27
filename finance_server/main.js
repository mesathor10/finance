import express from "express";
import authrouter from "./routes/authRouter.js";
import finRouter from "./routes/finRouter.js";
import cors from "cors";
import dbConnection from "./config/db.js";

const server = express();

server.use(express.json());
server.use(cors({
  origin: "https://finance-eo4fluox6-mesathor10s-projects.vercel.app/"
}));
server.use("/user", finRouter);
server.use("/auth", authrouter);

dbConnection();

server.listen(8000, () => {
  console.log("server listening");
});
