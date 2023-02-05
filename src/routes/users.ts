import express from "express";
import userController from "../controllers/users";
import { asyncWrap } from "../middlewares/asyncWrap";

const router = express.Router()

router.post("/check", asyncWrap(userController.checkEmail))


export default router