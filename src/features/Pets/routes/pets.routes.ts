import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { petsRegistration } from "../controllers/reigster.pets";
import { getAllPets } from "../controllers/get-all.pets";
import { allPetsOfAnOwner } from "../controllers/get-by-owner.pets";

// Input validation schemas
import { petsRegistrationValidation } from "../input-validation/reigster.pets.schema";
import { ownerPetsValidation } from "../input-validation/get-by-owner.pets.schema";


const petsRouter = Router();

petsRouter.route("/:id").get(verifyToken, ownerPetsValidation, allPetsOfAnOwner);

petsRouter.route("/").get(verifyToken, getAllPets);

petsRouter.route("/register").post(verifyToken, petsRegistrationValidation, petsRegistration);

export { petsRouter}
