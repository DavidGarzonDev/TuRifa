import { Router } from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { getRifas, createRifas } from "../controllers/rifa.controllers.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create/rifa", createRifas);
router.post("/get/rifas", getRifas);

export default router;
