import { createReservation, deleteReservation, getReservation, updateReservation } from "../services/reservationsService.js";

export const getReservationController = async (req, res) => {
    try {
        const reservation = await getReservation(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createReservationController = async (req, res) => {
    try {
        const reservation = await createReservation(req.body);
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateReservationController = async (req, res) => {
    try {
        const reservation = await updateReservation(req.params.id, req.body);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteReservationController = async (req, res) => {
    try {
        const reservation = await deleteReservation(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
