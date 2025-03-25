import express from "express";
import { createBooking, getUserBookings, cancelBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.route("/").post(createBooking).get(getUserBookings);
router.route("/:id").delete(cancelBooking);

export default router;