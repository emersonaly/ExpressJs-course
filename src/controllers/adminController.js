import { createTimeBlockService, listReservationsService } from "../services/adminService.js";

const createTimeBlocks = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied" });
        }
        console.log(req.body)
        const { startTime, endTime } = req.body;
        try {
            const timeBlock = await createTimeBlockService(startTime, endTime);
            res.status(201).json(timeBlock);

        } catch (error) {
            console.error("Error creating time block:", error);
            res.status(500).json({ message: error.message });
        }

    } catch (error) {
        console.error("Error creating time block:", error);
        res.status(500).json({ message: error.message });
    }
}

const listReservations = async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const reservations = await listReservationsService();
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error listing reservations:", error);
        res.status(500).json({ message: error.message });
    }
}

export { createTimeBlocks, listReservations };