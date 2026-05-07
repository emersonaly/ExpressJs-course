import { Router } from "express";
import authRouter from "./auth.js";
import adminRouter from "./admin.js";
import reservationsRouter from "./reservations.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/reservations', reservationsRouter);


export default router;