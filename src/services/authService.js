import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import prisma from '../db.js';

export const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER"
    }
  })
  return newUser;
}

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user){
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return {'token':token};
}
