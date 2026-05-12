import { getAppointmentsUserService } from '../services/appointmentsUserService.js';

export const getAppointmentsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const appointments = await getAppointmentsUserService(userId);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
