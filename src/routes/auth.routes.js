import { Router } from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { valideSchema } from "../middlewares/validator.shema.js"
import { loginSchema } from "../schemas/auth.schema.js"


const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
