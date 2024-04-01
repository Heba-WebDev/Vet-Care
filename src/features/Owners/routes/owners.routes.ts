import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { registerOwner } from "../controllers/register.owners";
import { getAllOwners } from "../controllers/get-all.owners";


// Input validation schemas
import { ownerRegistrationValidation } from "../input-validation/registration.owners.schema";
import { getAllOwnersValidation } from "../input-validation/get-all.owners.schema";

const ownersRouter = Router();

ownersRouter.route("/register").post(verifyToken, ownerRegistrationValidation, registerOwner);

ownersRouter.route("/").get(verifyToken, getAllOwnersValidation, getAllOwners);




export { ownersRouter }
