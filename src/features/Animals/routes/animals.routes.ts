import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { addAnimals } from "../controllers/add.animals";
import { updateAnimal } from "../controllers/update.animals";

// Input validation schemas
import { animalsRegistrationValidation } from "../input-validation/add.animals.schema";
import { animalsUpdateValidation } from "../input-validation/update.animals.schema";

const animalsRouter = Router();

animalsRouter.route("/").post(verifyToken, animalsRegistrationValidation, addAnimals);

animalsRouter.route("/").patch(verifyToken, animalsUpdateValidation, updateAnimal);

export { animalsRouter}
