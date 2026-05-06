import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { PrismaClient } from '../../generated/client/index.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
