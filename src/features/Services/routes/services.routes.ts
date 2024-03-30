import { Router } from "express";
// Token verification
import { verifyToken } from "../../../middlewares/verifyToken";
// Controllers
import { addService } from "../controllers/add.services";
import { getAllServices } from "../controllers/get-all.services";
import { updateService } from "../controllers/update.services";
import { activateService } from "../controllers/activate.services";
import { deactivateService } from "../controllers/deactivate.services";
// Input validation schemas
import { addServiceValidation } from "../input-validation/add.services.schema";
import { updateServiceValidation } from "../input-validation/update.services.schema";
import { activateServiceValidation } from "../input-validation/activate.services.schema";
import { deactivateServiceValidation } from "../input-validation/deactivate.services.schema";


const servicesRouter = Router();

servicesRouter.route("/").get(verifyToken, getAllServices);

servicesRouter.route("/").post(verifyToken, addServiceValidation, addService);

servicesRouter.route("/:id").patch(verifyToken, updateServiceValidation, updateService);

servicesRouter.route("/activate").patch(verifyToken, activateServiceValidation, activateService);

servicesRouter.route("/deactivate").patch(verifyToken,deactivateServiceValidation, deactivateService);



export { servicesRouter }
