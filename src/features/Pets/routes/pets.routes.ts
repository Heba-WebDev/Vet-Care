import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { petsRegistration } from "../controllers/register.pets";
import { getAllPets } from "../controllers/get-all.pets";
import { updatePet } from "../controllers/update.pets";

// Input validation schemas
import { petsRegistrationValidation } from "../input-validation/register.pets.schema";
import { getAllPetsValidation } from "../input-validation/get-all.pets.schema";
import { petsUpdateValidation } from "../input-validation/update.pets.schema";

const petsRouter = Router();

petsRouter.route("/").get(verifyToken,getAllPetsValidation, getAllPets);

petsRouter.route("/").patch(verifyToken, petsUpdateValidation, updatePet);

petsRouter.route("/register").post(verifyToken, petsRegistrationValidation, petsRegistration);

export { petsRouter}
