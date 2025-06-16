import { Router } from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { getRifasUsers, createRifas, getAllRifas, getRifaById, updatePartialRifa, decrementRifaTicket } from "../controllers/rifa.controllers.js";
import { requestPaymentIntent } from "../controllers/striper.controllers.js";
import { createTicketController } from "../controllers/ticket.controllers.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create/rifa", createRifas);
router.post("/get/rifas", getRifasUsers);
router.get("/get/all/rifas", getAllRifas);
router.post("/pay", requestPaymentIntent);
router.get("/get/rifa", getRifaById);
router.patch("/update/rifa", updatePartialRifa);
router.patch("/decrement/ticket", decrementRifaTicket);
router.post("/create/ticket", createTicketController);

export default router;
