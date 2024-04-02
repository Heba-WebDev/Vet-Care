import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { addAnimals } from "../controllers/add.animals";

// Input validation schemas
import { animalsRegistrationValidation } from "../input-validation/add.animals.schema";


const animalsRouter = Router();

animalsRouter.route("/").post(verifyToken, animalsRegistrationValidation, addAnimals);

export { animalsRouter}
