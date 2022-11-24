import { Router } from "express";

const router  = Router();
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;