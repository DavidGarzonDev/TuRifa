import { Router } from "express";
import { register, login, getUserByUidController, dbactiva} from "../controllers/auth.controllers.js";
import { 
    getRifasUsers, 
    createRifas, 
    getAllRifas, 
    getRifaById, 
    updatePartialRifa, 
    decrementRifaTicket,
    checkRifaForDraw,
    realizarSorteo,
    
} from "../controllers/rifa.controllers.js";
import { requestPaymentIntent } from "../controllers/striper.controllers.js";
import { 
    createTicketController, 
    getAllTickets, 
    getTicketsByRifaIdController,
    getTicketByIdController 
} from "../controllers/ticket.controllers.js";


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
router.post("/get/all/tickets", getAllTickets);
router.post("/rifas/:rifaId/check-draw", checkRifaForDraw);
router.post("/rifas/:rifaId/sorteo", realizarSorteo);
router.get("/tickets/rifa/:rifaId", getTicketsByRifaIdController);
router.post("/get/user", getUserByUidController);
router.get("/tickets/:ticketId", getTicketByIdController);
router.get("/supabase", dbactiva);

export default router;
