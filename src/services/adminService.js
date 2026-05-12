import prisma from '../db.js';
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