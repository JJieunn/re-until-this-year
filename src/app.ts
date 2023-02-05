import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import logger from "morgan"
import routes from "./routes/index"


const createApp = () => {
  const app = express()
  app.use(
    cors({
      origin: "*",
      credentials: false
    }),
    express.json(),
    express.urlencoded({ extended: false }),
    logger("combined"),
    routes
  )
  app.use((err: any, req: Request, res: Response, next: NextFunction)=> {
    console.log(err)
    res.status(err.statusCode || 500).json({ message: err.message || "Interner Server Error"});
  })

  return app;
}

export { createApp }