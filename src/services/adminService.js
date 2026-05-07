import { PrismaClient } from '../../generated/client/index.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const createTimeBlockService = async (startTime, endTime) => {
    const newTimeBlock = await prisma.timeBlock.create({
        data: {
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        },
    });
    return newTimeBlock;
}

const listReservationsService = async () => {
    const reservations = await prisma.appointment.findMany();
    return reservations;
}

export { createTimeBlockService, listReservationsService };