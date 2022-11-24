import { Router } from "express";
import {
    signIn,
    signUp,
} from "../controllers/user.controllers.js";
import {
    signinBodyValidation,
    userSchemaValidation
} from "../middlewares/userValidation.js";

const router = Router();
router.post("/sign-up", userSchemaValidation, signUp);
router.post("/sign-in", signinBodyValidation, signIn);

export default router;