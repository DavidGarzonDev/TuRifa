import { Router } from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { getRifasUsers, createRifas, getAllRifas, getRifaById } from "../controllers/rifa.controllers.js";
import { requestPaymentIntent } from "../controllers/striper.controllers.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create/rifa", createRifas);
router.post("/get/rifas", getRifasUsers);
router.get("/get/all/rifas", getAllRifas);
router.post("/pay", requestPaymentIntent)
router.get("/get/rifa", getRifaById)

export default router;
