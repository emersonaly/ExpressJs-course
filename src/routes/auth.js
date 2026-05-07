import { Router } from "express";
import AuthenticateToken from '../middlewares/auth.js';
import { login, register } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/protected-route', AuthenticateToken, (req, res) => {
  res.send(`Ruta protegida`) 
})

export default router;