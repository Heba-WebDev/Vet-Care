import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { registerOwner } from "../controllers/register.owners";
import { getAllOwners } from "../controllers/get-all.owners";
import { updateOwner } from "../controllers/update.owners";

// Input validation schemas
import { ownerRegistrationValidation } from "../input-validation/registration.owners.schema";
import { getAllOwnersValidation } from "../input-validation/get-all.owners.schema";
import { ownerUpdateValidation } from "../input-validation/update.owners.schema";

const ownersRouter = Router();

ownersRouter.route("/register").post(verifyToken, ownerRegistrationValidation, registerOwner);

ownersRouter.route("/").get(verifyToken, getAllOwnersValidation, getAllOwners);

ownersRouter.route("/").patch(verifyToken, ownerUpdateValidation, updateOwner);


export { ownersRouter }
