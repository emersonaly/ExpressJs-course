import { Router } from "express";
import AuthenticateToken from '../middlewares/auth.js';
import { getAppointmentsUser } from '../controllers/appointmentsUserController.js';

const router = Router();

router.get('/:id/appointments', AuthenticateToken, getAppointmentsUser);

export default router;