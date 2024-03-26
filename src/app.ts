import express from "express";
import cors from 'cors';
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import { staffRouter } from "./features/Staff/routes/staff.routes";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use("/api/v1/staff", staffRouter);

app.use(errorHandler);
app.all("*", notFound)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
