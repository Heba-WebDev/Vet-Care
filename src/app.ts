import express from "express";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";
import config from "./docs/swagger-output.json";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config));
app.use("/api/v1/staff", routes.staffRouter);
app.use("/api/v1/vets", routes.vetsRouter);
app.use("/api/v1/owners", routes.ownersRouter);
app.use("/api/v1/pets", routes.petsRouter);

app.use(errorHandler);
app.all("*", notFound)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
