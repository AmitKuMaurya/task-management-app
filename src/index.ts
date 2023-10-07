import express, { Application, Request, Response } from "express";
import dbConnection from "./config/database";
import {userRouter} from './routes/auth.route';
import { Server } from "http";
const PORT = 8080;
const app: Application = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(201).send("<h1>Hello Bro !</h1>");
});

app.use('/api',userRouter);

const server: Server = app.listen(PORT, async () => {
await dbConnection;
  console.log({ Launched: `Listening on PORT ${PORT} 🚀` });
});
