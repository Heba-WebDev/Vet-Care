import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";

// Controllers
import { getAllVets } from "../controllers/get-all.vets";
import { getAllFormerVets } from "../controllers/get-all-former.vets";
import { vetsRegistration } from "../controllers/registration.vets";
import { vetsLogin } from "../controllers/login.vets";
import { vetsUpdate } from "../controllers/update.vets";
import { vetsDelete } from "../controllers/delete.vets";
import { vetsVerify } from "../controllers/verify.vets";

// Input validation schemas
import { vetsRegistrationValidation } from "../input-validation/registration.vets.schema";
import { vetsLoginValidation } from "../input-validation/login.vets.schema";
import { vetsUpdateValidation } from "../input-validation/update.vets.schema";
import { vetsDeleteValidation } from "../input-validation/delete.vets.schema";
import { vetsVerifyValidation } from "../input-validation/verify.vets.schema";


const vetsRouter = Router();

vetsRouter.route("/current").get(verifyToken, getAllVets);

vetsRouter.route("/former").get(verifyToken, getAllFormerVets);

vetsRouter.route("/register").post(vetsRegistrationValidation, vetsRegistration);

vetsRouter.route("/login").post(verifyToken, vetsLoginValidation, vetsLogin);

vetsRouter.route("/verify").patch(verifyToken, vetsVerifyValidation, vetsVerify);

vetsRouter.route("/update").patch(verifyToken, vetsUpdateValidation, vetsUpdate);

vetsRouter.route("/delete").delete(verifyToken, vetsDeleteValidation, vetsDelete);

export { vetsRouter }
