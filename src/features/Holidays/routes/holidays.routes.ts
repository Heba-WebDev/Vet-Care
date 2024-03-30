import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { addHoliday } from "../controllers/add.holidays";
import { removeHoliday } from "../controllers/remove.holidays";
// Input validation schemas
import { addHolidaysValidation } from "../input-validation/add.holidays.schema";
import { removeHolidaysValidation } from "../input-validation/remove.holidays.schema";

const holidaysRouter = Router();

holidaysRouter.route("/").post(verifyToken, addHolidaysValidation, addHoliday);

holidaysRouter.route("/").delete(verifyToken, removeHolidaysValidation, removeHoliday);

export { holidaysRouter }
