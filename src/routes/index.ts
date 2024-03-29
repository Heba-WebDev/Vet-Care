import { staffRouter } from "../features/Staff/routes/staff.routes";
import { vetsRouter } from "../features/Vets/routes/vets.routes";
import { ownersRouter } from "../features/Owners/routes/owners.routes";
import { petsRouter } from "../features/Pets/routes/pets.routes";


const routes = {
    staffRouter,
    vetsRouter,
    ownersRouter,
    petsRouter
}

export { routes }