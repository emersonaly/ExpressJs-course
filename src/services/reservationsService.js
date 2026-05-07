import { PrismaClient } from '../../generated/client/index.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getReservation = async (id) => {
    const reservation = await prisma.appointment.findUnique({
        where: {
            id: parseInt(id, 10)
        }
    });
    return reservation;
}

export const createReservation = async (reservation) => {
    const conflict = await prisma.appointment.findFirst({
        where: {
            date: reservation.date,
            timeBlock: reservation.timeBlock
        }
    });
    if (conflict) {
        throw new Error("hour not available");
    }
    const newReservation = await prisma.appointment.create({ data: reservation });
    return newReservation;
}

export const updateReservation = async (id, reservation) => {
    const conflict = await prisma.appointment.findUnique({
        where: {
            date: reservation.date,
            timeBlock: reservation.timeBlock,
            id: { not: parseInt(id, 10) }
        }
    });
    if (conflict) {
        throw new Error("hour not available");
    }
    const updatedReservation = await prisma.appointment.update({
        where: { id: parseInt(id, 10) },
        data: reservation
    });
    return updatedReservation;

}

export const deleteReservation = async (id) => {
    const deletedReservation = await prisma.appointment.delete({
        where: {
            id: parseInt(id, 10)
        }
    });
    return deletedReservation;
}
