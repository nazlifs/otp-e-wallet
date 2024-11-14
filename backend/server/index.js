import express from "express";
import cors from "cors";
import usersRoute from "./router/users.js";
import transactionRouter from "./router/transaction.js";
import authRouter from "./router/auth.js";
import { db } from "../domain/repository/db.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(authRouter);
app.use(usersRoute);
app.use(transactionRouter);

const bootloader = async () => {
  try {
    await db.$connect();
  } catch {
    console.log("failed to connect db");
  }

  app.listen(port, () => {
    console.log(`server is running on port :${port}`);
  });

  try {
    await db.$disconnect();
  } catch {
    console.log("failed to disconnect db");
  }
};

export default bootloader;
