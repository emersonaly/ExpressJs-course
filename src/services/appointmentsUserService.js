import { PrismaClient } from '../../generated/client/index.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getAppointmentsUserService = async (id) => {
    try {
        const appointments = await prisma.appointment.findMany({
            where: { userId: parseInt(id) },
            include: { timeBlock: true }
        });
        return appointments;
    } catch (error) {
        throw new Error('Error when get history of appointments');
    }

}
