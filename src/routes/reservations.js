import { Router } from "express";
import AuthenticateToken from '../middlewares/auth.js';
import { createReservationController, deleteReservationController, getReservationController, updateReservationController } from '../controllers/reservationController.js';

const router = Router();

router.post('/', AuthenticateToken, createReservationController);
router.get('/:id', AuthenticateToken, getReservationController);
router.put('/:id', AuthenticateToken, updateReservationController);
router.delete('/:id', AuthenticateToken, deleteReservationController);

export default router;