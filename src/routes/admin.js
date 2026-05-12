import { Router } from "express";
import { createTimeBlocks, listReservations } from "../controllers/adminController.js";
import autenticateToken from "../middlewares/auth.js";


const router = Router();

router.post('/time-blocks', autenticateToken, createTimeBlocks);
router.get('/reservations', autenticateToken, listReservations);

export default router;