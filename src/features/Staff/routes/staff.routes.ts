import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { staffRegistration } from "../controllers/registration.staff";
import { staffDelete } from "../controllers/delete.staff";
import { staffVerify } from "../controllers/verify.staff";
import { staffUpdate } from "../controllers/update.staff";
import { staffLogin } from "../controllers/login.staff";
import { getAllStaff } from "../controllers/get-all.staff";
import { getAllFormerStaff } from "../controllers/get-all-former.staff";
// Input validation schemas
import { staffRegistrationValidation } from "../input-validation/registration.staff.schema";
import { staffLoginValidation } from "../input-validation/login.staff.schema";
import { staffDeleteValidation } from "../input-validation/delete.staff.schema";
import { staffVerifyValidation } from "../input-validation/verify.staff.schema";
import { staffUpdateValidation } from "../input-validation/update.staff.schema";



const staffRouter = Router();

staffRouter.route("/current").get(verifyToken, getAllStaff);

staffRouter.route("/former").get(verifyToken, getAllFormerStaff);

staffRouter.route("/register").post(staffRegistrationValidation, staffRegistration);

staffRouter.route("/login").post(staffLoginValidation, staffLogin);

staffRouter.route("/delete").delete(verifyToken, staffDeleteValidation, staffDelete);

staffRouter.route("/verify").patch(verifyToken, staffVerifyValidation, staffVerify);

staffRouter.route("/update").patch(verifyToken, staffUpdateValidation, staffUpdate);

export { staffRouter}
