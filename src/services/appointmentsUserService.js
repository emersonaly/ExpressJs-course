import prisma from '../db.js';

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
