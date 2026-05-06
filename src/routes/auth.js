import { Router } from "express";
import { login, register } from '../controllers/authController.js';
import AuthenticateToken from '../middlewares/auth.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/protected-route', AuthenticateToken, (req, res) => {
  res.send(`Ruta protegida`) 
})

export default router;