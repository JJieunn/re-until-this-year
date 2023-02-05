import dotenv from "dotenv"
dotenv.config();
import { Request, Response } from "express"
import { createApp } from "./app"

const app = createApp();
const PORT = process.env.PORT;

app.get('/health', (req: Request, res: Response)=> {
  res.status(200).json({ message: "health" });
})

app.listen(PORT, () => {
  console.log(`Server start : http://localhost:${PORT}..`);
})