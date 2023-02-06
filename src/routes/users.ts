import express from "express";
import userController from "../controllers/users";
import { asyncWrap } from "../middlewares/asyncWrap";

const router = express.Router()

router.post("/check", asyncWrap(userController.checkEmail))
router.post("/registration", asyncWrap(userController.createUserInfo))
router.post("/image", asyncWrap(userController.updateUserImage))


export default router