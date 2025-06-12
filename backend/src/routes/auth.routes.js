import { Router } from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { getRifas, createRifas, getAllRifas } from "../controllers/rifa.controllers.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create/rifa", createRifas);
router.post("/get/rifas", getRifas);
router.get("/get/all/rifas", getAllRifas);

export default router;
