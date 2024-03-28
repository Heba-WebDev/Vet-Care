import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { registerOwner } from "../controllers/register.owners";
import { getAllOwners } from "../controllers/get-all.owners";
import { getOwnerByNumber } from "../controllers/get-by-number.owners";
import { getOwnerByName } from "../controllers/get-by-name.owners";

// Input validation schemas
import { ownerRegistrationValidation } from "../input-validation/registration.owners.schema";
import { ownerByNumberValidation } from "../input-validation/get-by-number.owners.schema";
import { ownerByNameValidation } from "../input-validation/get-by-name.owners.schema";

const ownersRouter = Router();

ownersRouter.route("/name/:name").get(verifyToken, ownerByNameValidation, getOwnerByName);

ownersRouter.route("/number/:phone_number").get(verifyToken, ownerByNumberValidation, getOwnerByNumber);

ownersRouter.route("/register").post(verifyToken, ownerRegistrationValidation, registerOwner);

ownersRouter.route("/").get(verifyToken, getAllOwners);




export { ownersRouter }
