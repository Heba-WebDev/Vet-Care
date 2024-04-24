import express from "express";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import config from "./docs/swagger-output.json";
import { staffRouter } from "./features/Staff/routes/staff.routes";
import { vetsRouter } from "./features/Vets/routes/vets.routes";
import { ownersRouter } from "./features/Owners/routes/owners.routes";
import { petsRouter } from "./features/Pets/routes/pets.routes";
import { servicesRouter } from "./features/Services/routes/services.routes";
import { appointmentsRouter } from "./features/Appointments/routes/appointments.routes";
import { holidaysRouter } from "./features/Holidays/routes/holidays.routes";
import { animalsRouter } from "./features/Animals/routes/animals.routes";
import { transactionsRouter } from "./features/Transactions/routes/transactions.routes";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config));
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/vets", vetsRouter);
app.use("/api/v1/owners", ownersRouter);
app.use("/api/v1/pets", petsRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/appointments", appointmentsRouter);
app.use("/api/v1/holidays", holidaysRouter);
app.use("/api/v1/animals", animalsRouter);
app.use("/api/v1/transactions", transactionsRouter);

app.use(errorHandler);
app.all("*", notFound)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
