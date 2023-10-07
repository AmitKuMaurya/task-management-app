import express, { Application, Request, Response, NextFunction } from "express";
import dbConnection from "./config/database";
import {userRouter} from './routes/users.route';
import { tagRouter } from "./routes/tags.route";
import { Server } from "http";
import loggerMiddleware from "./middleware/logger.middleware";

const PORT = 8090;
const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  loggerMiddleware(req, res, next);
});

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(201).send("<h1>Hello Bro !</h1>");
});

app.use('/api/auth',userRouter);
app.use('/api/tag',tagRouter);

const server: Server = app.listen(PORT, async () => {
  await dbConnection;
  console.log({ Launched: `Listening on PORT ${PORT} 🚀` });
});
