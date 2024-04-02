import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { getAllAppointments } from "../controllers/get-all.appointments";
import { bookAppointments } from "../controllers/book.appointments";
import { cancelAppointment } from "../controllers/cancel.appointments";

// Input validation schemas
import { getAllAppointmentsValidation } from "../input-validation/get-all.appointments.schema";
import { bookAppointmentsValidation } from "../input-validation/book.appointments.schema";
import { cancelAppointmentsValidation } from "../input-validation/cancel.appointments.schema";

const appointmentsRouter = Router();

appointmentsRouter.route("/").get(verifyToken, getAllAppointmentsValidation, getAllAppointments);

appointmentsRouter.route("/").post(verifyToken, bookAppointmentsValidation, bookAppointments);

appointmentsRouter.route("/").delete(verifyToken, cancelAppointmentsValidation, cancelAppointment);

export { appointmentsRouter }
