import { Router } from "express";
import authRouter from "./auth.js";
import adminRouter from "./admin.js";
import reservationsRouter from "./reservations.js";
import appointmentsUserRouter from "./appointmentsUser.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/reservations', reservationsRouter);
router.use('/users', appointmentsUserRouter);


export default router;