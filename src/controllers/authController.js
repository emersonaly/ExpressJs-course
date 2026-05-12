import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req,res) => {
    try {
      const {name, email, password} = req.body;

      await registerUser(name, email, password);
      return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message })
    }
  }

export const login = async (req,res) => {
  try {
    const {password, email} = req.body;
    const token = await loginUser(email, password);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}  